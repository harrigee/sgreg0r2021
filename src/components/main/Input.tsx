import { FormEvent, useState } from "react";

const MAX = 140;

export function Input({
  onSubmit,
  initial,
}: {
  onSubmit: (value: string) => void;
  initial?: string;
}) {
  const [local, setLocal] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = local.trim();
    if (!v) return;
    onSubmit(v);
    setLocal("");
  }

  const n = local.length;
  const hasValue = n > 0;
  const warn = n > 110;

  return (
    <div className="composer-wrap">
      <form
        className={`composer${hasValue ? " has-value" : ""}`}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="input-wrap">
          <span className="lead">
            <span className="dot-sq" />
            Write next
          </span>
          <input
            type="text"
            maxLength={MAX}
            placeholder={initial ? "replace the current phrase…" : "say something worth reading…"}
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            autoFocus
          />
        </div>
        <div className="meta">
          <span className={`count${warn ? " warn" : ""}`}>
            {n} / {MAX}
          </span>
          <span className="enter">
            <kbd>↵</kbd> to post
          </span>
        </div>
      </form>

      <div className="composer-hint">
        <span>be kind</span>
      </div>
    </div>
  );
}
