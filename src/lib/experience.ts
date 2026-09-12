/**
 * Work experience data model.
 *
 * Surfaced in §01 EXPERIENCE as a compact timeline. Roles are
 * ordered most-recent-first. Entries with `projectSlugs` reference the
 * featured projects in src/lib/projects.ts so the case studies in §02 can be
 * linked from the role they were shipped under.
 */

export type EmploymentType = "part-time" | "full-time" | "contract" | "freelance";

export type ExperienceEntry = {
  /** Display label for the employer, e.g. "AlgoVerse" */
  company: string;
  /** Public company website or profile, when supplied. */
  companyUrl?: string;
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
    company: "Ecube",
    companyUrl: "https://www.facebook.com/ecube.gg",
    role: "Full-stack Engineer",
    product: "Ecube Tournament",
    productNote: "esports operations",
    start: "2026-07",
    end: "present",
    location: "Bangladesh",
    type: "full-time",
    summary:
      "Built Ecube’s tournament platform end to end, from the participant site and staff dashboards to the API, database, and deployment. Work includes registration, scheduling, results, and live chat.",
    highlights: [
      "Built the Next.js frontend, Hono API, shared oRPC contracts, Postgres schema, and authentication in a Turborepo.",
      "Implemented seeded group allocation and shared tournament operations across seven configured rounds, including league and knockout stages.",
      "Added match-result review, roster checks, audited corrections, and qualification from finalized standings.",
      "Connected live group chat and scoped updates with Socket.IO, plus queued schedule and room-credential emails through Inngest and Resend.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "Hono · Bun",
      "oRPC",
      "Drizzle · Postgres",
      "Better-Auth",
      "Socket.IO",
      "Inngest · Resend",
      "Cloudflare R2",
    ],
    projectSlugs: ["ecube-tournament"],
  },
  {
    company: "AlgoVerse",
    role: "Software Engineer",
    start: "2025-12",
    end: "present",
    location: "Dhaka, Bangladesh",
    type: "part-time",
    summary:
      "Develop web and mobile applications for commerce, education, and wholesale operations. Full-stack work on shared APIs and databases, plus frontend integration with the team’s Laravel API for SelfShop.",
    highlights: [
      "Designed and shipped a Turborepo-based commerce platform with web + native + Hono backend.",
      "Owned a multi-role education platform with subdomain-scoped roles, shared Drizzle schema, and oRPC-backed web + native surfaces.",
      "Built a distributor operations SPA for procurement through retailer fulfillment, with print-grade invoices.",
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
    projectSlugs: [
      "selfshop",
      "bikalpo",
      "bright-tutor",
      "stock-management",
      "padma-service",
    ],
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
      "Built Ubaky’s restaurant merchant dashboard in React. Worked with the backend team on API integration, responsive layouts, and the interface used by restaurant operators.",
    highlights: [
      "Owned the merchant interface in React, the surface restaurant operators use day-to-day.",
      "Mobile-first responsive design across all three role-specific apps.",
      "Collaborated with the backend team to integrate APIs and tighten the data flow.",
      "Held the front-of-house bar for visual polish and consistency across the system.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Redux Toolkit Query",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   Education
   ────────────────────────────────────────────────────────────── */

/**
 * Education footnote rendered at the bottom of §02 EXPERIENCE.
 * Single line alongside the work timeline, without earning its own section.
 */
export const education = {
  degree: "BSc",
  field: "Computer Science & Engineering",
  school: "Daffodil International University",
  start: "2022",
  end: "2026",
  graduationMonth: "May",
  cgpa: "3.30 / 4.00",
} as const;

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
 * Distinct calendar months worked, inclusive of each role's start and end.
 * Concurrent roles share months so the experience total does not inflate.
 */
export function totalMonths(now: Date = new Date()): number {
  const workedMonths = new Set<number>();
  const currentMonth = now.getUTCFullYear() * 12 + now.getUTCMonth();

  for (const entry of experience) {
    const start = parseMonth(entry.start);
    const end = entry.end === "present" ? now : parseMonth(entry.end);
    if (!start || !end) continue;

    const firstMonth = start.getUTCFullYear() * 12 + start.getUTCMonth();
    const lastMonth = Math.min(
      end.getUTCFullYear() * 12 + end.getUTCMonth(),
      currentMonth,
    );

    for (let month = firstMonth; month <= lastMonth; month += 1) {
      workedMonths.add(month);
    }
  }

  return workedMonths.size;
}
