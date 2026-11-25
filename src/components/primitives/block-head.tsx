import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading with an optional one-line intro on the right. */
export function BlockHead({
  id,
  title,
  intro,
  className,
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8", className)}>
      <h2 id={id} className="font-display text-[clamp(2rem,3.4vw,2.75rem)] text-fg">
        {title}
      </h2>
      {intro ? <p className="max-w-[44ch] text-fg-soft">{intro}</p> : null}
    </div>
  );
}
