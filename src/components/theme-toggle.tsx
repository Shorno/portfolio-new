"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/** Plain-text theme switch. The label names the theme it switches to. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "paper" : "dark")}
      className={cn(
        "inline-flex min-h-10 cursor-pointer items-center rounded-full px-3 text-[0.9375rem] font-medium text-fg-soft transition-colors hover:bg-bg hover:text-fg",
        className,
      )}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
