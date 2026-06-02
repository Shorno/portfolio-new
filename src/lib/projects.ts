/**
 * Project / case study data model.
 *
 * Featured projects are surfaced in §01 WORK with the scroll-stacked
 * interaction. Each one will also get a full /work/[slug] case study page
 * in Phase 3. `metrics`, `seed`, and `palette` feed the generative
 * placeholder art until real screenshots are dropped into `image`.
 */

export type ProjectStatus = "live" | "private-client" | "in-development";

export type Project = {
  slug: string;
  /** Display index, e.g. "01" */
  index: string;
  name: string;
  /** Short category descriptor, e.g. "B2B Commerce" */
  kind: string;
  /** Year range, e.g. "2025—present" */
  year: string;
  status: ProjectStatus;
  /** One-line editorial pitch for the card */
  tagline: string;
  /** 2–3 sentence summary used on the case study page hero */
  description: string;
  /** Live deploy URL, if public */
  url?: string;
  /** GitHub repo URL, if public */
  github?: string;
  /** Tech stack pills, ordered by prominence */
  stack: string[];
  /** Short fact chips (label + value), e.g. { label: "scale", value: "multi-tenant" } */
  metrics: Array<{ label: string; value: string }>;
  /** Hero image path. Falls back to generative art when absent. */
  image?: string;
  imageAlt?: string;
  /** Stable seed for the generative placeholder so each project looks distinct */
  seed: number;
  /** Accent variant for the generative art */
  art: "grid" | "wires" | "blueprint";
};

export const featuredProjects: Project[] = [
  {
    slug: "bikalpo",
    index: "01",
    name: "Bikalpo",
    kind: "B2B Commerce Platform",
    year: "2025—present",
    status: "live",
    tagline:
      "A B2B storefront where catalog, RFQ, and fulfilment behave like one product, not three.",
    description:
      "End-to-end B2B commerce platform for a Bangladeshi distributor — product catalog, role-based pricing, and a checkout flow that respects how real wholesale orders actually get placed. Currently in production on its own domain; mid-flight rewrite into a Turborepo monorepo with web, mobile, and a Hono backend.",
    url: "https://bikalpo.com",
    github: "https://github.com/Shorno/bikalpo-project",
    stack: [
      "Next.js 16",
      "React 19",
      "Drizzle ORM",
      "Neon Postgres",
      "Better-Auth",
      "TanStack Query",
      "Lexical",
      "Cloudinary",
    ],
    metrics: [
      { label: "platform", value: "web + native" },
      { label: "domain", value: "bikalpo.com" },
      { label: "stack", value: "turborepo monorepo" },
    ],
    seed: 17,
    art: "grid",
  },
  {
    slug: "bright-tutor",
    index: "02",
    name: "Bright Tutor",
    kind: "Multi-tenant Education SaaS",
    year: "2026",
    status: "private-client",
    tagline:
      "Five apps, one schema. Subdomain-scoped dashboards for teachers, guardians, and admins.",
    description:
      "Multi-tenant tutoring platform with role-aware subdomains and a shared schema across five apps: a marketing site, an admin console, a teacher dashboard, a React Native app for guardians, and a Hono+oRPC API. The architectural piece I'm most proud of from 2026 — every app talks the same type-safe contract end to end.",
    github: undefined,
    stack: [
      "Turborepo",
      "Hono",
      "oRPC",
      "Next.js",
      "Expo / React Native",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
    ],
    metrics: [
      { label: "apps", value: "5 in monorepo" },
      { label: "tenancy", value: "subdomain-scoped" },
      { label: "channels", value: "web · native · sms" },
    ],
    seed: 41,
    art: "wires",
  },
  {
    slug: "stock-management",
    index: "03",
    name: "Stock Management",
    kind: "Inventory & POS System",
    year: "2025—2026",
    status: "live",
    tagline:
      "A warehouse-floor tool, not a dashboard. Built around how stock actually moves.",
    description:
      "Full inventory and point-of-sale system for a retail client — receiving, transfers, sales, returns, and printed invoices with a workflow shaped around what actually happens at the counter. Separate frontend (Vite + React 19) and backend repos, both deployed.",
    url: "https://stock-management-ochre.vercel.app",
    github: "https://github.com/Shorno/stock-management",
    stack: [
      "Vite",
      "React 19",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "react-pdf",
      "Tailwind v4",
      "Better-Auth",
    ],
    metrics: [
      { label: "shape", value: "two-repo full-stack" },
      { label: "ops", value: "invoicing + pdf" },
      { label: "scope", value: "retail floor tool" },
    ],
    seed: 73,
    art: "blueprint",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
