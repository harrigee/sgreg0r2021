import { FormEvent } from "react";

export function Input({
  onInput,
  value,
  user,
}: {
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  value?: string;
  user?: string;
}) {
  return (
    <div className="input-container animate-fade-in">
      <input
        value={value}
        onInput={onInput}
        className="minimal-input"
        placeholder="Type something..."
        autoFocus
      />
    </div>
  );
}
