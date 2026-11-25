/**
 * Employment and education for the homepage experience table.
 * Roles are ordered most-recent-first.
 */

export type EmploymentType = "part-time" | "full-time" | "contract" | "freelance";

export type ExperienceEntry = {
  company: string;
  /** Public company website or profile, when supplied. */
  companyUrl?: string;
  role: string;
  /** What the work covered, in a few words, e.g. "Ubaky merchant dashboard". */
  scope?: string;
  /** Start month, ISO YYYY-MM */
  start: string;
  /** End month, YYYY-MM, or "present" for the current role */
  end: string | "present";
  type: EmploymentType;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Ecube",
    companyUrl: "https://www.facebook.com/ecube.gg",
    role: "Full-stack Engineer",
    scope: "Built the Ecube Tournament platform",
    start: "2026-07",
    end: "present",
    type: "full-time",
  },
  {
    company: "AlgoVerse",
    role: "Software Engineer",
    scope: "Web and mobile apps for clients",
    start: "2025-12",
    end: "present",
    type: "part-time",
  },
  {
    company: "AppCube",
    role: "Frontend Developer",
    scope: "Ubaky restaurant merchant dashboard",
    start: "2024-09",
    end: "2025-12",
    type: "part-time",
  },
];

export const education = {
  degree: "BSc",
  field: "Computer Science & Engineering",
  school: "Daffodil International University",
  start: "2022",
  end: "2026",
  cgpa: "3.30",
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(input: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(input);
  if (!m) return input;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : input;
}

/** "Sep 2024 – Dec 2025" or "Dec 2025 – Present". */
export function formatPeriod(start: string, end: string | "present"): string {
  return `${formatMonth(start)} – ${end === "present" ? "Present" : formatMonth(end)}`;
}

const TYPE_LABELS: Record<EmploymentType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  freelance: "Freelance",
};

export function formatType(type: EmploymentType): string {
  return TYPE_LABELS[type];
}

/** Whole years since the earliest role started, e.g. 2 for "2+ years". */
export function yearsOfExperience(now: Date = new Date()): number {
  const starts = experience.map((e) => /^(\d{4})-(\d{2})$/.exec(e.start)).filter((m) => m !== null);
  const first = Math.min(...starts.map((m) => Number(m[1]) * 12 + Number(m[2]) - 1));
  const months = now.getUTCFullYear() * 12 + now.getUTCMonth() - first;
  return Math.max(Math.floor(months / 12), 0);
}
