import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial container — wide max-width with consistent gutter.
 * Used by every section to keep horizontal rhythm aligned.
 */
export function Container({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 2xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
