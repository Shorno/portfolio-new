import { cn } from "@/lib/utils";

/**
 * Editorial hairline rule with optional tick mark in the corner —
 * gives sections that "technical drawing" feel.
 */
export function Rule({
  variant = "plain",
  className,
}: {
  variant?: "plain" | "ticked";
  className?: string;
}) {
  if (variant === "ticked") {
    return (
      <div className={cn("relative h-px w-full bg-line", className)}>
        <span className="absolute top-1/2 left-0 h-2 w-px -translate-y-1/2 bg-line-strong" />
        <span className="absolute top-1/2 right-0 h-2 w-px -translate-y-1/2 bg-line-strong" />
      </div>
    );
  }
  return <div className={cn("h-px w-full bg-line", className)} />;
}
