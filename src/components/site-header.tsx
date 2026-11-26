/**
 * Floating pill header: short name with the teal full stop (the site's one
 * signature mark), section links, theme toggle and resume.
 */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-40 w-full pt-3.5">
      <Container>
        <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-bg-elev/85 py-2 pr-2 pl-3 shadow-card backdrop-blur-md md:pl-5">
          <Link href="/" aria-label={`${site.fullName}, home`} className="flex min-h-10 items-center pl-1 font-display text-[1.1875rem] whitespace-nowrap text-fg md:pl-0">
            {site.name}<span className="text-accent">.</span>
          </Link>
          <SiteHeaderNav />
        </div>
      </Container>
    </header>
  );
}
