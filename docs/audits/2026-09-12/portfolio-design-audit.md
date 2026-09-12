**Implementation integrity verdict: PASS — the portfolio expresses a coherent, specific visual system.**

The Fraunces headlines, mono labels, numbered sections, warm paper/dark palettes, and restrained orange accent support the “Operator’s Manual” concept. Preserve this direction. The implementation needs accessibility, responsive-layout, and content-completeness work.

Portfolio layout and design audit · Shorno Kamal Roy · 12 September 2026

**Follow-up:** All ten findings below have been addressed in the local implementation. See the [fixes and verification notes](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/fixes/verification.md). This report preserves the original audit findings and baseline score.

**Executive assessment**

**11/20 — Acceptable, with significant work needed.** This is the Impeccable audit health score, not an aesthetic rating or a Lighthouse score. **10 verified findings: 0 P0, 4 P1, 6 P2, 0 P3.**

| Dimension | Score / 4 | Assessment |
| --- | ---: | --- |
| Accessibility | 2 | Keyboard navigation and landmarks work; meaningful text fails contrast and two homepage sections lack heading semantics. |
| Performance | 3 | Responsive images, lazy body media, server rendering, and cached data are present. Rating is based on implementation inspection, without field or throttled performance measurements. |
| Responsive design | 2 | Mobile content generally reflows; short-screen cards, tablet archive columns, and diagram scaling need correction. |
| Theming | 2 | The token system is coherent, but paper contrast and the missing mobile switch limit usability. |
| Implementation integrity | 2 | The identity is consistent; missing media, unfinished outcome copy, and inaccurate archive statistics weaken the finished result. |
| **Total** | **11/20** | **Acceptable — significant work needed** |

Fix the low-contrast text, overlapping work cards, and missing Padma screenshots first. Then make diagrams readable, repair the tablet archive, and finish the remaining semantic and content corrections.

**Scope and evidence**

- Audited the local production preview at `http://localhost:3100`, against commit `04d5033` (`phase 8: add Ecube tournament case study`). These observations apply to the local implementation; deployment parity with shorno.me was not checked.
- Covered the public header, hero, Work, Experience, System, Index, Contact, footer, and all six case studies: Ecube Tournament, SelfShop, Bikalpo, Bright Tutor, Stock Management, and Padma Service. Authenticated operator screens were outside this public-portfolio audit.
- Sampled homepage viewports at 320×740, 390×844, 768×1024, 1024×600, 1366×768, and 1440×900. Every case study was inspected at 390×844 in paper and 1366×900 in dark. Additional section screenshots cover dark desktop and paper mobile.
- Used rendered DOM geometry, accessibility trees, screenshots, keyboard navigation, source inspection, token contrast calculations, and local image HTTP checks. Reduced-motion behavior was inspected in source; browser zoom, screen-reader speech, and throttled performance were not tested.
- The bundled static detector returned **zero findings** in its supported source files. MDX was inspected manually because its directory walker does not include that extension. The findings below come from separate browser/source verification; the detector result is not a clean bill of health.
- `AGENTS.md` and the existing implementation supplied design context. No PRODUCT.md, DESIGN.md, or surface brief was found. This documentation gap did not block the audit or reduce the score.

**P1 — major issues**

**01. Meaningful secondary text fails contrast in both themes**

**Location:** [paper faint token](C:/Users/Shorno/WebstormProjects/portfolio-new/src/app/globals.css:19), [dark faint token](C:/Users/Shorno/WebstormProjects/portfolio-new/src/app/globals.css:48), [experience duration](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/experience/experience-entry.tsx:41), [figure captions](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/case-study/mdx-primitives.tsx:123). **Category:** Accessibility / Theming.

