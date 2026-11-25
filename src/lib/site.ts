/** Shared profile copy, metadata, and repository visibility settings. */
export const site = {
  name: "Shorno",
  fullName: "Shorno Kamal Roy",
  role: "Full-stack engineer",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "fb.shorno@gmail.com",
  phone: "+8801841151827",
  linkedin: "https://www.linkedin.com/in/shorno/",
  facebook: "https://www.facebook.com/MrShorno911/",
  url: "https://shorno.dev",
  github: "https://github.com/Shorno",
  github_handle: "Shorno",
  /** Use native anchors for this file so the router never prefetches the PDF. */
  cvUrl: "/cv/shorno-kamal-roy-cv.pdf",
  /** Public profile copy is written for hiring teams. */
  seoDescription:
    "Shorno Kamal Roy, full-stack engineer in Dhaka. Web and mobile apps, APIs and databases in production for businesses in Bangladesh. Selected work, experience and CV.",
  /** Homepage introduction under the headline. */
  intro:
    "Hi, I’m Shorno, a software engineer based in Dhaka, Bangladesh. I build products end to end with TypeScript, React, Next.js, React Native and PostgreSQL, from the interface to the API, database and deployment.",
  timezoneLabel: "UTC+6",
  workTypes: ["Remote", "On-site", "Hybrid"],
  hireEmailSubject: "Role inquiry",
  seeking: {
    open: true,
    headline: "Open to full-stack roles",
    roles: [
      "Full Stack Developer",
    ],
  },
} as const;

/**
 * Repo blurbs when GitHub has no description — see `src/lib/repo-descriptions.ts`.
 * Edit that file to add or change archive copy without touching GitHub.
 */

/**
 * Repo full-names (`"owner/repo"`) to suppress from the /archive page.
 *
 * Useful when auto-discovery surfaces contributor / org-member repos
 * that shouldn't be on a public portfolio (NDA work, abandoned forks,
 * client-org repos with revealing names, etc.). Add a string here to
 * hide a repo without revoking the GitHub token.
 */
export const excludeRepos: ReadonlyArray<string> = [
  // SelfShop fork — fresh artifact, no original commits. The case study
  // on the homepage already covers this work; hiding the fork keeps the
  // archive honest about authored repos.
  "Shorno/selfshop",
];

/**
 * Contributor / org-owned repos to show on /archive with a `co` chip.
 *
 * With a `GITHUB_TOKEN`, GitHub returns every repo you can access (collabs,
 * org membership, course forks, etc.). By default only `Shorno/*` owner repos
 * are shown. Add a full name here to surface a specific collaborator repo.
 */
export const includeContributorRepos: ReadonlyArray<string> = [
  "adrasel404-bot/selfshop",
  "IftakharRahat/DIMS",
];
