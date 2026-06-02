import { cn } from "@/lib/utils";

/**
 * Quiet blueprint-paper backdrop: sparse dot grid that fades out toward
 * the bottom, with a corner registration crosshair. Pure SVG, currentColor —
 * inherits the theme's line color. No motion, no JS.
 */
export function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 overflow-hidden text-line-strong",
        className,
      )}
    >
      {/* dot grid with vertical fade */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="bp-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.6" cy="0.6" r="0.6" fill="currentColor" />
          </pattern>
          <linearGradient id="bp-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="55%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="bp-mask">
            <rect width="100%" height="100%" fill="url(#bp-fade)" />
          </mask>
        </defs>
        <g mask="url(#bp-mask)">
          <rect width="100%" height="100%" fill="url(#bp-dots)" />
        </g>
      </svg>

      {/* top-right registration crosshair */}
      <RegistrationCrosshair className="absolute right-6 top-6 md:right-12 md:top-10" />

      {/* horizontal measurement rule near the bottom of the hero */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-line/40" />
    </div>
  );
}

function RegistrationCrosshair({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={cn("text-line-strong/70", className)}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
      >
        <line x1="20" y1="2" x2="20" y2="14" />
        <line x1="20" y1="26" x2="20" y2="38" />
        <line x1="2" y1="20" x2="14" y2="20" />
        <line x1="26" y1="20" x2="38" y2="20" />
        <circle cx="20" cy="20" r="7" />
        <circle cx="20" cy="20" r="0.8" fill="currentColor" />
      </g>
    </svg>
  );
}
