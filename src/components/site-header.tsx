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
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group flex items-center gap-2"
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

        <nav className="flex items-center gap-1">
          <NavItem href="#work" label="Work" idx="01" />
          <NavItem href="#system" label="System" idx="02" />
          <NavItem href="#index" label="Index" idx="03" />
          <NavItem href="#contact" label="Contact" idx="04" />
          <div className="mx-2 hidden h-4 w-px bg-line sm:block" />
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
      className="group relative inline-flex items-baseline gap-1.5 rounded-sm px-2.5 py-1.5 text-sm text-fg-soft transition-colors hover:text-fg"
    >
      <span className="mono-label text-[10px] text-faint group-hover:text-accent">
        {idx}
      </span>
      {label}
    </Link>
  );
}
