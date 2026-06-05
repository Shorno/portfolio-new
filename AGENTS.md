# AGENTS.md

Context and conventions for any AI agent working on this repo. Read this first.

---

## What this is

Personal portfolio for **Shorno Kamal Roy** — a full-stack engineer in Dhaka. Primary surfaces: recruiters/hiring managers and clients buying engineering work. Job-seeking copy lives in `src/lib/site.ts` (`seeking`, `hireEmailSubject`). Live at [shorno.me](https://www.shorno.me).

The site is intentionally **not** a generic dev template. The visual concept is an **"Operator's Manual"** — an editorial spec-sheet aesthetic borrowed from technical drawings and analog paperwork. Mono labels and § section marks, hairline rules, big serif headlines, one warm signal-orange accent, dense terminal-style data lists. Every section earns its place; nothing is filler.

When making changes, default to **preserving that voice**. If a change drifts toward generic SaaS-template aesthetics (gradient cards, drop shadows, hero illustrations, soft pastel UI), pause and reconsider.

---

## Tech stack (versions matter)

| Tool | Version | Notes |
| --- | --- | --- |
| Next.js | **16.1** | App Router, RSC, `experimental.viewTransition: true` |
| React | **19.2** | RSC + client components. **`<ViewTransition>` component is NOT exported** by this version — use CSS `view-transition-name` instead (see below). |
| TypeScript | 5.7 | Strict, `tsc --noEmit` must pass before any commit |
| Tailwind CSS | **v4** | Uses `@theme inline { ... }` in `globals.css`; **no `tailwind.config.js`** |
| Motion (Framer) | 12 | For scroll-linked work-stack animation |
| MDX | `@next/mdx` 16 + `@mdx-js/*` 3 | Case studies in `src/content/work/*.mdx` |
| `next-themes` | 0.4 | dark / paper themes; class-based (`.dark`) |
| pnpm | required | `pnpm-workspace.yaml` sets `verifyDepsBeforeRun: false` |

**Don't downgrade or swap any of these without strong reason.** The voice + interactions are coupled to current versions (Tailwind v4 `@theme`, View Transitions API, RSC).

---

## Project layout

```
src/
  app/
    layout.tsx           # fonts (Geist Sans, Geist Mono, Fraunces), theme provider
    page.tsx             # homepage — composes §01..§05 sections
    globals.css          # design tokens + base typography + view transitions
    work/[slug]/page.tsx # MDX case studies, dynamic route
  components/
    primitives/          # Container, Grid, Rule, SectionMark, MonoMeta, MonoTag
    hero/                # §00 hero (BlueprintGrid, LiveClock)
    work/                # §01 scroll-stack + WorkCard + ProjectArt
    experience/          # §02 timeline (ExperienceSection + ExperienceEntry)
    system/              # §03 toolkit
    index/               # §04 GitHub archive
    contact/             # §05 contact + what-to-send
    case-study/          # /work/[slug] hero, layout, pager, MDX primitives
    site-header.tsx      # sticky header with nav + theme toggle + CV chip
    site-footer.tsx      # colophon
    theme-provider.tsx   # next-themes wrapper
    theme-toggle.tsx     # client component
  content/work/*.mdx     # case study long-form
  lib/
    site.ts              # site metadata + cvUrl + excludeRepos
    projects.ts          # featured projects (§01)
    experience.ts        # roles + education + date formatters
    system.ts            # toolkit groups + GitHub language colors
    github.ts            # getLatestPush, getAllRepos, timeAgo, deriveStatus
    utils.ts             # `cn()` (clsx + tailwind-merge)
mdx-components.tsx       # global MDX component map
```

**Section numbering convention:** every major homepage section has a `SectionMark index={n}`. If you add a new section, **renumber every downstream `SectionMark` and the header `NavItem` indices** in the same commit.

---

## Design tokens (the source of truth)

All tokens live in `src/app/globals.css`. Two themes (paper as `:root`, dark as `.dark`). Tailwind v4 exposes them via `@theme inline { ... }` so utilities like `bg-bg`, `text-fg`, `text-fg-soft`, `border-line` work directly.

### Color roles

| Token | Role |
| --- | --- |
| `bg`, `bg-elev`, `surface` | Page background, slightly raised, deeply raised |
| `fg`, `fg-soft`, `muted`, `faint` | Primary text → progressively quieter |
| `line`, `line-strong` | Hairline rules and borders |
| `accent`, `accent-fg`, `accent-soft` | The signal orange. **Use sparingly** — section indices, italic emphasis, one CTA |
| `signal-ok`, `signal-warn` | Status dots only (live status, availability) |

**Rule:** never introduce a new hex color. Compose from tokens. If a new role is genuinely needed, add it to **both** `:root` and `.dark` in `globals.css` and surface it via `@theme inline`.

### Typography

Three font families, all loaded in `src/app/layout.tsx`:

- **Geist Sans** (`var(--font-geist-sans)`) — body, default
- **Geist Mono** (`var(--font-geist-mono)`) — labels, dates, codes, anything technical
- **Fraunces** (`var(--font-serif)`) — display headlines. Italic axis included (`style: ["normal", "italic"]`) — needed for the orange italic accent words.

Two utility classes for display type:

```css
.font-display          /* Fraunces, opsz 144, tightest letter-spacing */
.font-display-italic   /* Fraunces italic, opsz 144, slight WONK */
```

`.mono-label` is the small uppercase mono caption (used for `§nn`, hints, stat labels).

### Headlines pattern

Big editorial headlines pair `.font-display` with one italic accent word in `text-accent`:

```tsx
<h2 className="font-display text-balance text-4xl text-fg md:text-6xl">
  Where it{" "}
  <span className="font-display-italic text-accent">shipped.</span>
</h2>
```

Use `clamp()` for the largest hero/case-study headlines so they scale fluidly:

```tsx
className="font-display text-[clamp(2.75rem,7.8vw,7.5rem)] text-fg"
```

### Layout

- `<Container>` — `max-w-[1480px]` with responsive gutter. Wrap every section.
- `<Grid>` — 4-col mobile / 12-col desktop, baseline-aligned gaps.
- `<Rule variant="ticked" />` — hairline with corner ticks, used to bookend sections.
- `<SectionMark index={n} label="LABEL" hint="..." />` — section header.

Spacing rhythm: sections use `py-20 md:py-28` (or `py-24 md:py-32` for §05 contact). Headlines have `mt-12` ~ `mt-14` gap from the section mark. Don't invent new spacing scales without reason.

---

## Component primitives (use these, don't reinvent)

`src/components/primitives/`:

- **`Container`** — page-level wrapper, max-width + gutter
- **`Grid`** — 4-col mobile, 12-col desktop
- **`Rule`** — `plain` or `ticked` hairline
- **`SectionMark`** — `§nn / LABEL ... hint`
- **`MonoMeta`** — stacked label/value pair, mono
- **`MonoTag`** — inline status chip with colored dot (`tone: default | accent | ok | warn`)

Higher-level primitives outside `primitives/` you should also reuse:

- **`LiveClock`** — Dhaka-time clock for the contact + hero
- **`BlueprintGrid`** — the very subtle grid backdrop in the hero
- **`ProjectArt`** — generative SVG placeholder (don't replace with stock images)

---

## Editorial voice

Copy is half the design. The voice is:

- **Direct, terse, observational.** "Where it shipped." not "Professional Experience".
- **Specific over generic.** "Multi-party marketplaces, role-based platforms, wholesale tooling" beats "modern web applications".
- **Confident, not boastful.** "I pick boring, fast tools" not "I'm proficient in modern technologies".
- **Light on em-dashes.** A couple in long copy is fine. More than that and it starts to read like ChatGPT. If you find yourself reaching for `—`, try a period or comma first.
- **Unicode characters, not HTML entities.** Use `\u2019` (`'`), `\u2013` (`–`), `\u2014` (`—`) directly in TS/MDX strings. Never `&rsquo;` or `dangerouslySetInnerHTML` for typography.

**Banned phrases** (we explicitly removed these — don't bring them back):

- "hand-built" (the site uses AI assistance — don't claim otherwise)
- "no AI design" (false)
- "honest answer changes my answer" / "better for both of us" (over-clever AI-slop rhetoric)

When writing new copy, ask: would a real engineer-founder say this in a Slack DM, or does it sound like marketing? Aim for the former.

---

## Code conventions

### Server vs client components

- **Default to server.** Every section component is a server component unless it needs interactivity.
- **Mark `"use client"`** only when needed: theme toggle, scroll-linked motion, live clock, anything with `useState`/`useEffect`.
- Data fetching (`getLatestPush`, `getAllRepos`) lives in server components. They're cached via Next's `revalidate` + `tags`.

### Styling

- **Tailwind utility classes.** No CSS modules, no styled-components.
- **Prefer tokens over arbitrary values.** `text-fg-soft` over `text-[#aaa]`.
- **Use `cn()`** from `lib/utils` to merge conditional classes (clsx + tailwind-merge).
- **Inline `style` prop is reserved** for dynamic values that can't be Tailwind utilities (e.g., `viewTransitionName`, computed CSS variables).
- **No emojis** in UI unless the user explicitly asks. Same in code comments.

### TypeScript

- Strict mode is on. `tsc --noEmit` must be clean before every commit.
- Public surfaces (data shapes, component props) are explicitly typed. Inner helpers can rely on inference.
- Use `as const` for site-wide config objects (see `src/lib/site.ts`); separate exports for arrays you need to mutate at type level (see `excludeRepos`).

### Comments

- Top-of-file JSDoc-style block describing the component/module's role + key invariants.
- **Don't narrate the code** ("// loop through items"). Comment only on intent or non-obvious constraints.

---

## Specific systems

### View Transitions

Enabled via `experimental.viewTransition: true` in `next.config.ts`. The `<ViewTransition>` React component is **not exported** by `react@19.2.0`, so we use the **CSS `view-transition-name` property** directly via inline `style`:

```tsx
// In WorkCard (when used inside the desktop scroll-stack):
<h3 style={vt ? { viewTransitionName: `work-name-${slug}` } as React.CSSProperties : undefined}>
  {project.name}
</h3>

// In CaseStudyHero (matches names):
<h1 style={{ viewTransitionName: `work-name-${slug}` } as React.CSSProperties}>
  {project.name}
</h1>
```

Names must be **unique per element on screen** — that's why `WorkCard` only enables `vt` on the desktop stack, not the mobile fallback (otherwise both would claim the same name, breaking the morph).

Animation timing lives in `globals.css` (`::view-transition-group(*)`). 520ms morphs, 320ms root crossfade, both with a custom cubic-bezier. `prefers-reduced-motion` disables them entirely.

### GitHub integration (`src/lib/github.ts`)

Two server functions, both cached:

- `getLatestPush()` — most recent push for the hero status strip. Uses public `/users/{handle}/repos`, owner-only, cache 10min.
- `getAllRepos()` — full archive for §04 INDEX. With `GITHUB_TOKEN`, fetches the full accessible set but **renders only `Shorno/*` owner repos** plus any names in `includeContributorRepos`. Without a token, public owner repos only. Cache 1h.

Each repo carries a `role: "owner" | "contributor"` field; allowlisted non-owner repos render as `ownerLogin/repo` with a `co` chip.

`excludeRepos` — hide specific repos (NDA forks, etc.). `includeContributorRepos` — opt-in allowlist for collaborator/org repos you want visible; everything else with a `co` chip stays out.

Both functions have a `devFallback()` for when the API rate-limits in development. **Never return mock data in production** — the dev fallbacks check `NODE_ENV` and return `null` / `[]` in prod.

### MDX case studies

Files live in `src/content/work/<slug>.mdx`. Each is wired up explicitly in `src/app/work/[slug]/page.tsx` (no auto-discovery — adding a new case study means updating the slug map there too).

Custom MDX primitives are in `src/components/case-study/mdx-primitives.tsx`: `Callout`, `Pull`, `Shot`, `Diagram`, `Stack`, `Stat`, `StatRow`. Use these instead of raw HTML in MDX.

`mdx-components.tsx` at repo root maps `h1..h4`, `p`, `ul`, `li`, `code`, `pre`, etc. to styled versions. **Don't import these manually** — `useMDXComponents` does it automatically inside MDX files.

### Theme switching

`next-themes` with `attribute="class"`, default `dark`. The `.dark` class on `<html>` flips token values. Theme toggle is a client component that reads/writes the cookie/localStorage. Both themes must be tested for any visual change — paper mode (`:root`) is the warm light side.

---

## Adding new things

### A new homepage section

1. Create `src/components/<name>/<name>-section.tsx`. Wrap with `<Container>`, open with `<SectionMark index={n} label="..." hint="..." />`, follow with a `<Grid>` headline + intro pattern.
2. **Renumber** every subsequent `SectionMark` index in their respective files.
3. Add a `<NavItem>` to `src/components/site-header.tsx` and **renumber every label that comes after it** (`01 Work / 02 Experience / 03 ... / 04 ... / 05 ...`).
4. Add the section to `src/app/page.tsx` in the right position.
5. Visually verify in **both themes**. Confirm the header anchor (`/#<id>`) scrolls correctly from a case-study page too.

### A new case study

1. Add the project to `src/lib/projects.ts` with an `index`, `slug`, `kind`, `metrics`, etc.
2. Create `src/content/work/<slug>.mdx` using the existing case studies as templates.
3. Wire the slug in `src/app/work/[slug]/page.tsx` (the slug → MDX import map).
4. Make sure the slug appears in `featuredProjects` so it renders in §01 WORK.

### A new toolkit entry

Edit `src/lib/system.ts`. Each item belongs to a group; items inside a group are ordered most-reached-for first. Each item has `name`, `role` (one short sentence), and `since` (year started using it for real work).

### A new role / experience entry

Edit `src/lib/experience.ts`. Most-recent first. `projectSlugs` references slugs in `projects.ts` — those auto-render as case-study links.

---

## Common pitfalls (lessons from earlier sessions)

1. **Don't import `<ViewTransition>` from `react`** — it doesn't exist in 19.2. Use CSS `view-transition-name` directly.
2. **Don't use HTML entities like `&rsquo;` in TSX strings** — they need `dangerouslySetInnerHTML` to render. Use Unicode escapes (`\u2019`) directly.
3. **Don't add `lg:` breakpoints when `md:` works** — the site is designed primarily mobile / desktop with `md` (768px) as the pivot. `lg:` causes layout dead zones in the 768–1023 range.
4. **Don't surface every collaborator repo.** The INDEX defaults to owner repos only; opt in via `includeContributorRepos`. Use `excludeRepos` to hide specific `Shorno/*` repos.
5. **Don't reduce em-dashes mechanically.** A few are fine. The point is to remove the rhetorical pattern that signals AI authorship (`A — but B — and C`), not to ban the character.
6. **Don't add stock imagery, gradient cards, or SaaS-template hero illustrations.** The generative `ProjectArt` is the design. If you genuinely need a screenshot, store it under `public/work/` and reference it via `Project.image`.
7. **Don't downgrade React, Next, or Tailwind to fix a problem.** Find the right way to use the current versions.
8. **Don't widen the design vocabulary.** New components should compose existing primitives. If you reach for a card library, a chart library, or a date-picker, ask whether the editorial language can do it instead.
9. **Don't commit `.commit-msg.tmp`** — it's used as a heredoc workaround for PowerShell. Always `Remove-Item .commit-msg.tmp -Force` after `git commit -F`.

---

## Commit conventions

Lowercase, terse, phase-numbered for major work. Examples from history:

```
phase 7: CV button + contributor repos in §03 INDEX
phase 6: copy & toolkit corrections
fix: correct full name to Shorno Kamal Roy
phase 5: experience timeline as §02
```

Prefer `phase N: <thing>` for cohesive feature work. Use `fix:` / `chore:` / `docs:` prefixes for one-off changes. Body should explain the why for non-trivial changes.

---

## Quick checklist before any commit

- [ ] `pnpm exec tsc --noEmit` is clean
- [ ] Visual check in **both** dark and paper themes
- [ ] Section indices and header nav items still in sync
- [ ] No `&rsquo;`, no `dangerouslySetInnerHTML`, no banned phrases
- [ ] Tokens used (no raw hex / arbitrary spacing)
- [ ] Reused primitives where possible
- [ ] Working tree clean of `.commit-msg.tmp`
