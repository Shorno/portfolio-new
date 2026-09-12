/** Direct section links and a compact wordmark keep navigation out of the content's way. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-40 w-full border-b border-line bg-bg">
      <Container className="grid h-[var(--site-header-h)] grid-cols-[1fr_auto] grid-rows-[56px_44px] items-center gap-x-3 md:grid-cols-[auto_1fr_auto] md:grid-rows-1">
        <Link href="/" aria-label={`${site.name} — home`} className="flex min-h-11 items-center text-sm font-semibold tracking-tight text-fg hover:text-accent">
          shorno<span className="text-accent">.me</span>
        </Link>
        <SiteHeaderNav />
      </Container>
    </header>
  );
}