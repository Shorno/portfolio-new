/** A small footer keeps the wider archive accessible without extending the hiring overview. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
          <p className="text-xs text-muted">© {new Date().getFullYear()} {site.fullName}</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 text-sm text-fg-soft">
            <Link href="/archive" className="inline-flex min-h-11 items-center hover:text-accent">Code archive</Link>
            <Link href={site.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-accent">GitHub <span aria-hidden>↗</span></Link>
            <Link href="/operator" className="inline-flex min-h-11 items-center text-xs text-muted hover:text-accent">Sign in</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}