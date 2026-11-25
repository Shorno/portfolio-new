# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, engineering leads, and recruiters evaluating Shorno Kamal Roy for a full-stack engineering role. Confirmed audience spans international remote employers, on-site and hybrid employers, and Bangladeshi companies hiring remotely. They usually arrive from a CV, LinkedIn, or a job application, spend a minute or two, and decide whether to start a conversation.

## Product Purpose

A personal portfolio that lets an employer quickly judge whether Shorno can own full-stack product work: what Shorno has shipped, for whom, in what role, with what result. Success is a reader who trusts the claims and gets in touch (email, LinkedIn, CV download).

## Positioning

Software actually running for real businesses in Bangladesh, most of it built end to end by one engineer: an esports tournament platform in production, a reseller app on Google Play, distributor stock and invoicing software, a tutoring platform, a services marketplace. The proof is live products and named employers, not a list of tools.

## Operating Context

- Readers skim on desktop between other candidates; many also open it on a phone from LinkedIn.
- The CV PDF (`public/cv/shorno-kamal-roy-cv.pdf`) is the companion document and is often opened alongside.
- Live product links (tour.ecube.gg, selfshop.com.bd, Play Store listing, brighteducations.com, padmaservice.com, mstamimenterprise.shop, bikalpo.com, esports.ecube.gg, esportstimes.news) are the main way a reader verifies claims.

## Capabilities and Constraints

- Next.js 16 / React 19 / Tailwind v4 site; dark and light themes via next-themes.
- Confirmed decision: the separate `/work/[slug]` case-study pages are to be **removed**. Each project becomes a concise homepage entry: what it is, role, team, stack, live link, and real results where confirmed.
- `/archive` (GitHub repository list) and the private `/operator` job tracker remain.
- Content lives in `src/lib/site.ts`, `projects.ts`, `experience.ts`, `system.ts`.

## Evidence on Hand

- Employment: Ecube (full-time, Jul 2026–present), AlgoVerse (part-time, Dec 2025–present), AppCube (part-time, Sep 2024–Dec 2025). BSc CSE, Daffodil International University, 2022–2026.
- Six shipped or partly shipped projects with live URLs and screenshots (`public/work/`, Cloudinary).
- Public repo `Shorno/bikalpo-project` with ~150 test files, CI workflows, and Dockerfiles.
- **Owner-confirmed (Nov 2026):**
  - Ecube Tournament: solo; about 15,000 teams registered.
  - SelfShop: lead developer, team of three, now maintained solo; 15,000+ monthly active users.
  - Stock Management: solo, end to end. Core features: sales, SR/DSR and stock tracking, customer dues, SMS automation.
  - Bright Educations (renamed from Bright Tutor): lead developer, team of three; about 5,000 active users; the largest project, featured. Marketing launch expected soon, so update the user count then.
  - Padma Service: solo. Bikalpo: lead developer, team of two. Shorno led every team project listed.
  - Ecube Esports (esports.ecube.gg, PUBG Mobile results, match replays, player stats) and The Esports Times (esportstimes.news, Bangla esports news site and newsroom): both solo at Ecube, 2026. Do not name the tournament data source publicly.
- **Still pending (do not fabricate):** usage numbers for Stock Management, Padma Service and Bikalpo. Until supplied, no result row renders.

## Product Principles

1. Every claim is checkable: a live link, a named employer, a date, or a confirmed number.
2. Plain language over jargon. Describe the business problem and the result before the tools.
3. Fewer, stronger entries beat a long list of equal weight.
4. Show scope honestly: team size, what was owned, what is still in development.
5. One clear way to get in touch.

## Accessibility & Inclusion

WCAG 2.2 AA contrast for all meaningful text in both themes; full keyboard navigation; respects reduced motion.
