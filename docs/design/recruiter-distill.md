# Recruiter-focused portfolio

The portfolio now helps a hiring team decide whether Shorno’s experience fits a role. This audience decision replaces the earlier combination of hiring and client acquisition.

The visual identity is a concise engineering profile: a prominent name, dated employment records, project screenshots, and skills connected to examples. Fraunces, the warm dark/paper palette, orange links, section references, and fine rules remain. Copy describes the work directly.

## Reading order

1. **Profile:** full name, role, focus, primary skills, current employers, location, and CV.
2. **Experience:** dated roles with employment type and a short responsibility summary. Education follows the timeline.
3. **Projects:** all six projects, each with a screenshot, personal contribution, selected technologies, status, case study, and available live/source links. SelfShop explicitly identifies frontend ownership and the team’s Laravel backend. Bikalpo remains labeled partly live.
4. **Skills:** frontend, backend/data, mobile, and deployment, with links to relevant project evidence.
5. **Contact:** one hiring path, email, CV, and LinkedIn.

## Complexity removed

| Removed | Reason / remaining access |
| --- | --- |
| Animated work stack | Recruiters can scan every project without waiting for scroll effects or checking viewport height. |
| Full repository list on the homepage | Available at `/archive`, linked in the footer. Case studies remain on the homepage. |
| Live clock, push-status strip, version number, grid, and grain | These did not explain qualifications or contribution. |
| Client availability, project inquiry, and buying checklists | Replaced by a single route for hiring conversations. |
| Repeated employment statistics, status labels, tech pills, and promotional headings | Dates, role types, contribution summaries, and grouped skills carry the useful information. |
| Long case-study opening descriptions and rhetorical copy | Detailed implementation remains in the case-study body. Openings explain the product and authored scope. |

No new dependencies, generated illustrations, achievements, or outcome metrics were added. Existing project screenshots are reused. The optional Padma admin screenshot is still omitted until an actual source is supplied.

## Verification

- TypeScript and the production build passed. All six case studies and the new archive are included in the build.
- Inspected dark and paper themes at 1440×900, 1024×600, 768×1024, 390×844, and 320×740 across the combined checks. No unintended horizontal overflow or clipped headings were observed in the sampled homepage layouts or six mobile case studies.
- Checked keyboard theme switching, case-study navigation, return-to-project anchors, and the footer archive link. No browser console errors were observed.
- Section indices and header navigation match. The archive has its own page title and sitemap entry.
- The Impeccable static detector returned no findings. Existing contrast tokens were retained; this was not a full accessibility certification.
- Screenshots and browser measurements are in [recruiter-distill](C:/Users/Shorno/WebstormProjects/portfolio-new/docs/design/recruiter-distill).

These changes are local. They have not been committed or deployed.
