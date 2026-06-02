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
  /** Google Play Store listing URL, when the project has a publicly listed native app. */
  playstore?: string;
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
    slug: "selfshop",
    index: "01",
    name: "SelfShop",
    kind: "Reseller & Dropshipping Commerce",
    year: "2025—present",
    status: "live",
    tagline:
      "Two roles, four surfaces — reseller and supplier dashboards on the web, plus the matching React Native apps. One Laravel API I plugged into.",
    description:
      "Multi-role reseller marketplace. I built the reseller and supplier dashboards inside the Next.js Client app, plus the matching React Native + Tamagui apps for each role. Reseller app live on Google Play; supplier app internal. The Laravel/PHP backend was the team's — this case study is about the front of house.",
    url: "https://REPLACE_ME",
    playstore: "https://play.google.com/store/apps/details?id=REPLACE_ME",
    github: undefined,
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Ant Design",
      "Redux Toolkit",
      "NextAuth",
      "React Native · Expo",
      "Tamagui",
      "Pusher · Laravel Echo",
      "Laravel API (consumed)",
    ],
    metrics: [
      { label: "platform", value: "web + native" },
      { label: "scope", value: "4 surfaces · 2 roles" },
      { label: "stage", value: "live · Play Store" },
    ],
    seed: 91,
    art: "wires",
  },
  {
    slug: "bikalpo",
    index: "02",
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
    index: "03",
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
    index: "04",
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
  {
    slug: "padma-service",
    index: "05",
    name: "Padma Service",
    kind: "Services Marketplace & CMS",
    year: "2026",
    status: "live",
    tagline:
      "A bilingual services catalog where the marketing site, member dashboard, and admin CMS all run on one typed oRPC contract.",
    description:
      "Full-stack platform for Padma Service Company — public service catalog with categories and blogs, phone-OTP member accounts, and an admin console to manage banners, homepage sections, and user-submitted listings through an approval queue. Next.js 16 storefront plus a Hono API on Bun, Postgres via Drizzle.",
    url: "https://padmaservice.com",
    github: undefined,
    stack: [
      "Next.js 16",
      "React 19",
      "Hono",
      "oRPC",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
      "TipTap",
      "Cloudinary",
      "shadcn/ui",
    ],
    metrics: [
      { label: "platform", value: "web · admin CMS" },
      { label: "shape", value: "two-repo full-stack" },
      { label: "domain", value: "padmaservice.com" },
    ],
    seed: 58,
    art: "grid",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
