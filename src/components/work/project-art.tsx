import Image from "next/image";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

/**
 * Generative placeholder art per project. Uses a deterministic PRNG so each
 * project gets a stable, distinctive composition. Three variants:
 *
 * - "grid"      — dense catalog-cell mosaic (commerce / catalog feel)
 * - "wires"     — node-and-edge network (multi-tenant / monorepo feel)
 * - "blueprint" — floor-plan-style technical drawing (inventory / ops feel)
 *
 * When `project.image` is set, that takes precedence and we render the real
 * screenshot instead. Swap in real assets at any time by setting the field
 * in src/lib/projects.ts.
 */
export function ProjectArt({
  project,
  className,
  priority = false,
  /** `cover` fills the card slot (homepage work stack). `contain` shows the full frame (case study hero). */
  imageFit = "contain",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  imageFit?: "cover" | "contain";
}) {
  if (project.image) {
    const src = cloudinaryImageUrl(project.image, { width: 1920 });
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={src}
          alt={project.imageAlt ?? `${project.name} — product screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "bg-bg-elev/60",
            imageFit === "cover"
              ? "object-cover object-top"
              : "object-contain object-top",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-bg-elev/60",
        className,
      )}
      aria-hidden
    >
      {project.art === "grid" ? (
        <GridArt seed={project.seed} />
      ) : project.art === "wires" ? (
        <WiresArt seed={project.seed} />
      ) : (
        <BlueprintArt seed={project.seed} />
      )}

      {/* Editorial marker — proves the art is intentional, not stock */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="mono-label text-faint">
            ART · GEN · {String(project.seed).padStart(3, "0")}
          </span>
          <span className="mono-label text-faint">{project.art.toUpperCase()}</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="mono-label text-faint">// {project.slug}</span>
          <span className="mono-label text-faint">{project.year}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Deterministic PRNG (Mulberry32) — same seed always yields same art
   ───────────────────────────────────────────────────────────────── */

function mulberry32(seed: number) {
  let t = (seed * 0x9e3779b9) | 0;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─────────────────────────────────────────────────────────────────
   GRID — catalog-cell mosaic
   ───────────────────────────────────────────────────────────────── */

function GridArt({ seed }: { seed: number }) {
  const rand = mulberry32(seed);
  const cols = 16;
  const rows = 11;
  const cell = 32;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const r = rand();
    return {
      x: i % cols,
      y: Math.floor(i / cols),
      kind:
        r < 0.025
          ? ("accent" as const)
          : r < 0.18
          ? ("filled" as const)
          : r < 0.42
          ? ("outlined" as const)
          : ("empty" as const),
      double: rand() < 0.05,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      className="absolute inset-0 h-full w-full text-line"
      preserveAspectRatio="xMidYMid slice"
    >
      {cells.map((c, i) => {
        const x = c.x * cell + 3;
        const y = c.y * cell + 3;
        const w = c.double ? cell * 2 - 6 : cell - 6;
        const h = cell - 6;
        if (c.kind === "accent") {
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill="var(--accent)"
              opacity={0.95}
            />
          );
        }
        if (c.kind === "filled") {
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill="currentColor"
              opacity={0.55}
            />
          );
        }
        if (c.kind === "outlined") {
          return (
            <rect
              key={i}
              x={x + 0.5}
              y={y + 0.5}
              width={w - 1}
              height={h - 1}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.5}
              opacity={0.6}
            />
          );
        }
        return null;
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WIRES — multi-tenant network graph
   ───────────────────────────────────────────────────────────────── */

function WiresArt({ seed }: { seed: number }) {
  const rand = mulberry32(seed);
  const w = 800;
  const h = 500;
  const nodes = Array.from({ length: 9 }, (_, i) => ({
    x: 100 + rand() * (w - 200),
    y: 80 + rand() * (h - 160),
    r: 6 + rand() * 10,
    accent: i === 0 || rand() < 0.18,
  }));
  // hub-and-spoke: connect node 0 to all others, plus a few cross links
  const edges: Array<[number, number]> = [];
  for (let i = 1; i < nodes.length; i++) edges.push([0, i]);
  for (let i = 0; i < 4; i++) {
    const a = 1 + Math.floor(rand() * (nodes.length - 1));
    const b = 1 + Math.floor(rand() * (nodes.length - 1));
    if (a !== b) edges.push([a, b]);
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 h-full w-full text-line"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="currentColor" strokeWidth={0.6} opacity={0.65}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <circle
              r={n.r}
              fill={n.accent ? "var(--accent)" : "var(--surface)"}
              stroke={n.accent ? "var(--accent)" : "currentColor"}
              strokeWidth={1}
            />
            <circle r={n.r + 6} fill="none" stroke="currentColor" strokeWidth={0.4} opacity={0.4} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BLUEPRINT — floor plan / technical drawing
   ───────────────────────────────────────────────────────────────── */

function BlueprintArt({ seed }: { seed: number }) {
  const rand = mulberry32(seed);
  const w = 800;
  const h = 500;
  // a few overlapping rectangles like rooms/zones
  const rooms = Array.from({ length: 5 }, () => {
    const rw = 120 + rand() * 240;
    const rh = 100 + rand() * 180;
    return {
      x: 40 + rand() * (w - rw - 80),
      y: 40 + rand() * (h - rh - 80),
      w: rw,
      h: rh,
      accent: rand() < 0.25,
    };
  });
  // dimension tick marks along bottom
  const ticks = Array.from({ length: 16 }, (_, i) => i);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 h-full w-full text-line"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* background grid */}
      <defs>
        <pattern id="bp-art-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-art-grid)" />

      {/* rooms */}
      {rooms.map((r, i) => (
        <g key={i}>
          <rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={r.accent ? "var(--accent-soft)" : "transparent"}
            stroke={r.accent ? "var(--accent)" : "currentColor"}
            strokeWidth={1}
            opacity={0.9}
          />
          {/* corner ticks */}
          {[
            [r.x, r.y],
            [r.x + r.w, r.y],
            [r.x, r.y + r.h],
            [r.x + r.w, r.y + r.h],
          ].map(([x, y], k) => (
            <g key={k} transform={`translate(${x} ${y})`} stroke="currentColor" strokeWidth={0.8}>
              <line x1={-4} y1={0} x2={4} y2={0} />
              <line x1={0} y1={-4} x2={0} y2={4} />
            </g>
          ))}
        </g>
      ))}

      {/* dimension scale */}
      <g transform={`translate(40 ${h - 30})`} stroke="currentColor" strokeWidth={0.6} opacity={0.5}>
        <line x1={0} y1={0} x2={w - 80} y2={0} />
        {ticks.map((t) => (
          <line key={t} x1={(t * (w - 80)) / 15} y1={0} x2={(t * (w - 80)) / 15} y2={-4} />
        ))}
      </g>
    </svg>
  );
}
