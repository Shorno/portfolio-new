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
    scope: "Built Ecube Tournament, Ecube Esports and The Esports Times",
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

/** Month the earliest role started, e.g. "Sep 2024". A date the reader can check, not a rounded count. */
export function careerStart(): string {
  const earliest = [...experience].sort((a, b) => a.start.localeCompare(b.start))[0];
  return earliest ? formatMonth(earliest.start) : "";
}
