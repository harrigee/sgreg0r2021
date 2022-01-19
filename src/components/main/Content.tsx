import { FormEvent } from "react";
import Linkify from "react-linkify";
import { Input } from "./Input";
import { JellyfishSpinner } from "react-spinners-kit";

export function Content({
  onInput,
  value,
  user,
}: {
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
  value?: string;
  user?: string;
}) {
  return (
    <>
      <div className="text-white text-shadow self-center max-w-[50%] my-16 hover:opacity-80">
        {value != null && (
          <>
            <p className="break-words text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
              <Linkify>{value !== "" ? value : "Type something..."}</Linkify>
            </p>
            {user && <p className="mt-4">{user}</p>}
          </>
        )}
        {value == null && (
          <JellyfishSpinner size={128} color="white" loading={true} />
        )}
      </div>
      {value != null && !!onInput && <Input onInput={onInput} />}
    </>
  );
}
