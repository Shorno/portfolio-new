import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { MonoTag } from "@/components/primitives/mono-meta";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-bg/70" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-line/60" />
      <Container className="flex h-14 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
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
            <span className="font-mono text-[13px] tracking-tight text-fg">
              shorno
              <span className="text-muted">.me</span>
            </span>
          </Link>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <MonoTag tone="ok" className="hidden sm:inline-flex">
            available · {site.location.split(",")[0]}
          </MonoTag>
        </div>

        <nav className="flex shrink-0 items-center gap-0 sm:gap-1">
          <NavItem href="/#work" label="Work" idx="01" />
          <NavItem href="/#experience" label="Experience" idx="02" />
          <NavItem href="/#system" label="System" idx="03" />
          <NavItem href="/#index" label="Index" idx="04" />
          <NavItem href="/#contact" label="Contact" idx="05" />
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
          <ThemeToggle className="hidden sm:inline-flex" />
        </nav>
      </Container>
    </header>
  );
}

function NavItem({
  href,
  label,
  idx,
}: {
  href: string;
  label: string;
  idx: string;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-baseline gap-1 rounded-sm px-1.5 py-1.5 text-[12.5px] text-fg-soft transition-colors hover:text-fg sm:gap-1.5 sm:px-2.5 sm:text-sm"
    >
      <span className="mono-label hidden text-[10px] text-faint group-hover:text-accent sm:inline">
        {idx}
      </span>
      {label}
    </Link>
  );
}
