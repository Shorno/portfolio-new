/**
 * Project records for the homepage "Featured projects" section.
 *
 * Featured projects render as split cards (details left, screenshot in a
 * tinted frame right); the rest render as compact "More projects" cards.
 *
 * Invariant: `team` and `results` hold only values the owner has
 * confirmed. When absent, nothing is rendered, never a placeholder.
 */

export type ProjectStatus = "live" | "partial-live";
export type ProjectTint = "mint" | "sand" | "sky" | "lilac";

export type Project = {
  slug: string;
  name: string;
  /** Large split card, or a compact card under "More projects". */
  featured: boolean;
  /** What the product is and who uses it, in plain words. */
  summary: string;
  /** Who it was built for, shown as a chip, e.g. "Ecube". */
  client?: string;
  /** Job title on the project plus what I built. */
  role: string;
  /** Extra things I built, one line each. */
  highlights?: string[];
  /** Team size or makeup, owner-confirmed only. */
  team?: string;
  /** Display year(s), e.g. "2026" or "2025–2026". */
  year: string;
  status: ProjectStatus;
  /** Main technologies, most important first. */
  stack: string[];
  /** Checkable outcomes, owner-confirmed only. */
  results?: string[];
  url?: string;
  /** Only for public repositories. */
  github?: string;
  playstore?: string;
  image: string;
  imageAlt: string;
  /** Background tint of the screenshot frame. */
  tint: ProjectTint;
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "partial-live": "Partly live",
};

export const projects: Project[] = [
  {
    slug: "ecube-tournament",
    name: "Ecube Tournament",
    featured: true,
    summary:
      "Esports tournament platform for Free Fire events: registration, group draws, schedules, result checks and team chat, in English and Bangla.",
    client: "Ecube",
    role: "Full-stack engineer. Built the web app, API and database.",
    highlights: ["Real-time team chat and live result updates"],
    year: "2026",
    status: "live",
    stack: ["Next.js", "TypeScript", "Hono", "PostgreSQL", "Socket.IO"],
    results: ["Hosts tournaments with a BDT 10,00,000 prize pool"],
    url: "https://tour.ecube.gg/",
    image: "/work/ecube-tournament/web-home.jpg",
    imageAlt: "Ecube Tournament homepage for Return of King: Free Fire",
    tint: "mint",
  },
  {
    slug: "selfshop",
    name: "SelfShop",
    featured: true,
    summary:
      "Reseller marketplace where suppliers list products and resellers sell them through their own channels, on the web and Android.",
    client: "AlgoVerse client",
    role: "Frontend developer for the admin, reseller and supplier dashboards.",
    highlights: ["Built and published the reseller Android app on Google Play"],
    year: "2026",
    status: "live",
    stack: ["Next.js", "React Native", "TypeScript", "Redux Toolkit"],
    url: "https://selfshop.com.bd/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.selfshop.reseller&hl=en",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780454810/Screenshot_2026-06-03_084636_adaai5.png",
    imageAlt: "SelfShop reseller product and dashboard view",
    tint: "sand",
  },
  {
    slug: "stock-management",
    name: "Stock Management",
    featured: true,
    summary:
      "Inventory and invoicing system that replaced a distributor’s spreadsheets: purchases, retailer orders, transfers, returns and printed invoices.",
    client: "Wholesale distributor",
    role: "Full-stack developer. Built the web app and backend.",
    highlights: ["Printable invoices, stock transfers and returns"],
    year: "2025–2026",
    status: "live",
    stack: ["React", "TypeScript", "TanStack Query", "Vite"],
    url: "https://mstamimenterprise.shop/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456379/stock-management_tbbhr6.png",
    imageAlt: "Stock Management distributor dashboard",
    tint: "sky",
  },
  {
    slug: "bright-tutor",
    name: "Bright Tutor",
    featured: false,
    summary: "Tutoring platform for teachers, guardians and admins.",
    role: "Six web and mobile apps on one shared API",
    year: "2026",
    status: "live",
    stack: ["Next.js", "Expo", "Hono", "PostgreSQL"],
    url: "https://brighteducations.com/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456307/Bright-Tutor-Find-Verified-Tutors-in-Bangladesh_argy0s.png",
    imageAlt: "Bright Tutor marketing site",
    tint: "lilac",
  },
  {
    slug: "padma-service",
    name: "Padma Service",
    featured: false,
    summary: "Services marketplace in Bangla and English.",
    role: "Public site, member accounts and admin panel",
    year: "2025–2026",
    status: "live",
    stack: ["Next.js", "Hono", "PostgreSQL"],
    url: "https://padmaservice.com",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456472/%E0%A6%AA%E0%A6%A6%E0%A7%8D%E0%A6%AE%E0%A6%BE-%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BF%E0%A6%B8-%E0%A6%95%E0%A7%8B%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF_sntyg5.png",
    imageAlt: "Padma Service public homepage in Bangla",
    tint: "sand",
  },
  {
    slug: "bikalpo",
    name: "Bikalpo",
    featured: false,
    summary: "Wholesale ordering with customer-specific pricing.",
    role: "Storefront, API and mobile app",
    year: "2025–now",
    status: "partial-live",
    stack: ["Next.js", "Drizzle", "PostgreSQL"],
    url: "https://b2b.bikalpo.com/",
    github: "https://github.com/Shorno/bikalpo-project",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456221/Create-Next-App_zngg7r.png",
    imageAlt: "Bikalpo B2B storefront",
    tint: "sky",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
