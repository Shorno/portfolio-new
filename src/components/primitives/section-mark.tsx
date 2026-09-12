import { cn } from "@/lib/utils";

/**
 * Editorial section marker — "§01 / WORK" style.
 * Mono, uppercase, hairline rule on top. Used to introduce every major section.
 */
export function SectionMark({
  index,
  label,
  hint,
  heading = false,
  className,
}: {
  /** Section index — formatted as §01, §02 etc. */
  index: number;
  /** Short uppercase label, e.g. "WORK", "SYSTEM" */
  label: string;
  /** Optional right-side hint, e.g. "3 case studies" */
  hint?: string;
  /** Use the section title itself as the heading instead of adding an eyebrow. */
  heading?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rule-t flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 pt-5 pb-1 text-muted",
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <span className="mono-label text-accent">
          §{String(index).padStart(2, "0")}
        </span>
        {heading ? <h2 className="font-display text-3xl text-fg md:text-4xl">{label}</h2> : <span className="mono-label">{label}</span>}
      </div>
      {hint ? <span className="text-sm text-muted">{hint}</span> : null}
    </div>
  );
}
