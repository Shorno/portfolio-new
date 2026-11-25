import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small rounded label. `live` is the mint status pill; `muted` sits on the page tone. */
export function Chip({
  tone = "outline",
  className,
  children,
}: {
  tone?: "outline" | "muted" | "live";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8125rem] leading-none font-semibold",
        tone === "outline" && "border border-line bg-bg-elev text-fg",
        tone === "muted" && "bg-bg text-fg-soft",
        tone === "live" && "bg-tint-mint text-tint-mint-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
