/**
 * Work experience data model.
 *
 * Surfaced in §02 EXPERIENCE as an editorial spec-sheet timeline. Roles are
 * ordered most-recent-first. Entries with `projectSlugs` reference the
 * featured projects in src/lib/projects.ts so the case studies in §01 can be
 * linked from the role they were shipped under.
 */

export type EmploymentType = "part-time" | "full-time" | "contract" | "freelance";

export type ExperienceEntry = {
  /** Display label for the employer, e.g. "AlgoVerse" */
  company: string;
  /** Role / title, e.g. "Software Engineer" */
  role: string;
  /** Optional product / focus area within the role, e.g. "Ubaky" */
  product?: string;
  /** Optional descriptor for the product, e.g. "restaurant management" */
  productNote?: string;
  /** Start month, ISO YYYY-MM */
  start: string;
  /** End month, YYYY-MM, or "present" for the current role */
  end: string | "present";
  /** Free-text location, e.g. "Dhaka, Bangladesh · remote" */
  location: string;
  type: EmploymentType;
  /** One short paragraph for the overview */
  summary: string;
  /** 3–4 bullets, each one a short win / responsibility */
  highlights: string[];
  /** Tech chips, ordered by prominence */
  stack: string[];
  /** Slugs into featuredProjects — surfaced as "see case study" links */
  projectSlugs?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "AlgoVerse",
    role: "Software Engineer",
    start: "2025-12",
    end: "present",
    location: "Dhaka, Bangladesh",
    type: "part-time",
    summary:
      "End-to-end builds for B2B commerce, multi-tenant SaaS, and internal tooling. Most of the case studies in §01 were shipped from here — schema-first, monorepo-shaped, deployed to production.",
    highlights: [
      "Designed and shipped a Turborepo-based commerce platform with web + native + Hono backend.",
      "Owned a multi-tenant Education SaaS: subdomain-scoped roles, shared schema, oRPC contracts.",
      "Built a warehouse-floor inventory tool with print-grade invoices for a retail client.",
      "Default stack: TypeScript everywhere, Postgres, Drizzle, Better-Auth, oRPC.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Hono",
      "oRPC",
      "Drizzle",
      "Postgres",
      "Better-Auth",
      "React Native · Expo",
    ],
    projectSlugs: ["bikalpo", "bright-tutor", "stock-management"],
  },
  {
    company: "AppCube",
    role: "Frontend Developer",
    product: "Ubaky",
    productNote: "restaurant management",
    start: "2024-09",
    end: "2025-12",
    location: "Dhaka, Bangladesh",
    type: "part-time",
    summary:
      "Built the merchant dashboard for Ubaky — a multi-role restaurant management system with separate interfaces for clients, merchants, and admins. Frontend-focused, working closely with the backend team on API integration.",
    highlights: [
      "Owned the merchant interface in React — the surface restaurant operators use day-to-day.",
      "Mobile-first responsive design across all three role-specific apps.",
      "Collaborated with the backend team to integrate APIs and tighten the data flow.",
      "Held the front-of-house bar for visual polish and consistency across the system.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "shadcn/ui",
      "TanStack Query",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   Formatters
   ────────────────────────────────────────────────────────────── */

const MONTHS_SHORT = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/**
 * Parse an ISO YYYY-MM string into a stable Date at the first of the month
 * (UTC). Returns `null` if the input doesn't match the shape.
 */
function parseMonth(input: string): Date | null {
  const m = /^(\d{4})-(\d{2})$/.exec(input);
  if (!m) return null;
  const year = Number(m[1]);
  const monthIdx = Number(m[2]) - 1;
  if (monthIdx < 0 || monthIdx > 11) return null;
  return new Date(Date.UTC(year, monthIdx, 1));
}

/**
 * Format a start/end pair as a mono-friendly range —
 * e.g. `"DEC 2025 — PRESENT"` or `"SEP 2024 — DEC 2025"`.
 */
export function formatRange(start: string, end: string | "present"): string {
  const s = parseMonth(start);
  const startLabel = s
    ? `${MONTHS_SHORT[s.getUTCMonth()]} ${s.getUTCFullYear()}`
    : start.toUpperCase();
  if (end === "present") return `${startLabel} — PRESENT`;
  const e = parseMonth(end);
  const endLabel = e
    ? `${MONTHS_SHORT[e.getUTCMonth()]} ${e.getUTCFullYear()}`
    : end.toUpperCase();
  return `${startLabel} — ${endLabel}`;
}

/**
 * Inclusive month-count between two YYYY-MM markers (or "present").
 * December 2025 → present (today, June 2026) reads as 7 months.
 */
function monthsBetween(start: string, end: string | "present", now: Date): number {
  const s = parseMonth(start);
  if (!s) return 0;
  const endDate =
    end === "present" ? now : parseMonth(end) ?? now;
  const months =
    (endDate.getUTCFullYear() - s.getUTCFullYear()) * 12 +
    (endDate.getUTCMonth() - s.getUTCMonth()) +
    1;
  return Math.max(months, 1);
}

/**
 * Human-friendly duration with a status suffix —
 * e.g. `"7 mo · current"` or `"1 yr 4 mo · prior"`.
 */
export function formatDuration(
  start: string,
  end: string | "present",
  now: Date = new Date(),
): string {
  const total = monthsBetween(start, end, now);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr`);
  if (months > 0 || years === 0) parts.push(`${months} mo`);
  const status = end === "present" ? "current" : "prior";
  return `${parts.join(" ")} · ${status}`;
}

/**
 * Total months of experience across every entry.
 * Used for the section hint, e.g. `"2 roles · ~21 months"`.
 */
export function totalMonths(now: Date = new Date()): number {
  return experience.reduce(
    (acc, e) => acc + monthsBetween(e.start, e.end, now),
    0,
  );
}
