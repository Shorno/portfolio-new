/**
 * Portfolio-side repo blurbs for §03 INDEX.
 *
 * GitHub often has no `description` on private or hastily created repos.
 * These strings fill the gap without cloning — GitHub's value wins when set.
 *
 * Keys are full names: `"owner/repo"`.
 */

export const repoDescriptions: Readonly<Record<string, string>> = {
  // —— This site & featured work ——
  "Shorno/portfolio-new":
    "Editorial portfolio — Next.js 16, Tailwind v4, GitHub API archive.",
  "Shorno/bikalpo-project":
    "B2B commerce monorepo — Next.js storefront, Hono API, Drizzle, Neon.",
  "Shorno/bright-tutor":
    "Multi-tenant tutoring SaaS — Turborepo, oRPC, Expo, subdomain roles.",
  "Shorno/stock-management":
    "Inventory & POS frontend — Vite, React 19, TanStack, react-pdf invoices.",
  "Shorno/stock-management-backend":
    "Stock Management API — Hono on Bun, Drizzle, Better-Auth, PDF receipts.",
  "Shorno/stock-management-server":
    "Alternate backend tree for stock-management (Hono + Drizzle).",
  "Shorno/padma-service-project":
    "Padma Service — Next.js CMS + Hono/Bun API, service catalog & approvals.",

  // —— Recent client / product builds ——
  "Shorno/prepify":
    "Exam-prep platform — Next.js 16, AI (Google SDK), Drizzle, Better-Auth.",
  "Shorno/organic-food-store":
    "Organic grocery storefront — Next.js 16, i18n, Drizzle, Cloudinary.",
  "Shorno/ecommerce-laptop":
    "Laptop e-commerce — Next.js 16, admin CMS, TipTap, Drizzle, shadcn.",
  "Shorno/ubaky-demo":
    "Ubaky merchant UI demo — React, Vite, Ant Design (restaurant ops).",
  "Shorno/mavencave-demo":
    "MavenCave marketing SPA — React 19, Vite, Tailwind v4, Motion.",
  "Shorno/mavencave": "MavenCave project workspace (earlier iteration).",
  "Shorno/rockdale-updated":
    "Rockdale brand site — Vite, React 19, GSAP, styled-components.",
  "Shorno/portfolio": "Earlier portfolio iteration (pre portfolio-new).",
  "Shorno/Shorno.github.io": "GitHub Pages profile / legacy personal site.",

  // —— Learning & practice ——
  "Shorno/neetcode-submissions": "NeetCode problem solutions — study archive.",
  "Shorno/dsa": "Data structures & algorithms practice (TypeScript).",
  "Shorno/ph-sql-assignment": "Programming Hero SQL assignment.",
  "Shorno/assignment-1": "Programming Hero — TypeScript fundamentals.",
  "Shorno/Assignment-2-PH_Shorno": "Programming Hero assignment 2.",
  "Shorno/PH-Assignment-3": "Programming Hero assignment 3.",
  "Shorno/ph-assignment-5": "Programming Hero assignment 5.",
  "Shorno/ph-assignment-7": "Programming Hero assignment 7.",
  "Shorno/ph_assignment_8": "Programming Hero assignment 8.",
  "Shorno/ph-assignment-09-003": "Programming Hero assignment 9.",
  "Shorno/Assignment_1-PH": "Programming Hero — first assignment.",
  "Shorno/influencer-gears-practice": "HTML/CSS layout practice (Influencer Gears).",
  "Shorno/g3-architects-practice": "HTML/CSS layout practice (G3 Architects).",
  "Shorno/new-year-offer_PH_Practice": "Programming Hero — New Year offer landing page.",
  "Shorno/vanilla-portfolio-v1": "First vanilla HTML/CSS portfolio.",
  "Shorno/dice-roller": "Browser dice roller — small JS DOM exercise.",
  "Shorno/JS-Dice-roll": "JavaScript dice game practice.",
  "Shorno/level1-abstract": "Early abstract JS exercises.",
  "Shorno/shorno": "Personal experiments & scratch files.",

  // —— Course / bootcamp full-stack ——
  "Shorno/balance360-backend":
    "Balance360 API — Node/Express companion to the fitness frontend.",
  "Shorno/antique-chronicles-backend":
    "Antique Chronicles API — artifact catalog backend.",
  "Shorno/visa-navigator-backend":
    "Visa Navigator API — Express, MongoDB.",
  "Shorno/github-readme-streak-stats":
    "Fork — GitHub readme streak stats (upstream project).",

  // —— Contributor / external ——
  "IftakharRahat/selfshop":
    "Collaborator repo — separate lineage from the SelfShop client monorepo.",
  "shahriarshafin/buddy-deals-admin":
    "Contributor — admin UI for Buddy Deals.",
  "adrianhajdin/stack_overflow_nextjs14":
    "Course repo — Ultimate Next.js 14 (collaborator access).",
  "fahimmuntasirr/PHPixie": "Contributor — PHPixie web engineering coursework.",
  "Phanthom-Mekat/AI-Driven-Event-Ticket-Booking-System":
    "Contributor — event ticketing (Next.js 15, Prisma, Neon).",
};

/**
 * Resolve the description shown in §03 INDEX and the hero “latest push” chip.
 * Prefers GitHub's field when non-empty; falls back to `repoDescriptions`.
 */
export function resolveRepoDescription(
  fullName: string,
  githubDescription: string | null | undefined,
): string | null {
  const fromGitHub = githubDescription?.trim();
  if (fromGitHub) return fromGitHub;
  return repoDescriptions[fullName] ?? null;
}
