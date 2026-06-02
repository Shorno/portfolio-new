import { cn } from "@/lib/utils";

/**
 * Editorial section marker — "§01 / WORK" style.
 * Mono, uppercase, hairline rule on top. Used to introduce every major section.
 */
export function SectionMark({
  index,
  label,
  hint,
  className,
}: {
  /** Section index — formatted as §01, §02 etc. */
  index: number;
  /** Short uppercase label, e.g. "WORK", "SYSTEM" */
  label: string;
  /** Optional right-side hint, e.g. "3 case studies" */
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rule-t flex items-center justify-between pt-3 pb-1 text-muted",
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <span className="mono-label text-accent">
          §{String(index).padStart(2, "0")}
        </span>
        <span className="mono-label">{label}</span>
      </div>
      {hint ? <span className="mono-label">{hint}</span> : null}
    </div>
  );
}
