import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

type Mode = "signin" | "signup";

export function SignIn() {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setPassword("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signin") {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await user?.updateProfile({ displayName: name.trim() });
      }
      navigate("/");
    } catch (err: any) {
      const code: string = err?.code ?? "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError(err?.message ?? "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  const isSignIn = mode === "signin";

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 animate-fade-up">
      <div
        className="corner-marks w-full"
        style={{
          maxWidth: "22rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Mode toggle */}
        <div
          style={{
            display: "flex",
            background: "var(--surface-2)",
            borderRadius: "10px",
            padding: "3px",
            marginBottom: "2rem",
            gap: "3px",
          }}
        >
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                padding: "0.45rem 0",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                transition: "background 0.18s ease, color 0.18s ease",
                background: mode === m ? "var(--surface)" : "transparent",
                color: mode === m ? "var(--text)" : "var(--text-3)",
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
            }}
          >
            {isSignIn ? "Welcome back" : "Create account"}
          </div>
          <p
            style={{
              color: "var(--text-3)",
              fontSize: "0.875rem",
              marginTop: "0.4rem",
              marginBottom: 0,
            }}
          >
            {isSignIn ? "Sign in to continue" : "Get started today"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          {!isSignIn && (
            <div>
              <label style={labelStyle}>Name</label>
              <input
                className="minimal-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email</label>
            <input
              className="minimal-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              className="minimal-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignIn ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.8125rem",
                margin: 0,
                padding: "0.6rem 0.8rem",
                background: "rgba(248,113,113,0.08)",
                borderRadius: "8px",
                border: "1px solid rgba(248,113,113,0.18)",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.25rem",
              background: loading ? "var(--surface-2)" : "var(--accent)",
              color: loading ? "var(--text-2)" : "#131211",
              border: "none",
              borderRadius: "10px",
              padding: "0.75rem 1.2rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.9375rem",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              transition: "background 0.18s ease, color 0.18s ease",
            }}
          >
            {loading
              ? isSignIn ? "Signing in…" : "Creating account…"
              : isSignIn ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6875rem",
  color: "var(--text-2)",
  marginBottom: "0.4rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
};
