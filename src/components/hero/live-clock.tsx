"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Live ticking clock for a given timezone. Renders a stable invisible
 * placeholder server-side to reserve layout space and avoid hydration
 * mismatch, then takes over on the client.
 */
export function LiveClock({
  timeZone = "Asia/Dhaka",
  className,
}: {
  timeZone?: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span
      className={cn("tabular-nums tracking-tight", className)}
      aria-live="off"
      suppressHydrationWarning
    >
      {time ?? "00:00:00"}
    </span>
  );
}
