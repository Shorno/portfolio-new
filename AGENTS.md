# AGENTS.md

Context and conventions for any AI agent working on this repo. Read this first.

---

## What this is

Personal portfolio for **Shorno Kamal Roy**, a full-stack engineer in Dhaka. The audience is **recruiters and hiring managers** (international, remote, on-site, and in Bangladesh). Product context lives in `PRODUCT.md`; the design system is recorded in `DESIGN.md`. Live at [shorno.dev](https://shorno.dev); `shorno.me` and `www.*` redirect there (`next.config.ts`).

The visual concept is **"Soft Studio"**: a polished, friendly portfolio in conventional recruiter language. Warm off-white page, white rounded cards with a hairline border and soft shadow, a floating pill header, pill buttons with a round arrow badge, pastel tint frames behind project screenshots, chip tags, a timeline for experience, and an ink contact card. Bricolage Grotesque for headings, Hanken Grotesk for everything else, one teal accent.

Copy uses standard section names (Featured projects, More projects, Work experience, Skills) and plain job titles. No invented framing.

**Trust is the point.** Every claim on the page must be checkable (a live link, a named employer, a date) or owner-confirmed. **Never invent numbers, team sizes or outcomes.** If a value isn't confirmed, omit the row; never ship a placeholder.

---

## Tech stack (versions matter)

| Tool | Version | Notes |
| --- | --- | --- |
| Next.js | **16.1** | App Router, RSC, `experimental.viewTransition: true` |
| React | **19.2** | `<ViewTransition>` is **not exported** by this version |
| TypeScript | 5.7 | Strict, `tsc --noEmit` must pass before any commit |
| Tailwind CSS | **v4** | `@theme inline { ... }` in `globals.css`; **no `tailwind.config.js`** |
| Better-Auth + Drizzle | 1.6 / 0.45 | Private `/operator` console only (Postgres via `DATABSE_URL`) |
| `next-themes` | 0.4 | `paper` (default, `:root`) and `dark` (`.dark`), class-based |
| pnpm | required | `pnpm-workspace.yaml` sets `verifyDepsBeforeRun: false` |

There is no MDX and no animation library. Case-study pages were removed; `/work/<slug>` redirects to `/#projects`.

---

## Project layout

```
src/
  app/
    layout.tsx           # fonts (Bricolage Grotesque, Hanken Grotesk, Geist Mono), theme provider
    page.tsx             # homepage: hero, projects, experience + skills, contact
    globals.css          # design tokens + base typography
    archive/page.tsx     # full GitHub repo archive (linked from the footer)
    operator/            # private job-application tracker (Better-Auth login)
    api/auth/[...all]/   # Better-Auth route handler
    robots.ts, sitemap.ts, manifest.ts
  components/
    primitives/          # Container, ButtonLink, Chip, Arrow, BlockHead, Grid, Rule
    hero/                # intro card + fact tiles
    work/                # featured project cards + "More projects" cards
    experience/          # experience timeline + skill chips, side by side
    contact/             # the close
    index/               # repo archive, rendered on /archive
    operator/            # operator dashboard + login form
    seo/                 # JSON-LD
    site-header.tsx      # floating pill header: monogram, name + SiteHeaderNav
    site-header-nav.tsx  # section links, theme toggle, Resume button
    site-footer.tsx      # copyright, archive + GitHub links
    theme-provider.tsx, theme-toggle.tsx
  lib/
    site.ts              # profile, letter copy, cvUrl, excludeRepos, includeContributorRepos
    nav-sections.ts      # header nav items (Projects, Experience, Skills, Contact)
    projects.ts          # all projects; `featured` ones render as spreads
    experience.ts        # roles + education + formatPeriod
    system.ts            # skill groups + GitHub language colors
    github.ts            # getAllRepos, getLatestPush, timeAgo, deriveStatus
    repo-descriptions.ts # archive blurbs for repos with no GitHub description
    seo.ts, cloudinary.ts# metadata/JSON-LD helpers, image URLs
    auth.ts, db/         # Better-Auth + Drizzle schema for /operator
    utils.ts             # `cn()` (clsx + tailwind-merge)
```

Homepage sections have no numbers. Anchors: `#projects`, `#experience`, `#skills`, `#contact`. If you add or rename a section, update `src/lib/nav-sections.ts` in the same commit.

---

## Design tokens (the source of truth)

All tokens live in `src/app/globals.css`: paper on `:root`, dark on `.dark`. Tailwind v4 exposes them via `@theme inline`, so `bg-bg`, `text-fg`, `text-accent`, `border-line` etc. work directly.

| Token | Role |
| --- | --- |
| `bg` | Page (warm off-white; near-black in dark) |
| `bg-elev` | Cards (white) |
| `surface` | Inset rows inside cards |
| `fg`, `fg-soft`, `muted`, `faint` | Text, progressively quieter (all pass AA on `bg` and `bg-elev`) |
| `line`, `line-strong` | Card borders, dividers, the timeline rail |
| `accent`, `accent-hover`, `accent-fg`, `accent-soft` | Teal: primary button, highlighted headline words, links, timeline dots |
| `ink`, `ink-fg` | Dark buttons ("Resume", "Visit site") and the contact card; inverts in dark theme |
| `tint-mint`, `tint-sand`, `tint-sky`, `tint-lilac`, `tint-mint-fg` | Screenshot frames, fact tiles, the Live/Current pills |
| `shadow-card`, `shadow-lift` | Card shadow and its hover lift |
| `signal-ok`, `signal-warn` | Status dots (hero pill, operator console) |

The `.card` utility (white, 28px radius, hairline border, soft shadow) is the base surface. Radii: `--radius-lg` 20px for tiles, `--radius-xl` 28px for cards, `rounded-full` for buttons and chips.

**Rule:** never introduce a raw hex in components. If a new role is genuinely needed, add it to **both** `:root` and `.dark` and expose it in `@theme inline`.

### Typography

- **Bricolage Grotesque** (`font-display`, `.font-display`): headings and big figures.
- **Hanken Grotesk** (`font-sans`, default): body, chips, buttons, UI.
- **Geist Mono** (`font-mono`): code-like data only (repo names on `/archive`).
- `.tabular` for dates and figures.

Headline sizes use `clamp()`: hero `clamp(2.4rem,4.6vw,3.9rem)`, section heads via `<BlockHead>`.

### Layout

- `<Container>`: `max-w-[1200px]`, gutter `px-4 sm:px-7`.
- Sections are spaced with `pt-16 md:pt-20`; cards sit together with `gap-5`.
- The hero splits `1.35fr / 1fr`; featured project cards split `1fr / 1.35fr`; experience and skills split `1.2fr / 1fr`.
- Rounded corners everywhere, soft shadows on cards only, no gradients. The only icon is the arrow.

---

## Component primitives (use these, don't reinvent)

- **`Container`**: page-width wrapper
- **`ButtonLink`**: the only button. Pill shape; variants `accent`, `ink`, `outline`, plus `inverse` / `ghost-inverse` for the ink contact card. `arrow` adds the round arrow badge. Native `<a>`, so mailto and PDF links bypass the router.
- **`Chip`**: small rounded label (`outline`, `muted`, `live`)
- **`Arrow`**: the only icon, an inline SVG
- **`BlockHead`**: section heading with an optional intro on the right
- **`ProjectSpread`** (`work/`): featured project card; **`PlateReveal`**: one-shot fade-in wrapper
- **`Grid`**, **`Rule`**: still used by the operator console

---

## Editorial voice

Standard recruiter wording: plain, conventional, specific.

- **Conventional labels.** "Featured projects", "Work experience", "Skills", "Get in touch", "Resume".
- **Say what the product is, then your role.** Each project card has a summary and a "Role" line.
- **Specific and checkable.** Dates, employer names, live URLs. No adjectives doing the work of evidence.
- **Light on em-dashes.** Use a period or comma first.
- **Unicode characters, not HTML entities.** ’, –, — directly in TS strings. Never `&rsquo;` or `dangerouslySetInnerHTML`.

**Banned:** "hand-built", "no AI design", "honest answer changes my answer", "better for both of us", invented metrics.

---

## Code conventions

- **Default to server components.** `"use client"` only for interactivity (theme toggle, header nav).
- **Tailwind utilities + tokens.** `cn()` for conditional classes. Inline `style` only for genuinely dynamic values.
- **No emojis** in UI or comments.
- Strict TypeScript; public data shapes explicitly typed; `as const` for site-wide config.
- Top-of-file comment describing the module's role and invariants. Don't narrate code.

---

## Specific systems

### Projects (`src/lib/projects.ts`)

`featured: true` renders a split card (chips, summary, role, highlights, stack, screenshot in its `tint` frame); the rest render as compact "More projects" cards. `team` and `results` are optional and **owner-confirmed only**: when absent, the row isn't rendered. Only set `github` for public repos.

The hero figures (years of experience, projects shipped) are derived from `experience` and `projects`; don't hardcode them.

### Motion

Cards and buttons lift slightly on hover, screenshots rise inside their frames, and project cards fade in once on first view (`PlateReveal`). Nothing loops. `prefers-reduced-motion` disables it.

### GitHub integration (`src/lib/github.ts`)

- `getAllRepos()`: archive for `/archive`. With `GITHUB_TOKEN`, renders `Shorno/*` owner repos plus `includeContributorRepos`. Without a token, public owner repos only. Cache 1h.
- `getLatestPush()`: currently unused; keep it owner-only and cached if it comes back.
- Dev fallbacks never return mock data in production.

### Operator console (`/operator`)

Private job-application tracker. Better-Auth guards it; Postgres via Drizzle (`src/lib/db/schema.ts`). Not linked from the public header or footer; `robots.ts` disallows `/operator` and `/api`. Go to `/operator/login` directly.

Env vars (see `.env.example`): `GITHUB_TOKEN`, `DATABSE_URL` (spelling kept for compatibility; `DATABASE_URL` also works in `drizzle.config.ts`), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`.

### Theme switching

`next-themes`, `attribute="class"`, default `paper`. The toggle is a text pill naming the theme it switches to. Check both themes for any visual change.

---

## Adding new things

- **A project:** add it to `projects.ts`. Set `featured` only if it deserves a spread (keep it to about three). Store screenshots under `public/work/` or Cloudinary.
- **A skill:** edit `skillGroups` in `system.ts`. Only list tools used in a project on the page.
- **A role:** edit `experience.ts`, most recent first.
- **A section:** compose `Container` + `BlockHead`, give it an `id`, add it to `page.tsx` and (if it belongs in the header) `nav-sections.ts`.

---

## Common pitfalls

1. **Don't fabricate.** No placeholder numbers, no guessed team sizes, no unverifiable outcomes.
2. **Don't import `<ViewTransition>` from `react`**; it doesn't exist in 19.2.
3. **Don't use HTML entities in TSX strings.**
4. **Prefer `md:` over `lg:`**; `md` (768px) is the pivot. `max-md:` is fine for stacked tables.
5. **Don't bring back** section numbers (§01), uppercase mono labels, generative project art, or the case-study pages. Keep the card language consistent: rounded `.card`, pill buttons, chips.
6. **Don't downgrade React, Next or Tailwind** to fix a problem.
7. **Don't commit `.commit-msg.tmp`.** Remove it after `git commit -F`.
8. **Use the Edit tool or perl for line-ending-sensitive files**, not `sed -i` on Git Bash.

---

## Commit conventions

Lowercase, terse. `phase N: <thing>` for cohesive feature work; `fix:` / `chore:` / `docs:` for one-off changes. Body explains the why for non-trivial changes.

---

## Quick checklist before any commit

- [ ] `pnpm exec tsc --noEmit` is clean
- [ ] Visual check in **both** paper and dark themes, and at 375px
- [ ] Header nav items match homepage section ids
- [ ] No `&rsquo;`, no `dangerouslySetInnerHTML`, no banned phrases, no invented numbers
- [ ] Tokens used (no raw hex in components)
- [ ] Reused primitives where possible
- [ ] Working tree clean of `.commit-msg.tmp`
