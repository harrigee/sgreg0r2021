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
    <main className="stage" style={{ alignItems: "center" }}>
      <div className="signin-card">
        <div className="mode-toggle">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={mode === m ? "active" : ""}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <h1>{isSignIn ? "welcome back" : "create account"}</h1>
        <p className="subtitle">
          {isSignIn ? "sign in to take the canvas" : "get started in a second"}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          {!isSignIn && (
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignIn ? "current-password" : "new-password"}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading} className="submit">
            {loading
              ? isSignIn
                ? "signing in…"
                : "creating account…"
              : isSignIn
              ? "sign in"
              : "create account"}
          </button>
        </form>
      </div>
    </main>
  );
}
