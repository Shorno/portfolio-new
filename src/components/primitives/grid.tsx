import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * 12-col editorial grid. Children should use col-span-* utilities.
 * Gap aligned with the typographic baseline rhythm.
 */
export function Grid({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-4 gap-x-4 gap-y-6 md:grid-cols-12 md:gap-x-6 md:gap-y-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
