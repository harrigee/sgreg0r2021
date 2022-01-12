import { FormEvent } from "react";

export function Input({ onInput, value }: { onInput: (event: FormEvent<HTMLInputElement>) => void, value?: string }) {
    return <input
        value={value}
        onInput={onInput}
        className="border-4 focus:border-pink-500 rounded-full py-4 px-6 w-1/4 self-center text-gray-700 font-extralight"
        placeholder="Just type something already... Sheeesh." />;
}