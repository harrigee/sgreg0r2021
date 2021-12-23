import { FormEvent } from "react";

export function Input({ onInput, value }: { onInput: (event: FormEvent<HTMLInputElement>) => void, value?: string }) {
    return <input
        value={value}
        onInput={onInput}
        className="w-1/3 border-4 focus:border-pink-500 rounded-full py-5 px-6 text-gray-700 font-extralight"
        placeholder="Just type something already... Sheeesh." />;
}