import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A spec-sheet style key/value pair rendered in mono.
 * Stacks `label` on top, `value` underneath. Used for hero status panel,
 * stack lists, case study metadata, etc.
 */
export function MonoMeta({
  label,
  value,
  align = "left",
  className,
}: {
  label: string;
  value: ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        align === "right" && "items-end text-right",
        className,
      )}
    >
      <span className="mono-label">{label}</span>
      <span className="font-mono text-[13px] leading-snug tracking-tight text-fg-soft">
        {value}
      </span>
    </div>
  );
}

/**
 * Inline mono tag — small uppercase chip used in status strips and metadata rows.
 * Renders as text with a leading dot marker. No background fill.
 */
export function MonoTag({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "ok" | "warn";
  className?: string;
}) {
  const dotTone = {
    default: "bg-muted",
    accent: "bg-accent",
    ok: "bg-signal-ok",
    warn: "bg-signal-warn",
  }[tone];

  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 text-fg-soft",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          dotTone,
          tone === "ok" && "animate-pulse",
        )}
      />
      {children}
    </span>
  );
}
