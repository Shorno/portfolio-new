import type { ComponentProps, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Custom MDX components — the editorial vocabulary of every case study.

   Use from inside .mdx files:
     <Callout>...</Callout>
     <Shot src="..." caption="..." />
     <Diagram caption="..."><svg>...</svg></Diagram>
     <Stack items={[{name: "Postgres", note: "..."}, ...]} />
     <Stat value="5" label="apps" />
     <Pull>quote text</Pull>
   ───────────────────────────────────────────────────────────────── */

/** Sidebar / inline note. Renders as a slim card with an accent left rule. */
export function Callout({
  children,
  tone = "default",
  label = "note",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "warn";
  label?: string;
}) {
  const accent = {
    default: "before:bg-line-strong text-fg-soft",
    accent: "before:bg-accent text-fg-soft",
    warn: "before:bg-signal-warn text-fg-soft",
  }[tone];
  return (
    <aside
      className={cn(
        "relative my-8 rounded-md border border-line bg-bg-elev/60 px-5 py-4 pl-6",
        "before:absolute before:top-3 before:bottom-3 before:left-2 before:w-px",
        accent,
      )}
    >
      <div className="mono-label mb-2 text-faint">/ {label}</div>
      <div className="text-[14.5px] leading-relaxed [&_*]:my-1.5 [&_*:first-child]:mt-0 [&_*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}

/** Pull quote — large italic Fraunces with an oversized opening quote glyph. */
export function Pull({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="relative my-14 pl-10 md:my-20 md:pl-16">
      <span
        aria-hidden
        className="font-display-italic absolute top-[-0.2em] left-0 text-[5rem] leading-none text-accent md:text-[7rem]"
      >
        &ldquo;
      </span>
      <blockquote className="font-display-italic text-balance text-2xl leading-snug text-fg md:text-[2rem] md:leading-tight">
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="mono-label mt-5 text-faint">— {cite}</figcaption>
      ) : null}
    </figure>
  );
}

/** Figure with a screenshot or generative art placeholder + caption. */
export function Shot({
  src,
  alt,
  caption,
  aspect = "16/10",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: "16/10" | "4/3" | "1/1" | "21/9";
}) {
  return (
    <figure className="my-10">
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-line bg-bg-elev/40",
          aspect === "16/10" && "aspect-[16/10]",
          aspect === "4/3" && "aspect-[4/3]",
          aspect === "1/1" && "aspect-square",
          aspect === "21/9" && "aspect-[21/9]",
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            className="h-full w-full object-cover"
          />
        ) : (
          <ShotPlaceholder label={alt ?? "screenshot pending"} />
        )}
      </div>
      {caption ? (
        <figcaption className="mono-label mt-3 text-faint">
          fig. — {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ShotPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-bg-elev/40">
      <svg
        className="absolute inset-0 h-full w-full text-line/60"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="relative font-mono text-[11px] tracking-wide text-faint">
        [ {label} ]
      </span>
    </div>
  );
}

/** Figure wrapping inline SVG or any diagram children.
 *  Breaks out of the prose column on wider screens for breathing room. */
export function Diagram({
  children,
  caption,
  className,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className="my-12 lg:-mx-24 xl:-mx-40">
      <div
        className={cn(
          "rounded-md border border-line bg-bg-elev/40 p-6 md:p-10",
          className,
        )}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="mono-label mt-3 text-faint">
          fig. — {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Spec-sheet style stack list: each entry has a name and a one-line reason. */
export function Stack({
  items,
}: {
  items: Array<{ name: string; note: string; group?: string }>;
}) {
  return (
    <dl className="my-10 grid gap-x-8 gap-y-5 border-y border-line py-6 md:grid-cols-2">
      {items.map((it) => (
        <div key={it.name} className="flex flex-col gap-1.5">
          <dt className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[13px] text-fg">{it.name}</span>
            {it.group ? (
              <span className="mono-label text-faint">{it.group}</span>
            ) : null}
          </dt>
          <dd className="text-[13px] leading-relaxed text-fg-soft">{it.note}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Big-number stat for inline display. Auto-shrinks long string values. */
export function Stat({
  value,
  label,
  unit,
}: {
  value: ReactNode;
  label: string;
  unit?: string;
}) {
  // String values longer than ~6 chars need to scale down so they don't
  // crash into neighbours in the 4-col grid.
  const isLongString =
    typeof value === "string" && (value as string).length > 6;
  return (
    <div className="flex min-w-0 flex-col gap-1.5 border-t border-line pt-3">
      <span
        className={cn(
          "font-display block truncate text-fg",
          isLongString
            ? "text-[clamp(1.5rem,3.5vw,2.25rem)]"
            : "text-[clamp(2rem,5vw,3.75rem)]",
        )}
      >
        {value}
        {unit ? (
          <span className="ml-1 font-mono text-base text-muted">{unit}</span>
        ) : null}
      </span>
      <span className="mono-label">{label}</span>
    </div>
  );
}

/** Horizontal row of Stats. */
export function StatRow({ children }: { children: ReactNode }) {
  return (
    <div className="my-12 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:-mx-24 xl:-mx-40">
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Default HTML overrides — editorial prose styling
   ───────────────────────────────────────────────────────────────── */

function H2({ className, children, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className={cn(
        "mt-16 mb-4 font-display text-4xl text-balance text-fg md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function H3({ className, children, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        "mt-10 mb-3 font-mono text-[12px] tracking-[0.18em] text-accent uppercase",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function P({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "my-5 text-pretty text-[16px] leading-relaxed text-fg-soft md:text-[17px] md:leading-[1.7]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function UL({ className, children, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={cn(
        "my-5 flex flex-col gap-2 pl-0 text-[16px] leading-relaxed text-fg-soft md:text-[17px]",
        className,
      )}
    >
      {children}
    </ul>
  );
}

function LI({ className, children, ...props }: ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={cn(
        "relative pl-6 before:absolute before:top-3 before:left-0 before:h-px before:w-3 before:bg-accent",
        className,
      )}
    >
      {children}
    </li>
  );
}

function Code({ className, children, ...props }: ComponentProps<"code">) {
  return (
    <code
      {...props}
      className={cn(
        "rounded-[3px] border border-line bg-bg-elev px-1.5 py-px font-mono text-[0.85em] text-fg",
        className,
      )}
    >
      {children}
    </code>
  );
}

function HR({ className, ...props }: ComponentProps<"hr">) {
  return (
    <hr
      {...props}
      className={cn("my-12 h-px w-full border-0 bg-line", className)}
    />
  );
}

function A({ className, children, ...props }: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...props}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "text-fg underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-accent",
        className,
      )}
    >
      {children}
      {external ? <span aria-hidden> ↗</span> : null}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Export the unified MDX components map
   ───────────────────────────────────────────────────────────────── */

export const mdxPrimitives: MDXComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  li: LI,
  code: Code,
  hr: HR,
  a: A,
  Callout,
  Pull,
  Shot,
  Diagram,
  Stack,
  Stat,
  StatRow,
};
