import type { ComponentProps } from "react";
import { Arrow } from "@/components/primitives/arrow";
import { cn } from "@/lib/utils";

type Variant = "accent" | "ink" | "outline" | "inverse" | "ghost-inverse";

const variants: Record<Variant, { button: string; badge: string }> = {
  accent: { button: "border-accent bg-accent text-accent-fg hover:bg-accent-hover hover:border-accent-hover", badge: "bg-accent-fg text-accent" },
  ink: { button: "border-ink bg-ink text-ink-fg", badge: "bg-ink-fg text-ink" },
  outline: { button: "border-line bg-bg-elev text-fg", badge: "bg-ink text-ink-fg" },
  /* for use on an ink surface (the contact card) */
  inverse: { button: "border-ink-fg bg-ink-fg text-ink", badge: "bg-ink text-ink-fg" },
  "ghost-inverse": { button: "border-ink-fg/25 bg-transparent text-ink-fg hover:border-ink-fg/60", badge: "bg-ink-fg text-ink" },
};

/**
 * Pill button. `arrow` adds the round arrow badge on the right.
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
  const v = variants[variant];
  return (
    <a
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full border font-semibold transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:-translate-y-px hover:shadow-card",
        size === "md" ? "min-h-12 px-[1.375rem] text-[0.9375rem]" : "min-h-10 px-4 text-sm",
        arrow && (size === "md" ? "pr-2.5" : "pr-1.5"),
        v.button,
        className,
      )}
    >
      {children}
      {arrow ? (
        <span aria-hidden className={cn("grid size-[1.625rem] place-items-center rounded-full", v.badge)}>
          <Arrow className="size-[0.6875rem]" />
        </span>
      ) : null}
    </a>
  );
}