`text-faint` is used for information readers need: employment duration, screenshot captions, repository timestamps, and supporting toolkit copy. Its contrast against the page background is approximately **2.82:1 in paper** and **2.81:1 in dark**; on elevated surfaces it falls to about 2.54:1 and 2.66:1. Small normal text needs 4.5:1 under [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

**Recommendation:** Move meaningful secondary text to `muted`, or revise the secondary-text role to meet 4.5:1 on every surface where it appears. Keep `faint` for nonessential decoration if desired. The current `muted` role already measures about 5.35:1 in paper and 5.94:1 in dark against the page background. **Suggested command:** `$impeccable colorize`.

Evidence: [token calculations](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/token-contrast.json), [mobile contact](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/home-contact-mobile-paper.jpg). Ratios are calculated from OKLCH tokens through clipped linear sRGB and are approximate; browser gamut mapping can vary.

**02. Paper-mode orange fails as headline text and as a button background for light text**

**Location:** [paper accent pair](C:/Users/Shorno/WebstormProjects/portfolio-new/src/app/globals.css:23), [contact headline](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/contact/contact-section.tsx:49), [primary CTA](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/contact/contact-section.tsx:63). **Category:** Accessibility / Theming.

Orange text against paper measures approximately **2.73:1**, below even the 3:1 large-text threshold. The light label on orange CTA buttons measures approximately **3.00:1**, below 4.5:1 for their 12 px text. This affects prominent headings and primary actions. These thresholds come from [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). The dark-theme accent pair measures approximately 6.66:1.

**Recommendation:** Tune paper-mode text and button color roles separately if one orange cannot serve both uses. Keep the orange identity while giving orange text sufficient contrast and choosing a readable foreground for filled buttons. Define any new role in both themes. **Suggested command:** `$impeccable colorize`.

Evidence: [paper hero](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/02-home-desktop-paper.jpg), [paper contact](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/home-contact-mobile-paper.jpg).

**03. The work stack obscures content on short desktop screens**

**Location:** [desktop activation](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/work/work-stack.tsx:51), [fixed-height slots and sticky frame](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/work/work-stack.tsx:95). **Category:** Responsive Design.

At **1024×600**, the sticky frame has only **496 px** available, while cards measure approximately **597–650 px** before animation. In the captured scroll position, Ecube’s top sits behind the header and SelfShop begins covering its lower content. Ecube’s case-study/live links are at roughly y=492–500, underneath the next card, which begins at y=433. Width alone currently enables the animation.

**Impact:** A recruiter scrolling a compact laptop window cannot read each complete project or reliably reach its links before the next card covers them. This is a verified usability failure; no separate WCAG conformance claim is needed.

**Recommendation:** Use a normal-flow list whenever available height cannot contain a full card, including short desktop windows. Make that decision account for content height as well as viewport width. Keep the signature stack on screens where it fits. Verify the longest card and keyboard-focused links at 1024×600 before restoring animation. **Suggested command:** `$impeccable adapt`.

Evidence: [overlapping cards](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/03-short-screen-work.jpg), [measured geometry](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/short-screen-geometry.json).

**04. Padma Service contains two broken screenshots**

**Location:** [public screenshot reference](C:/Users/Shorno/WebstormProjects/portfolio-new/src/content/work/padma-service.mdx:34), [admin screenshot reference](C:/Users/Shorno/WebstormProjects/portfolio-new/src/content/work/padma-service.mdx:40), [Shot rendering](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/case-study/mdx-primitives.tsx:101). **Category:** Implementation Integrity.

`/work/padma-service/web-home.png` and `/work/padma-service/web-admin-services.png` are absent and both return **404**. The rendered case study shows two large empty frames with broken-image icons and alt text. The existing placeholder path only runs when `src` is omitted, so it does not handle these invalid references.

**Impact:** The case study loses its visual evidence and looks unfinished. This is an asset-integrity failure.

**Recommendation:** Supply the intended screenshots or replace the references with verified assets. Until those are available, remove the empty figures or provide an intentional unavailable-media state. Verify local media paths as part of case-study publishing. **Suggested command:** `$impeccable harden`.

Evidence: [broken images in the page](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/05-padma-missing-images.jpg), [HTTP/file checks](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/local-image-checks.json).

**P2 — next-pass improvements**

**05. Architecture diagrams become unreadable on phones**

**Location:** [Diagram primitive](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/case-study/mdx-primitives.tsx:149), [Bright Tutor diagram](C:/Users/Shorno/WebstormProjects/portfolio-new/src/content/work/bright-tutor.mdx:26). Also reproduced in SelfShop, Bikalpo, Stock Management, and Padma Service. **Category:** Responsive Design / Accessibility.

At 390 px viewport width, 900–980-unit SVGs are compressed to about 285 px of drawing width. Small labels consequently render at approximately **3.2–3.8 CSS px**. The page fits horizontally, but the diagram no longer communicates its architecture. Nearby prose offers a partial workaround.

**Recommendation:** Give diagrams a readable mobile composition, or preserve an appropriate minimum diagram size in an explicitly scrollable/expandable viewer with a text equivalent. Reduce frame padding where useful; do not rely on shrinking every label. WCAG reflow allows exceptions for genuinely two-dimensional diagrams, so this is a measured readability issue rather than an automatic [1.4.10 failure](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). **Suggested command:** `$impeccable adapt`.

Evidence: [Bright Tutor phone diagram](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/case-bright-tutor-diagram-mobile.jpg), [all case-study measurements](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/case-study-observations.json).

**06. The archive description column collapses at tablet width**

**Location:** [RepoRow grid](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/index/index-section.tsx:86), [description truncation](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/index/index-section.tsx:117). **Category:** Responsive Design.

At 768 px, the desktop grid activates while the name and metadata columns consume most of the width. Descriptions get approximately **71 px**, leaving entries such as “Multi-part…” and “Stock Ma…”. Most rows lose the information that explains the repository.

**Recommendation:** Keep a two-line arrangement through tablet widths, or place descriptions across the remaining row below the name. Let content determine the transition to four columns. This is a usability issue; deliberate truncation of unusually long descriptions on roomy desktop layouts is not itself a defect. **Suggested command:** `$impeccable layout`.

Evidence: [tablet archive](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/04-tablet-archive-paper.jpg).

**07. Mobile visitors cannot choose a theme**

**Location:** [hidden mobile toggle](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/site-header-nav.tsx:141), [fixed default theme](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/theme-provider.tsx:13). **Category:** Theming / Responsive Design.

`hidden md:inline-flex` removes the only theme control below 768 px. The provider defaults to dark and disables system preference. A new mobile visitor therefore has no available control for selecting paper, despite the portfolio supporting it.

**Recommendation:** Keep a compact, clearly labeled theme button on small screens or expose it in an accessible navigation panel. Retain the current theme persistence. This is a product capability gap, not a claimed WCAG violation. **Suggested command:** `$impeccable adapt`.

**08. Work and Contact are absent from the heading outline**

**Location:** [Work section](C:/Users/Shorno/WebstormProjects/portfolio-new/src/app/page.tsx:29), [project h3](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/work/work-card.tsx:67), [Contact headline paragraph](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/contact/contact-section.tsx:47). **Category:** Accessibility / Implementation Integrity.

The rendered homepage outline goes from the hero h1 directly to six project h3s. Work has no h2, and Contact’s prominent headline is a paragraph. Readers navigating by headings miss two of the most useful destinations.

**Recommendation:** Add a semantic Work h2 without expanding the visual footprint, and render the Contact headline as h2. Preserve the section-marker styling. This improves the programmatic structure described by [WCAG 1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html); a skipped heading level alone is not being reported as a conformance failure. **Suggested command:** `$impeccable harden`.

**09. Outcome sections still contain draft copy**

**Location:** [Stock Management metric](C:/Users/Shorno/WebstormProjects/portfolio-new/src/content/work/stock-management.mdx:97), [SelfShop outcome paragraph](C:/Users/Shorno/WebstormProjects/portfolio-new/src/content/work/selfshop.mdx:170). **Category:** Implementation Integrity.

Stock Management displays **“0 — manual stock reconciliations · placeholder”** as a large outcome statistic. SelfShop says team numbers will replace its placeholders. These are visible to visitors, not private editorial notes.

**Recommendation:** Remove the placeholder outcome and unfinished editorial sentence. Publish verified operational capabilities or supported outcomes instead. Confirm any replacement number with the project owner; do not invent a metric. The infinity statistic for audit history would also communicate more clearly as a concrete capability. This is a content-credibility issue. **Suggested command:** `$impeccable clarify`.

Evidence: [rendered Stock Management metric](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/07-stock-placeholder-metric.jpg).

**10. Archive summary statistics misdescribe the data**

**Location:** [rendered statistics](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/index/index-section.tsx:36), [countLanguages helper](C:/Users/Shorno/WebstormProjects/portfolio-new/src/components/index/index-section.tsx:217). **Category:** Implementation Integrity.

`countLanguages()` returns language keys plus `_syncedLabel`. Counting all object keys consequently adds **one extra language**: the observed archive shows five although its repositories use four distinct language labels. “SYNCED” is calculated from the latest repository push time, which describes activity rather than the time the archive was refreshed.

**Recommendation:** Return language counts and timestamp metadata as separate fields. Count only languages. Rename “SYNCED” to “LAST PUSH”, or supply an actual fetch/refresh timestamp. This is a factual display error. **Suggested command:** `$impeccable harden`.

**Visual judgment, separate from the technical findings**

| Surface | Design assessment | Direction to preserve or refine |
| --- | --- | --- |
| Header and hero | Strong identity and a clear primary action. The small-screen header is dense but remained within the sampled widths. | Keep the serif/mono contrast and compact navigation; make room for the theme control when adapting it. |
| Selected work | Project names, status, role descriptions, and live links provide useful evidence. The stack is the most distinctive interaction. | Preserve it where the card fits. In cramped layouts, favor readable content and reachable links. |
| Experience | Company names, dates, responsibilities, and linked case studies form a useful hierarchy. | Keep the date rail and stacked mobile layout; improve the faint supporting text. |
| System | The grouped text list suits the technical-manual identity and is easy to scan. | Preserve the plain rows and short explanations. No new card treatment is needed. |
| Index | The dense archive feels purposeful on desktop and the mobile stacked rows retain descriptions. | Extend the usable stacked structure into tablet widths. Correct its summary statistics. |
| Contact and footer | The invitation is direct, the hiring/project actions are distinct, and the next-step guidance is concrete. | Preserve the hierarchy; improve paper CTA contrast and Contact heading semantics. |
| Case studies | Shared hero, scope, approach, stack, and pager give the six projects a consistent reading experience. | Finish the evidence and outcome copy; make diagram text readable on phones. |

**Patterns and positive findings**

The main systemic problems are a decorative color role being used for meaningful text, width breakpoints standing in for actual content fit, and case-study publishing without a completeness check for assets and outcomes.

The parts worth preserving are substantial:

- Reusable tokens and primitives keep the public portfolio visually coherent across all six case studies.
- Body copy in `fg`, `fg-soft`, and `muted` has strong contrast in both themes. The weak roles can be corrected without replacing the palette.
- Header links, the desktop theme button, and the case-study breadcrumb had a logical keyboard sequence and visible native focus outlines. The page has main, navigation, and footer landmarks.
- All six case-study routes rendered. Body content stayed within the sampled mobile and desktop widths; the primary responsive failures are local component layouts.
- The source provides a deliberate reduced-motion work-list fallback. Static screenshots cannot validate every motion state, but the alternative is present.
- Image variants/sizes, lazy body images, server-rendered sections, and cached GitHub requests provide a useful performance foundation.

Touch controls smaller than 44 px were observed, but no blanket AA failure is assigned: WCAG 2.2’s minimum target criterion permits 24 px targets and defined spacing/equivalent/inline exceptions. Enlarging compact navigation and standalone links during adaptation would still improve comfort. [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

The zero-result detector scan required no false-positive exclusions. Manual exclusions included the unused ScrollShot component, browser-native focus that already works, deliberate long-description truncation on wide screens, and unmeasured performance suspicions. None is counted as a defect.

**Recommended fix sequence**

1. **P1 — `$impeccable colorize`:** Correct meaningful secondary text and paper-mode accent/CTA contrast across all surfaces.
2. **P1/P2 — `$impeccable adapt`:** Make the work stack depend on available space, then address diagram readability and the mobile theme control.
3. **P1/P2 — `$impeccable harden`:** Repair Padma’s missing media, restore section-heading semantics, and correct archive calculations.
4. **P2 — `$impeccable layout`:** Rework archive columns at tablet width.
5. **P2 — `$impeccable clarify`:** Finish outcome copy using supported claims.
6. **`$impeccable polish`:** Check spacing, typography, focus visibility, and cross-theme consistency after the structural fixes.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `$impeccable audit` after fixes to reassess the score.

Acceptance checks should include both themes, the longest project card at 1024×600, archive descriptions at 768 px, readable diagrams at 390 px, zero broken case-study assets, correct archive counts, and heading navigation through Work and Contact.

**Evidence files:** [browser observations](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/browser-observations.json), [keyboard checks](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/keyboard-focus.json), [static detector output](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/audits/2026-09-12/detector.json). Additional viewport captures are saved beside this report.

Only audit documentation and evidence were added. Application source was not changed during this audit.
