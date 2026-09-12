import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { MonoTag } from "@/components/primitives/mono-meta";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { site } from "@/lib/site";

/** Two rows on phones keep section links and theme selection directly available. */
export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-40 w-full backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-bg/70" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-line/60" />
      <Container className="grid h-[var(--site-header-h)] grid-cols-[1fr_auto] grid-rows-[56px_44px] items-center gap-x-3 md:grid-cols-[auto_1fr_auto] md:grid-rows-1">
        <div className="flex min-w-0 shrink items-center gap-3 sm:gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group flex min-h-11 shrink-0 items-center gap-2"
          >
            <span className="grid h-6 w-6 place-items-center rounded-sm bg-accent text-accent-fg">
              <span className="font-mono text-[11px] font-bold leading-none">
                S
              </span>
            </span>
            <span className="font-mono text-[13px] tracking-tight text-fg">
              shorno
              <span className="text-muted">.me</span>
            </span>
          </Link>
          <span className="hidden h-3 w-px bg-line xl:block" />
          <MonoTag tone="ok" className="hidden xl:inline-flex">
            open to roles · {site.location.split(",")[0]}
          </MonoTag>
        </div>

        <SiteHeaderNav />
      </Container>
    </header>
  );
}
