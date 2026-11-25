/** Section navigation uses the router; the CV stays a native link to avoid PDF prefetching. */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/primitives/button-link";
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
        className={cn("items-center gap-1", isOperator ? "flex" : "hidden md:flex")}
      >
        {isOperator ? (
          <>
            <Link href="/" className={navLinkClass(false)}>
              Back to site
            </Link>
            {session ? (
              <button
                type="button"
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.href = "/operator/login";
                      },
                    },
                  });
                }}
                className={cn(navLinkClass(false), "cursor-pointer")}
              >
                Sign out
              </button>
            ) : null}
          </>
        ) : (
          navSections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              aria-current={active === section.id ? "location" : undefined}
              className={navLinkClass(active === section.id)}
            >
              {section.label}
            </Link>
          ))
        )}
      </nav>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        {isOperator ? null : (
          <ButtonLink variant="ink" size="sm" arrow href={site.cvUrl} target="_blank" rel="noreferrer">
            Resume
          </ButtonLink>
        )}
      </div>
    </>
  );
}

function navLinkClass(isActive: boolean) {
  return cn(
    "inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors",
    isActive ? "bg-bg text-fg" : "text-fg-soft hover:bg-bg hover:text-fg",
  );
}
