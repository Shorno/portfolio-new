import type { ComponentProps } from "react";
import { Arrow } from "@/components/primitives/arrow";
import { cn } from "@/lib/utils";

type Variant = "accent" | "ink" | "outline" | "inverse" | "ghost-inverse";

const variants: Record<Variant, string> = {
  accent: "border-accent bg-accent text-accent-fg hover:border-accent-hover hover:bg-accent-hover",
  ink: "border-ink bg-ink text-ink-fg hover:opacity-90",
  outline: "border-line-strong bg-bg-elev text-fg hover:border-fg",
  /* for use on an ink surface (the contact card) */
  inverse: "border-ink-fg bg-ink-fg text-ink hover:opacity-90",
  "ghost-inverse": "border-ink-fg/30 bg-transparent text-ink-fg hover:border-ink-fg",
};

/**
 * Pill button. `arrow` adds an inline outbound arrow after the label.
 * Renders a native anchor so mailto and PDF links never go through the router.
 */
export function ButtonLink({
  variant = "outline",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: "sm" | "md"; arrow?: boolean }) {
  return (
    <a
      {...props}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2 rounded-full border font-semibold transition-[background-color,border-color,opacity] duration-200 ease-out",
        size === "md" ? "min-h-12 px-6 text-[0.9375rem]" : "min-h-10 px-[1.125rem] text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow ? (
        <Arrow className="size-[0.6875rem] shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      ) : null}
    </a>
  );
}
