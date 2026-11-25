/** Copyright, the code archive and GitHub. */
import Link from "next/link";
import { Arrow } from "@/components/primitives/arrow";
import { Container } from "@/components/primitives/container";
import { site } from "@/lib/site";

const link =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold text-fg underline decoration-line-strong decoration-1 underline-offset-[3px] transition-colors hover:text-accent";

export function SiteFooter() {
  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1 pt-8 pb-10 text-sm text-fg-soft">
        <p>© {new Date().getFullYear()} {site.fullName}</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5">
          <Link href="/archive" className={link}>Code archive</Link>
          <a href={site.github} target="_blank" rel="noreferrer" className={link}>GitHub <Arrow /></a>
        </nav>
      </Container>
    </footer>
  );
}
