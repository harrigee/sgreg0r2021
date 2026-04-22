import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Linkify from "react-linkify";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";

const IMAGE_SPLIT_RE =
  /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|avif|svg)(?:\?\S*)?)/i;
const IMAGE_TEST_RE =
  /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|avif|svg)(\?\S*)?$/i;

function hasImageContent(value: string) {
  return IMAGE_SPLIT_RE.test(value);
}

function RichContent({ value }: { value: string }) {
  const parts = value.split(IMAGE_SPLIT_RE).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        IMAGE_TEST_RE.test(part.trim()) ? (
          <img key={i} src={part.trim()} alt="" className="content-image" />
        ) : (
          <Linkify key={i}>{part}</Linkify>
        )
      )}
    </>
  );
}

function AnimatedPhrase({ text, mode }: { text: string; mode: "in" | "out" }) {
  let charIdx = 0;
  const words = text.split(/(\s+)/);

  return (
    <>
      {words.map((w, wi) => {
        if (/^\s+$/.test(w)) {
          return (
            <span key={`g-${wi}`} className="word-gap">
              {" "}
            </span>
          );
        }
        if (!w) return null;
        const chars = Array.from(w);
        return (
          <span key={`w-${wi}`} className="word">
            {chars.map((ch, ci) => {
              const i = charIdx++;
              return (
                <span
                  key={`c-${wi}-${ci}`}
                  className={`char ${mode}`}
                  style={{ ["--i" as any]: i } as React.CSSProperties}
                >
                  {ch}
                </span>
              );
            })}
            {mode === "in" && wi === words.length - 1 && (
              <span
                className="caret"
                style={{
                  ["--i" as any]: charIdx,
                  animationDelay: `${charIdx * 28 + 200}ms`,
                } as React.CSSProperties}
              />
            )}
          </span>
        );
      })}
    </>
  );
}

function formatRelative(ts: number, now: number) {
  const diffMs = Math.max(0, now - ts);
  const sec = Math.round(diffMs / 1000);
  if (sec < 45) return "just now";
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;
  const mo = Math.round(day / 30);
  if (mo < 12) return `${mo} mo ago`;
  const yr = Math.round(mo / 12);
  return `${yr} yr ago`;
}

export function Content({
  isSignedIn,
  onSubmit,
  value,
  user,
  postedAt,
}: {
  isSignedIn: boolean;
  onSubmit?: (next: string) => void;
  value?: string;
  user?: string;
  postedAt?: number;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!postedAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, [postedAt]);
  const navigate = useNavigate();
  const phraseRef = useRef<HTMLHeadingElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  const hasContent = value != null && value !== "";
  const showImage = hasContent ? hasImageContent(value!) : false;

  // Remember the previous rendered phrase so we can animate it out while the
  // new one animates in.
  const [outgoing, setOutgoing] = useState<{ text: string; key: number } | null>(null);
  const prevValueRef = useRef<string | undefined>(value);
  const outgoingTimerRef = useRef<number | null>(null);
  useEffect(() => {
    const prev = prevValueRef.current;
    prevValueRef.current = value;
    if (prev && value && prev !== value && !hasImageContent(prev) && !hasImageContent(value)) {
      if (outgoingTimerRef.current != null) {
        window.clearTimeout(outgoingTimerRef.current);
      }
      setOutgoing({ text: prev, key: Date.now() });
      outgoingTimerRef.current = window.setTimeout(() => {
        setOutgoing(null);
        outgoingTimerRef.current = null;
      }, 750);
    }
    return () => {
      if (outgoingTimerRef.current != null) {
        window.clearTimeout(outgoingTimerRef.current);
        outgoingTimerRef.current = null;
      }
    };
  }, [value]);

  // Fit phrase text to the stage area
  useLayoutEffect(() => {
    const el = phraseRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;

    const fit = () => {
      el.style.setProperty("--auto", "1");
      const wrap = el.closest(".phrase-wrap") as HTMLElement | null;
      const sr = stage.getBoundingClientRect();
      // Subtract siblings (phrase-rail above, composer/nudge below) so the
      // phrase only claims the space actually available to it.
      let siblingsH = 0;
      if (wrap) {
        Array.from(wrap.children).forEach((c) => {
          if (!(c as HTMLElement).contains(el)) {
            siblingsH += (c as HTMLElement).offsetHeight;
          }
        });
      }
      const availH = Math.max(80, sr.height - siblingsH - 24);
      const availW = sr.width - 48;
      const r = el.getBoundingClientRect();
      if (r.height <= availH && r.width <= availW) return;
      const scale = Math.min(availH / r.height, availW / r.width);
      el.style.setProperty("--auto", String(Math.max(0.3, scale * 0.97)));
    };

    const raf = requestAnimationFrame(fit);
    const onResize = () => {
      requestAnimationFrame(fit);
    };
    window.addEventListener("resize", onResize);

    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => fit());
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [value]);

  // Subtle pointer parallax on the phrase
  useEffect(() => {
    const el = phraseRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      // Lean toward the pointer: the edge closest to the cursor tilts forward.
      const rotY = -curX * 9;
      const rotX = curY * 6;
      const tx = curX * 12;
      const ty = curY * 8;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <main ref={stageRef} className="stage">
      <div className="phrase-wrap">
        <div className="phrase-rail">
          <div className="phrase-kicker">
            <span className="bar" />
            The phrase
          </div>
          <div className="spacer" />
          <div className="phrase-meta-tr">
            {hasContent && user && (
              <div>
                by <b>{user.toLowerCase()}</b>
              </div>
            )}
            {hasContent && postedAt && (
              <div>{formatRelative(postedAt, now)}</div>
            )}
          </div>
        </div>

        {value == null && (
          <>
            <h1 className="phrase loading" ref={phraseRef}>
              <span className="loading-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </h1>
            <div className="composer-wrap" aria-hidden="true" />
          </>
        )}

        {value != null && !showImage && (
          <div className="phrase-stack">
            {outgoing && (
              <h1
                key={`out-${outgoing.key}`}
                className="phrase phrase-outgoing"
                aria-hidden="true"
              >
                <AnimatedPhrase text={outgoing.text} mode="out" />
              </h1>
            )}
            <h1
              className={`phrase${hasContent ? "" : " dim"}`}
              ref={phraseRef}
              aria-live="polite"
              key={value || "empty"}
            >
              {hasContent ? (
                <AnimatedPhrase text={value!} mode="in" />
              ) : (
                "start typing…"
              )}
            </h1>
          </div>
        )}

        {value != null && showImage && (
          <div
            className="phrase phrase-image"
            ref={phraseRef as any}
          >
            <RichContent value={value!} />
          </div>
        )}

        {isSignedIn && value != null && !!onSubmit && (
          <Input onSubmit={onSubmit} initial={value} />
        )}

        {!isSignedIn && value != null && (
          <div className="composer-wrap">
            <button
              className="signin-nudge"
              onClick={() => navigate("/signin")}
            >
              <b>sign in</b> to take the canvas
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
