import { Fragment } from "react";

/** Franja de texto en movimiento continuo (solo CSS). */
export function Marquee({
  items,
  className = "",
  duration = 40,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee items-center"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((t) => (
              <Fragment key={t}>
                <span className="display whitespace-nowrap px-6 text-4xl sm:text-6xl">{t}</span>
                <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-gold sm:size-8" aria-hidden="true">
                  <path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                </svg>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
