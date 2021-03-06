import { FormEvent } from "react";

export function Input({
  onInput,
  value,
}: {
  onInput: (event: FormEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  return (
    <input
      value={value}
      onInput={onInput}
      className=" bg-zinc-900 border-4 focus:border-sky-500 rounded-full py-4 px-6 mb-16 w-1/2 min-w-[200px] max-w-[600px] self-center text-white font-bold placeholder-zinc-500"
      placeholder="Just type something already... Sheeesh."
    />
  );
}
