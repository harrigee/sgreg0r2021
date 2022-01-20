import { FormEvent } from "react";
import Linkify from "react-linkify";
import { Input } from "./Input";
import { JellyfishSpinner } from "react-spinners-kit";

export function Content({
  isSignedIn,
  onInput,
  value,
  user,
}: {
  isSignedIn: boolean;
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
            {value !== "" && user && <p className="mt-4">{user}</p>}
          </>
        )}
        {value == null && (
          <JellyfishSpinner size={128} color="white" loading={true} />
        )}
      </div>
      {isSignedIn && value != null && !!onInput && <Input onInput={onInput} />}
    </>
  );
}
