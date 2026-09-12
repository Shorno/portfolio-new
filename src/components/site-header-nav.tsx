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

    let observer: IntersectionObserver | undefined;
    let headerHeight = -1;

    const observeSections = () => {
      const height = document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 56;
      if (observer && height === headerHeight) return;
      headerHeight = height;
      observer?.disconnect();
      ratios.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(entry.target.id, entry.intersectionRatio);
          }
          pickActive();
        },
        {
          rootMargin: `-${headerHeight}px 0px -45% 0px`,
          threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        },
      );

      for (const id of navSectionIds) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };

    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [pathname]);

  return pathname === "/" ? active : null;
}

export function SiteHeaderNav() {
  const active = useActiveSection();
  const pathname = usePathname();
  const isOperator = pathname?.startsWith("/operator");
  const { data: session } = authClient.useSession();

  return (
    <>
      <nav
        aria-label="Primary"
        className="col-span-2 row-start-2 flex min-w-0 items-center justify-between gap-0 md:col-span-1 md:col-start-2 md:row-start-1 md:justify-end md:gap-1"
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
            <div className="mx-2 hidden h-4 w-px bg-line md:block" />
            <Link
              href={site.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="group hidden min-h-11 items-center gap-1.5 px-3 text-sm font-medium text-fg transition-colors hover:text-accent md:inline-flex"
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
      </nav>
      <ThemeToggle className="col-start-2 row-start-1 justify-self-end md:col-start-3" />
    </>
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
        "group relative inline-flex min-h-11 items-center gap-1 rounded-sm px-1 py-1.5 text-[13px] transition-colors sm:gap-1.5 sm:px-2.5 sm:text-sm md:min-h-9",
        isActive
          ? "text-fg underline decoration-accent decoration-1 underline-offset-[5px]"
          : "text-fg-soft hover:text-fg",
      )}
    >
      <span
        className={cn(
          "mono-label hidden text-[12px] xl:inline",
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
