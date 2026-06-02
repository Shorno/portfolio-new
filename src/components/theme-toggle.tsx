"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "paper" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "paper" : "dark")}
      className={cn(
        "group relative inline-flex h-7 items-center gap-2 rounded-full border border-line-strong/60 bg-bg-elev/40 px-1 backdrop-blur-sm transition-colors hover:border-line-strong",
        className,
      )}
    >
      <span className="mono-label px-2 text-[10px] tracking-[0.18em] text-muted">
        {isDark ? "DARK" : "PAPER"}
      </span>
      <span
        className={cn(
          "h-5 w-5 rounded-full border border-line-strong/80 transition-all duration-300",
          isDark
            ? "translate-x-0 bg-fg/10"
            : "-translate-x-1 bg-accent/90",
        )}
        aria-hidden
      />
    </button>
  );
}
