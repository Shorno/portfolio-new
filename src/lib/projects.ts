/**
 * Project / case study data model.
 *
 * Featured projects are surfaced in §02 PROJECTS as readable records
 * with a full /work/[slug] case study page. `seed` and `art`
 * provide a stable generative fallback when a project has no screenshot.
 */

export type ProjectStatus =
  | "live"
  | "partial-live"
  | "private-client"
  | "in-development";

export type Project = {
  slug: string;
  /** Display index, e.g. "01" */
  index: string;
  name: string;
  /** Short category descriptor, e.g. "B2B Commerce" */
  kind: string;
  /** Display year on the work card, e.g. "2026—present" or "2025—2026" */
  year: string;
  status: ProjectStatus;
  /** Authored scope, distinguished from what the complete product does. */
  contribution: string;
  /** Main technologies for the overview; the case study keeps the full stack. */
  coreStack: string[];
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
  /** Short fact chips for the work card — plain labels + values a non-dev can scan. */
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
    slug: "ecube-tournament",
    index: "01",
    name: "Ecube Tournament",
    contribution: "Full-stack development",
    coreStack: ["Next.js", "TypeScript", "Hono", "PostgreSQL"],
    kind: "Esports Tournament Operations",
    year: "2026—present",
    status: "live",
    tagline:
      "Built and deployed the web application, API, and database. Implemented role-based dashboards, scheduling, result verification, and real-time chat.",
    description:
      "I built and deployed a Next.js application backed by a Hono API and PostgreSQL for Ecube’s tournament operations. The platform handles registration, staff permissions, scheduling, verified results, live chat, and queued email updates.",
    url: "https://tour.ecube.gg/",
    image: "/work/ecube-tournament/web-home.jpg",
    imageAlt:
      "Ecube Tournament — public homepage for Return of King: Free Fire",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Hono · Bun",
      "oRPC",
      "Drizzle · Postgres",
      "Better-Auth",
      "Socket.IO",
      "Inngest · Resend",
      "Cloudflare R2",
    ],
    metrics: [
      { label: "surfaces", value: "player · operator · admin" },
      { label: "rounds", value: "7 configured" },
      { label: "languages", value: "English · Bangla" },
    ],
    seed: 109,
    art: "wires",
  },
  {
    slug: "selfshop",
    index: "02",
    name: "SelfShop",
    contribution: "Web & mobile frontend",
    coreStack: ["Next.js", "React Native", "TypeScript", "Redux Toolkit"],
    kind: "Reseller & Dropshipping Commerce",
    year: "2026—present",
    status: "live",
    tagline:
      "Built Next.js dashboards for admins, resellers, and suppliers, plus a React Native app published on Google Play. Integrated the team’s Laravel API across web and mobile.",
    description:
      "Reseller marketplace with web dashboards for admins, resellers, and suppliers. I built the Next.js frontend and the React Native reseller app on Google Play, integrating the team’s Laravel backend.",
    url: "https://selfshop.com.bd/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.selfshop.reseller&hl=en",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780454810/Screenshot_2026-06-03_084636_adaai5.png",
    imageAlt: "SelfShop — reseller product and dashboard view",
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
      { label: "builds", value: "web + mobile · 3 surfaces" },
      { label: "roles", value: "admin · reseller · supplier" },
      { label: "status", value: "live · Play Store" },
    ],
    seed: 91,
    art: "wires",
  },
  {
    slug: "bikalpo",
    index: "03",
    name: "Bikalpo",
    contribution: "Full-stack development",
    coreStack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL"],
    kind: "Multi-Party Commerce Marketplace",
    year: "2025—present",
    status: "partial-live",
    tagline:
      "Building the storefront, mobile app, and API for role-based pricing and ordering. The B2B storefront is live; the wider platform is in development.",
    description:
      "Wholesale marketplace with customer-specific pricing and role-based ordering. I’m building the storefront, mobile app, and API. The B2B storefront is live; the wider platform remains in development.",
    url: "https://b2b.bikalpo.com/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456221/Create-Next-App_zngg7r.png",
    imageAlt: "Bikalpo — B2B storefront on b2b.bikalpo.com",
    github: "https://github.com/Shorno/bikalpo-project",
    stack: [
      "Next.js 16",
      "React 19",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
      "TanStack Query",
      "Lexical",
      "Cloudinary",
    ],
    metrics: [
      { label: "status", value: "part live · in dev" },
      { label: "live at", value: "b2b.bikalpo.com" },
      { label: "target", value: "web + mobile + API" },
    ],
    seed: 17,
    art: "grid",
  },
  {
    slug: "bright-tutor",
    index: "04",
    name: "Bright Tutor",
    contribution: "Full-stack & mobile development",
    coreStack: ["Next.js", "Expo", "Hono", "PostgreSQL"],
    kind: "Multi-Role Education Platform",
    year: "2026",
    status: "live",
    tagline:
      "Connected six web and mobile applications to a shared API and database. Implemented separate workflows and access permissions for teachers, guardians, and admins.",
    description:
      "I built a tutoring marketplace and its teacher, guardian, and admin applications in one monorepo. Six web and mobile apps share a Hono API, typed oRPC contracts, and a PostgreSQL data model, with access scoped to each role.",
    url: "https://brighteducations.com/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456307/Bright-Tutor-Find-Verified-Tutors-in-Bangladesh_argy0s.png",
    imageAlt: "Bright Tutor — marketing site on brighteducations.com",
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
      { label: "builds", value: "web + mobile · 6 apps" },
      { label: "roles", value: "teacher · guardian · admin" },
      { label: "status", value: "live" },
    ],
    seed: 41,
    art: "wires",
  },
  {
    slug: "stock-management",
    index: "05",
    name: "Stock Management",
    contribution: "Full-stack development",
    coreStack: ["React", "TypeScript", "TanStack Query", "Vite"],
    kind: "Distributor Operations SPA",
    year: "2025—2026",
    status: "live",
    tagline:
      "Built and deployed a React application and backend for inventory and sales. Implemented purchasing, order fulfillment, stock transfers, returns, and printable invoices.",
    description:
      "Stock and sales software for a distributor, covering supplier purchases, retailer orders, transfers, returns, and printed invoices. I built and deployed the React application and its backend.",
    url: "https://mstamimenterprise.shop/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456379/stock-management_tbbhr6.png",
    imageAlt: "Stock Management — distributor operations dashboard",
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
      { label: "builds", value: "wholesale web app" },
      { label: "flow", value: "stock in → invoice out" },
      { label: "status", value: "live" },
    ],
    seed: 73,
    art: "blueprint",
  },
  {
    slug: "padma-service",
    index: "06",
    name: "Padma Service",
    contribution: "Full-stack development",
    coreStack: ["Next.js", "Hono", "oRPC", "PostgreSQL"],
    kind: "Services Marketplace & CMS",
    year: "2025—2026",
    status: "live",
    tagline:
      "Built a bilingual Next.js application with a service catalog and admin CMS. Implemented phone-OTP authentication, member accounts, and listing approvals.",
    description:
      "I built the public service catalog, member accounts, and admin CMS, with phone-OTP authentication and approval of submitted listings. The platform supports Bengali and English.",
    url: "https://padmaservice.com",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456472/%E0%A6%AA%E0%A6%A6%E0%A7%8D%E0%A6%AE%E0%A6%BE-%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BF%E0%A6%B8-%E0%A6%95%E0%A7%8B%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF_sntyg5.png",
    imageAlt: "Padma Service — public homepage (Bengali)",
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
      { label: "builds", value: "site + admin CMS" },
      { label: "perf", value: "SSG + RSC · Next.js 16" },
      { label: "status", value: "live" },
    ],
    seed: 58,
    art: "grid",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
