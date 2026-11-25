---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Homepage (`/`)

Scope: the public homepage of shorno.dev. Visitor mode: Persuade. Audience: hiring managers and recruiters (remote, on-site, Bangladesh). Action: email, download CV, LinkedIn. Proof: live product links, named employers, dates, and only owner-confirmed numbers. Constraint: no `/work/[slug]` case-study pages; every project lives on the homepage.

## Direction contract

THESIS: Two years of shipped work reported the way a company reports its year: a plain letter to the hiring team, then the results. Refuses the developer-portfolio default of a tagline hero, tool badges, and equal project cards.

OWN-WORLD: Uncoated report stock. White paper ground, near-black ink, one report colour (deep teal-blue) for figures, links and the rule above results. Pale blue-grey panel for the at-a-glance table. Serif (Source Serif 4) for headlines, letter and figures; Hanken Grotesk for tables, labels and UI. Hairline rules, square 2px corners, tabular numerals. No icons beyond arrows, no shadows, no cards.

STORY: The reader learns who this is, what is running in production, and for whom, within one viewport; checks it via live links; contacts by email or CV.

FIRST VIEWPORT: Left 7/12: serif headline "Statement of work, 2024 to 2026", a three-paragraph letter signed by name, Email (solid) and Download CV beneath. Right 5/12: "At a glance" panel with large teal tabular figures (products shipped, in production, employers) and text rows (platforms, currently, based in). Top bar: name left, Work / Experience / Contact and a CV button right.

FORM: Annual report results statement, my grounded list position 1 (IMPECCABLE’S PICK). seed:bf6acd30f0597408

SIGNATURE INTERACTION: Project spreads (screenshot plate 7/12, facts table 5/12 with Client, My role, Team, Period, Results under a teal rule); results rows only render with confirmed values. Motion: plates fade/settle once on entry, nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Real numbers and team sizes per project (owner to supply). Until then the Team and Results rows are omitted, never shown as placeholders.

## Decisions after finish review

- **"Built with" row kept in the facts table.** Recruiters scan for stack per project; a plain comma list in the table is not a badge row. It sits above Results, so Results remains the last row under the teal rule.
- **"Products built" / "Live in production" instead of "shipped" / "Running".** Bikalpo is only partly live, so "built" is the accurate count; "live" is plainer than "running".
- **Plates are 16:9** (`aspect-video`) to match the screenshots and avoid cropping logos and headlines.
- **Motion is a one-shot 400ms fade/settle** on first intersection (`PlateReveal`), not scroll-linked.
- **Headline years are explicit** (`site.statementPeriod`), not computed at build time.


## Direction change (owner request, after first build)

The owner found "Statement of Work" too flat and its letter-style copy unconventional. Replaced with preview E, **"Soft Studio"** (`design-previews/e-soft-studio.html`), chosen over F "Playful Bento".

THESIS: A polished, friendly engineer portfolio in standard recruiter language: who, what they build, proof in live projects, how to reach them.
OWN-WORLD: Warm off-white page, white rounded cards (28px) with hairline border and soft shadow, floating pill header, pill buttons with a round arrow badge, pastel tint frames (mint, sand, sky, lilac) behind screenshots, chips, an experience timeline, an ink contact card with soft shapes. Bricolage Grotesque headings, Hanken Grotesk body, one teal accent.
REFERENCES (Mobbin): metic. project cards, Wild and Anchor chips, Bento floating tiles, Biograph and Mercury contact cards.
The owner-confirmed-only rule for team and results is unchanged.
