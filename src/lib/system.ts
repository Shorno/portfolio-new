/**
 * The actual toolkit. Grouped, with a role-sized note for each piece.
 * Order within a group matters — most-reached-for is first.
 */

export type SystemGroup = {
  label: string;
  index: string;
  items: Array<{
    name: string;
    role: string;
    /** Year I started using it for real work. */
    since?: string;
  }>;
};

export const systemStack: SystemGroup[] = [
  {
    index: "A",
    label: "Runtime & Frameworks",
    items: [
      {
        name: "TypeScript",
        role: "Lingua franca for everything I ship. No JS, ever.",
        since: "2020",
      },
      {
        name: "Next.js",
        role: "Default for full-stack web. App Router, RSC, server actions.",
        since: "2021",
      },
      {
        name: "Hono",
        role: "When the API deserves its own process. Edge or Node.",
        since: "2024",
      },
      {
        name: "React Native · Expo",
        role: "Native apps when web isn't enough. EAS for delivery.",
        since: "2024",
      },
    ],
  },
  {
    index: "B",
    label: "Data & Auth",
    items: [
      {
        name: "PostgreSQL",
        role: "Source of truth. Always.",
        since: "2020",
      },
      {
        name: "Drizzle ORM",
        role: "TypeScript schema, generated migrations, no magic.",
        since: "2024",
      },
      {
        name: "Neon · Supabase",
        role: "Managed Postgres. Branching for previews.",
        since: "2024",
      },
      {
        name: "Better-Auth",
        role: "Sessions, OAuth, role gating. The auth library I trust.",
        since: "2024",
      },
      {
        name: "oRPC",
        role: "End-to-end typed contracts between server and every client.",
        since: "2025",
      },
    ],
  },
  {
    index: "C",
    label: "Interface",
    items: [
      {
        name: "React 19",
        role: "Server + client components. Compiler when it earns its keep.",
        since: "2024",
      },
      {
        name: "Tailwind CSS v4",
        role: "Design tokens via @theme. No config file, no excuses.",
        since: "2022",
      },
      {
        name: "Motion (Framer)",
        role: "Scroll-linked animation, layout transitions, presence.",
        since: "2023",
      },
      {
        name: "Lexical",
        role: "Rich text content stored as JSON alongside everything else.",
        since: "2025",
      },
      {
        name: "shadcn/ui",
        role: "Owned components, not a dependency. Tailored each time.",
        since: "2023",
      },
    ],
  },
  {
    index: "D",
    label: "Build & Ship",
    items: [
      {
        name: "Turborepo",
        role: "Monorepo pipelines for shared packages across web + native + server.",
        since: "2024",
      },
      {
        name: "pnpm",
        role: "Disk-efficient package manager. Workspaces, not lifecycle theatre.",
        since: "2022",
      },
      {
        name: "Vite",
        role: "When the app doesn't need server-rendering, this is the shell.",
        since: "2023",
      },
      {
        name: "Vercel",
        role: "Default deploy target. Preview deploys per PR.",
        since: "2021",
      },
    ],
  },
];

/**
 * GitHub's language colors (subset of the ones I actually use).
 * Used for the colored dot next to repos in §03 INDEX.
 */
export const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  MDX: "#fcb32c",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dockerfile: "#384d54",
};
