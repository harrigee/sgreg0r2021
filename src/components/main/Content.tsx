import { FormEvent } from "react";
import Linkify from "react-linkify";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";

// Matches direct image URLs by extension
const IMAGE_SPLIT_RE =
  /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|avif|svg)(?:\?\S*)?)/i;
const IMAGE_TEST_RE =
  /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|avif|svg)(\?\S*)?$/i;

function RichContent({ value }: { value: string }) {
  const parts = value.split(IMAGE_SPLIT_RE).filter(Boolean);
  const hasImage = parts.some((p) => IMAGE_TEST_RE.test(p.trim()));

  if (!hasImage) {
    return <Linkify>{value}</Linkify>;
  }

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

function OrnamentDivider() {
  return (
    <div className="divider-ornament animate-fade-in">
      <hr />
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
        <rect
          x="3"
          y="0.5"
          width="3.5"
          height="3.5"
          transform="rotate(45 3 3)"
          fill="currentColor"
        />
      </svg>
      <hr />
    </div>
  );
}

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
  const navigate = useNavigate();
  const hasContent = value != null && value !== "";

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full py-24 gap-10">
      <div className="corner-marks w-full max-w-3xl px-10 md:px-14 py-8">
        <div>
          {value == null && (
            <div className="loading-dots animate-fade-in">
              <span />
              <span />
              <span />
            </div>
          )}

          {value != null && (
            <div className="animate-fade-up">
              {/* Use div instead of p to allow block-level img children */}
              <div
                className={`font-display font-bold text-left leading-[1.04] break-words ${
                  hasContent
                    ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-glow"
                    : "text-3xl md:text-4xl"
                }`}
                style={{
                  color: hasContent ? "var(--text)" : "var(--text-3)",
                  letterSpacing: hasContent ? "-0.03em" : "-0.01em",
                }}
              >
                {hasContent ? <RichContent value={value} /> : "Start typing..."}
                {hasContent && (
                  <span className="inline-cursor" aria-hidden="true" />
                )}
              </div>

              {hasContent && user && (
                <p className="attribution animate-fade-in">— {user}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {isSignedIn && value != null && !!onInput && (
        <>
          <OrnamentDivider />
          <Input onInput={onInput} user={user} />
        </>
      )}

      {!isSignedIn && value != null && (
        <button
          className="signin-nudge animate-fade-in"
          onClick={() => navigate("/signin")}
        >
          <span>sign in</span> to take the canvas
        </button>
      )}
    </div>
  );
}
