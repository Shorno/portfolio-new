"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  navSectionIds,
  navSections,
  type NavSectionId,
} from "@/lib/nav-sections";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

/** Tracks which homepage section is in view for header nav highlighting. */
function useActiveSection(): NavSectionId | null {
  const pathname = usePathname();
  const [active, setActive] = useState<NavSectionId | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const hash = window.location.hash.slice(1);
    if (navSectionIds.includes(hash as NavSectionId)) {
      setActive(hash as NavSectionId);
    }

    const ratios = new Map<string, number>();

    const pickActive = () => {
      let bestId: NavSectionId | null = null;
      let bestRatio = 0;

      for (const id of navSectionIds) {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setActive(bestRatio > 0 ? bestId : null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        pickActive();
      },
      {
        rootMargin: "-56px 0px -45% 0px",
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      },
    );

    for (const id of navSectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return pathname === "/" ? active : null;
}

export function SiteHeaderNav() {
  const active = useActiveSection();
  const pathname = usePathname();
  const isOperator = pathname?.startsWith("/operator");
  const { data: session } = authClient.useSession();

  return (
    <nav
      aria-label="Primary"
      className="flex min-w-0 shrink-0 items-center justify-end gap-0 sm:gap-1"
    >
      {isOperator ? (
        <>
          <Link
            href="/"
            className="group relative inline-flex items-baseline gap-1 rounded-sm px-1 py-1.5 text-[12.5px] transition-colors sm:gap-1.5 sm:px-2.5 sm:text-sm text-fg-soft hover:text-fg"
          >
            <span className="mono-label text-faint group-hover:text-accent">←</span>
            Back to Site
          </Link>
          {session && (
            <>
              <div className="mx-2 hidden h-4 w-px bg-line sm:block" />
              <button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.href = "/operator/login";
                      },
                    },
                  });
                }}
                className="group relative inline-flex items-baseline gap-1 rounded-sm px-1 py-1.5 text-[12.5px] transition-colors sm:gap-1.5 sm:px-2.5 sm:text-sm text-fg-soft hover:text-accent cursor-pointer"
              >
                Sign Out
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {navSections.map((section) => (
            <NavItem
              key={section.id}
              href={section.href}
              label={section.label}
              idx={section.idx}
              isActive={active === section.id}
            />
          ))}
          <div className="mx-2 hidden h-4 w-px bg-line sm:block" />
          <Link
            href={site.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] tracking-wide text-fg-soft transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            CV
            <span
              aria-hidden
              className="text-faint transition-colors group-hover:text-accent"
            >
              ↗
            </span>
          </Link>
        </>
      )}
      <ThemeToggle className="hidden sm:inline-flex" />
    </nav>
  );
}

function NavItem({
  href,
  label,
  idx,
  isActive,
}: {
  href: string;
  label: string;
  idx: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "location" : undefined}
      className={cn(
        "group relative inline-flex items-baseline gap-1 rounded-sm px-1 py-1.5 text-[12.5px] transition-colors sm:gap-1.5 sm:px-2.5 sm:text-sm",
        isActive
          ? "text-fg underline decoration-accent decoration-1 underline-offset-[5px]"
          : "text-fg-soft hover:text-fg",
      )}
    >
      <span
        className={cn(
          "mono-label hidden text-[11px] sm:inline sm:text-[12px]",
          isActive
            ? "text-accent"
            : "text-faint group-hover:text-accent",
        )}
      >
        {idx}
      </span>
      {label}
    </Link>
  );
}
