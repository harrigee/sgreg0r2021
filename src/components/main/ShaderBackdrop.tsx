import { useEffect, useRef, useState } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fBm noise mapped to the site's ochre/sage palette.
// Produces slow, flowing aurora bands that sit behind the content.
const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = u_time * 0.045;

  // Two-step domain warp for silky flow.
  vec2 q = vec2(
    fbm(p * 1.2 + vec2(0.0, t)),
    fbm(p * 1.2 + vec2(5.2, -t * 0.7))
  );
  vec2 r = vec2(
    fbm(p * 1.2 + 2.8 * q + vec2(1.7, 9.2) + t * 0.3),
    fbm(p * 1.2 + 2.8 * q + vec2(8.3, 2.8) - t * 0.25)
  );
  float n = fbm(p * 1.2 + 3.2 * r);

  // Palette — aligned with CSS variables.
  vec3 bg     = vec3(0.050, 0.050, 0.062); // #0D0D10
  vec3 ochre  = vec3(0.831, 0.647, 0.455); // #D4A574
  vec3 sage   = vec3(0.498, 0.627, 0.584); // #7FA095

  // Two loose "hotspots" drifting with noise to echo the original aurora layout.
  vec2 hotA = vec2(0.18 * aspect + 0.05 * sin(t * 1.3), 0.78 + 0.04 * cos(t * 1.1));
  vec2 hotB = vec2(0.82 * aspect - 0.05 * cos(t * 0.9), 0.22 + 0.04 * sin(t * 1.4));

  float dA = distance(p, hotA);
  float dB = distance(p, hotB);
  float glowA = smoothstep(0.90, 0.05, dA);
  float glowB = smoothstep(0.90, 0.05, dB);

  // Base gradient from bg with noisy modulation.
  vec3 col = bg;
  col = mix(col, ochre, glowA * (0.35 + 0.55 * n));
  col = mix(col, sage,  glowB * (0.35 + 0.55 * (1.0 - n)));

  // A faint rolling band of the accent through the middle.
  float band = smoothstep(0.35, 0.65, n) * smoothstep(0.98, 0.4, abs(uv.y - 0.55));
  col += ochre * 0.06 * band;

  // Gentle vignette (the CSS vignette layer sits on top too).
  float vign = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
  col *= mix(0.78, 1.0, vign);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setFallback(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFallback(true);
      return;
    }

    const prog = gl.createProgram();
    if (!prog) {
      setFallback(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    let disposed = false;
    let raf = 0;
    let start = performance.now();
    let accumulated = 0;
    let lastVisibleAt = start;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    const loop = (now: number) => {
      if (disposed) return;
      const t = (accumulated + (now - lastVisibleAt)) / 1000;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) {
        accumulated += performance.now() - lastVisibleAt;
        cancelAnimationFrame(raf);
      } else {
        lastVisibleAt = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  if (fallback) {
    return <div className="aurora" aria-hidden="true" />;
  }
  return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />;
}
