import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { MonoTag } from "@/components/primitives/mono-meta";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-bg/70" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-line/60" />
      <Container className="flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 shrink items-center gap-3 sm:gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group flex shrink-0 items-center gap-2"
          >
            <span className="grid h-6 w-6 place-items-center rounded-sm bg-accent text-accent-fg">
              <span className="font-mono text-[11px] font-bold leading-none">
                S
              </span>
            </span>
            <span className="hidden font-mono text-[13px] tracking-tight text-fg sm:inline">
              shorno
              <span className="text-muted">.me</span>
            </span>
          </Link>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <MonoTag tone="ok" className="hidden sm:inline-flex">
            open to roles · {site.location.split(",")[0]}
          </MonoTag>
        </div>

        <SiteHeaderNav />
      </Container>
    </header>
  );
}
