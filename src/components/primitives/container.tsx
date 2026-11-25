import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Page-width wrapper. Every section uses it. */
export function Container({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-7", className)}
    >
      {children}
    </div>
  );
}
