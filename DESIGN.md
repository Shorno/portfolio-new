---
name: Shorno Kamal Roy, portfolio
description: Soft Studio. A warm off-white page of white rounded cards, pastel screenshot frames, one teal accent, and facts set as plain label-and-value rows.
colors:
  page: "#f4f3ef"
  card: "#ffffff"
  surface: "#eceae4"
  ink-text: "#16181b"
  text-soft: "#545a63"
  text-muted: "#5a6068"
  text-faint: "#62686f"
  hairline: "#e5e2da"
  hairline-strong: "#cdc8bd"
  accent: "#0e5a70"
  accent-hover: "#0a4757"
  accent-fg: "#ffffff"
  accent-soft: "rgb(14 90 112 / 0.08)"
  ink: "#16181b"
  ink-fg: "#ffffff"
  tint-mint: "#dff1ea"
  tint-sand: "#f6ead8"
  tint-sky: "#e2ecf8"
  tint-lilac: "#ece6f7"
  signal-ok: "#1f8a4c"
  signal-warn: "#9a6700"
  page-dark: "#111316"
  card-dark: "#1a1d21"
  surface-dark: "#23272c"
  ink-text-dark: "#eef0f2"
  text-soft-dark: "#b9bfc7"
  text-muted-dark: "#a4aab2"
  text-faint-dark: "#9aa0a8"
  hairline-dark: "#2a2e34"
  hairline-strong-dark: "#3b4048"
  accent-dark: "#6cc3da"
  accent-hover-dark: "#96d6e7"
  accent-fg-dark: "#08222b"
  accent-soft-dark: "rgb(108 195 218 / 0.12)"
  ink-dark: "#eef0f2"
  ink-fg-dark: "#111316"
  tint-mint-dark: "#1a3129"
  tint-sand-dark: "#302a20"
  tint-sky-dark: "#1c2735"
  tint-lilac-dark: "#262036"
  signal-ok-dark: "#57c27a"
  signal-warn-dark: "#e0b04f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.2vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "opsz auto"
  email-display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 5.2vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-small:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  data-mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  frame: "18px"
  contact-desktop: "36px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "28px"
  card-gap: "20px"
  card-pad-mobile: "24px"
  card-pad: "32px"
  fact-row: "14px"
  section: "64px"
  section-desktop: "80px"
components:
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-fg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-text}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-inverse:
    backgroundColor: "{colors.ink-fg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-ghost-inverse:
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  fact-row:
    textColor: "{colors.ink-text}"
    typography: "{typography.body-small}"
    padding: "{spacing.fact-row} 0"
  fact-label:
    textColor: "{colors.text-soft}"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  card-preview:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "24px"
  profile-card:
    backgroundColor: "{colors.tint-sand}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.xl}"
    padding: "36px"
  screenshot-frame:
    backgroundColor: "{colors.tint-sky}"
    rounded: "{rounded.frame}"
    padding: "22px 22px 0"
  nav-pill:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "8px 8px 8px 20px"
  nav-link:
    textColor: "{colors.text-soft}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "40px"
  nav-link-active:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink-text}"
  contact-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.contact-desktop}"
    padding: "56px"
---

# Design System: Shorno Kamal Roy, portfolio

## Overview

**Creative North Star: "The Soft Studio"**

A friendly, polished engineer's portfolio laid out like a tidy studio wall: white cards pinned to a warm off-white page, each one rounded, hairline-edged and resting on a soft ambient shadow. The proof is the product screenshots, so they get the colour: every featured project sits in its own pastel frame (mint, sand, sky, lilac) and rises slightly out of it on hover. Everything else stays quiet so the screenshots and one teal accent carry the page.

Density is moderate and card-based. Inside every card, information is set the way a CV sets it: a label column, a value, and a hairline between rows. The hero profile, the project fact tables, work experience, education and skills all use this one fact-row pattern, so a recruiter can scan the same row across projects and roles. Nothing is a chip, tile, badge, bullet or timeline node. Language is standard recruiter language; the visual system supports scanning rather than reading.

Two themes share one structure. `paper` (default, `:root`) is warm off-white with white cards; `dark` (`.dark`) inverts to near-black graphite with lifted charcoal cards, deepened tints and a lighter cyan accent. The ink contact card swaps with the theme, so in dark it becomes a light card on a dark page.

**Key Characteristics:**
- White rounded cards (28px) with a hairline border and soft two-layer shadow on a warm page.
- Facts as label-and-value rows with hairlines between them: the system's main information pattern.
- Pill-shaped interactive controls: header, nav links, buttons. Labels are never pills.
- Pastel tint frames behind screenshots, one tint per project; the hero profile card sits on sand.
- One teal accent for the primary action and links. Headlines are a single colour.
- Bricolage Grotesque headings in tight tracking; Hanken Grotesk for everything else.
- Cards and buttons stay still on hover; only arrows nudge and a screenshot rises inside its frame.

## Colors

A neutral warm-paper ground with one deep teal-blue accent and four soft pastel tints that only ever appear as fills.

### Primary
- **Deep Studio Teal** (accent; dark: accent-dark): the one accent button per group ("Get in touch"), linked company names in work experience, the live-site addresses on preview project cards, the hover colour of text links, focus outlines and text selection. Hover deepens to **Teal Shadow** (accent-hover; dark: a lighter cyan). Text on accent is accent-fg.
- **Teal Wash** (accent-soft): an 8% (12% in dark) translucent accent for quiet highlighted grounds, currently used only in the operator console.

### Secondary
- **Studio Ink** (ink / ink-fg): the dark solid used for the contact card and the ink button (header Resume, each featured project's live-site button). It inverts per theme: near-black on paper, near-white in dark, so ink surfaces always contrast with the page.

### Tertiary
- **Pastel Tints** (tint-mint, tint-sand, tint-sky, tint-lilac): fills only. Screenshot frames (each project declares one tint) and the hero profile card (sand). No tint carries meaning, and none is ever a text colour.

### Neutral
- **Warm Paper** (page): the page ground and the hover/active fill of nav links and the theme toggle.
- **Card White** (card): every card, outline buttons, the header pill (at 85% opacity under a backdrop blur).
- **Stone** (surface): a deeper panel tone, operator console only.
- **Graphite Ink** (ink-text): headings, body text and every fact value.
- **Slate Soft** (text-soft): fact labels, meta lines, dates, intros, the built line on preview cards, inactive nav. **text-muted** and **text-faint** exist for the archive and operator console; on the homepage, text-soft is the only quiet text tone.
- **Hairline** (hairline): card borders, the rules between fact rows, the footer rule on preview project cards. On the sand profile card the row rules are ink at 10% instead, because the hairline tone vanishes against sand.
- **Hairline Strong** (hairline-strong): the outline button border and the underline on text links and footer links.
- **Signals** (signal-ok, signal-warn): status only, operator console.

### Named Rules
**The One Accent Rule.** Teal is the only saturated colour that carries action or emphasis. Tints are pastel fills, never a second accent.

**The Tint Is a Frame Rule.** Pastel tints sit behind content (screenshots, the profile card). Text never takes a tint colour, and no tint means anything: there is no "live" or "current" colour.

**The Token-Only Rule.** Components use the named tokens through Tailwind utilities (`bg-bg`, `text-fg-soft`, `bg-tint-sky`). No raw hex in components; a new role is added to both `:root` and `.dark` and exposed in `@theme inline`.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui), optical sizing on
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono, for code-like data only (repo names on the archive, operator fields)

**Character:** A characterful, slightly quirky grotesque set bold (700) and tight (-0.03em, 1.04 line height) for headings and the contact email, against a calm, legible humanist grotesque for everything a recruiter actually reads.

### Hierarchy
- **Display** (700, clamp(2.6rem, 5.2vw, 4.25rem), 1.04): the hero headline only, which is the owner’s full name ending in a teal full stop.
- **Role line** (700, clamp(1.375rem, 2.3vw, 1.875rem), fg-soft): the job title under the name, in the display face.
- **Email Display** (700, clamp(1.6rem, 5.2vw, 3.4rem), 1.04): the contact email address, set as an underlined link. It is the contact card's largest type.
- **Headline** (700, clamp(2rem, 3.4vw, 2.75rem), 1.04): section heads via the block head ("Featured projects").
- **Title** (700, 1.875rem): featured project names, the "More projects" subhead, the card heads "Work experience" and "Skills", and the contact heading "Get in touch".
- **Title Small** (700, 1.375rem): preview project card names, the "Profile" card head and the "Education" sub-heading.
- **Lead** (400, 1.125rem, 1.6): the hero intro, max 54ch.
- **Body** (400, 1.0625rem, 1.6): default body and featured project summaries. Block-head intros cap at 44ch, the contact paragraph at 52ch.
- **Body Small** (0.9375rem): fact values (500 in the profile and skills rows), the project fact table, preview card summaries, nav links and medium buttons (600).
- **Label** (500, 0.875rem): fact labels, dates, and the meta line under project names ("client · year", "year · Partly live").
- The header name is the short name “Shorno.” in the display face at 1.1875rem, with the full stop in accent; it is the site’s wordmark.

### Named Rules
**The Display-for-Heads Rule.** Bricolage is for headings, the header name and the contact email. Body, labels, fact rows and buttons are Hanken.

**The One-Colour Headline Rule.** A headline is one colour from end to end. No highlighted phrase, no gradient text. The one exception is the teal full stop after the name, in the header wordmark and the hero headline; it is the site’s signature mark and appears nowhere else.

**The Mono-Is-Data Rule.** Geist Mono only for code-like data. Never as decoration, never uppercase-tracked labels.

**The Tabular Figures Rule.** Dates, years and meta lines use tabular lining numerals (`.tabular`).

## Layout

A centred container (max 1200px) with a 16px gutter on mobile and 28px from 640px. The page is a vertical sequence of sections, each opening with 64px of top space (80px from 768px); no dividing rules between sections. 768px (`md`) is the layout pivot: below it every grid stacks into one column. 640px (`sm`) is where fact rows split into a label column and a value column.

Inside sections, cards sit in asymmetric two-column grids with a 20px gap:
- Hero: intro card and sand profile card at 1.35fr / 1fr from 1024px; stacked below that.
- Featured project card: details and screenshot at 1fr / 1.35fr from 1024px. Below that the screenshot moves above the details.
- Lead project card (the first featured project): details in two columns from 768px (summary and live link left, fact table right), a wide screenshot frame below. On mobile the screenshot moves above the details.
- Experience and skills: 1.2fr / 1fr.
- More projects: two preview cards per row from 768px, newest first.
- Contact card: a single column (heading, paragraph, email, then a hairline and the two pill buttons).

Fact rows use a fixed label column sized to their labels: 6.5rem in the profile card, 9.5rem in work experience, education and skills, 4.5rem in the project fact table. Rows are 14 to 16px tall in padding (10px in the denser project table) with a 16px column gap.

Card padding is 24px on mobile and 32 to 44px on desktop (hero intro 28/44px, profile card 28/36px, project details 24/36px, experience and skills 24/32px, preview card sheets 20/24px, contact 24×36px / 56px). The sticky header floats 14px below the top of the viewport; anchor targets offset by the header height (80px) plus 1rem.

## Elevation & Depth

Lifted, but softly, and still. Cards and the header rest on a two-layer ambient shadow (a 1-2px contact shadow plus a long, negatively spread drop) that reads as paper on a desk, not as a floating panel. Nothing gains elevation on hover. Tinted surfaces (the profile card) and the ink contact card have no border and no shadow. The pastel frames add the second kind of depth: the screenshot casts an upward shadow onto its tint, as if slid into a sleeve, and rises 6px out of it when its card is hovered.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgb(22 24 27 / 0.04), 0 8px 24px -12px rgb(22 24 27 / 0.12)`; dark `0 1px 2px rgb(0 0 0 / 0.3), 0 8px 24px -12px rgb(0 0 0 / 0.5)`): every white card at rest and the header pill.
- **Sleeve** (`box-shadow: 0 -2px 30px -10px rgb(22 24 27 / 0.25)`): the screenshot inside its tint frame, both themes.

### Named Rules
**The Soft Shadow Rule.** Shadows are wide, low-opacity and negatively spread. No hard, offset, coloured or glowing shadows.

**The Still Card Rule.** Cards and buttons do not lift, tilt or gain a shadow on hover. Hover changes colour, border or opacity; the only thing that moves is a screenshot (6px, inside its frame) and an arrow (a 2 to 4px nudge).

## Shapes

Generously rounded, with pills reserved for controls. Large containers use 28px (`xl`), with the contact card going to 36px on desktop (28px on mobile). Preview project cards use 28px with a 20px (`lg`) top-rounded details sheet; 14px (`md`) and 10px (`sm`) remain for the archive and operator console. The header, nav links and buttons are full pills; nothing that is only a label is a pill. Screenshot frames are rounded on the top corners only (18px) and run off the bottom edge of the card; the screenshot inside is top-rounded at 12px and clipped, always tighter than its frame. Borders and rules are always solid 1px hairlines. There are no decorative shapes: no blobs, glows, blurred circles or rotated markers.

The drawn outbound arrow (12px grid, 1.8 stroke, inherits text colour) is the only icon. It appears inline after a label, never inside a badge or circle.

## Components

### Buttons
Calm, solid pills that change colour, never position.
- **Shape:** full pill. Medium is 48px tall with 24px side padding and 15px semibold text; small is 40px tall, 18px padding, 14px text.
- **Arrow:** optional inline 11px arrow after the label for outbound links. It nudges 2px up and right on hover (200ms).
- **Accent:** teal fill, the one primary action per group ("Get in touch"). Hover deepens to accent-hover.
- **Ink:** ink fill, small, for compact solid actions: header Resume and each featured project's live-site button, labelled with the real hostname. Hover drops to 90% opacity.
- **Outline (default):** card-white fill, hairline-strong border, ink text ("View resume"). Hover darkens the border to ink.
- **Inverse / Ghost inverse:** for the ink contact card only. Inverse is an ink-fg pill (hover 90% opacity); ghost inverse is transparent with a 30% ink-fg border that goes solid on hover.
- **Hover / Focus:** background, border and opacity transition over 200ms ease-out; no lift, no shadow. Focus is a 2px accent outline at 3px offset. Buttons are native anchors so mail and PDF links bypass the router.

### Text Links
Secondary actions are underlined text, not buttons: 14px semibold ink with a hairline-strong underline (4px offset) and an inline arrow, turning accent on hover ("Google Play", "Source code"). Footer links use the same treatment at 3px offset. On preview project cards the live hostname is accent (hover accent-hover) and the "Source" link is text-soft (hover ink), both without underline.

### Fact Rows (signature)
The system's main information pattern. A `<dl>` (or `<ol>` for dated entries) of rows: a quiet label column (text-soft) and a value (ink), separated by 1px hairlines.
- **Profile card:** 14px medium labels in a 6.5rem column, 15px medium values; rules are ink at 10% on the sand ground. Rows: Currently, Experience ("since Sep 2024", derived from the earliest role), Based in, Open to, Education.
- **Work experience and education:** tabular date in a 9.5rem column; value is a semibold role with an accent-linked company, then a 15px soft line for type and scope. Education sits under its own title-small sub-heading, in the same row form.
- **Skills:** group label in a 9.5rem column, then the tools as a comma-separated 15px medium list. A group may add one 14px text-soft line under its tools explaining what they are for (Monitoring & analytics).
- **Project fact table:** a 4.5rem column of 14px medium labels beside 15px values, framed top and bottom by hairlines. Rows in order: Team, Built, Result or Results (semibold, one line each), Stack. Results render only when owner-confirmed.
- Below 640px the profile, experience and skills rows stack label over value; the project table keeps its two columns.

### Cards / Containers
- **Corner Style:** 28px for cards; 20px for the details sheet on preview cards.
- **Background:** card-white; the hero profile card is tint-sand with no border or shadow.
- **Shadow Strategy:** card shadow at rest, unchanged on hover; see Elevation & Depth.
- **Border:** 1px hairline.
- **Internal Padding:** 24px mobile, 32 to 44px desktop.

### Navigation
- **Header:** a sticky floating pill (card-white at 85% with a medium backdrop blur, hairline border, card shadow) holding the short name “Shorno.” (teal full stop) in the display face, then section links, the theme toggle and an ink Resume button with arrow.
- **Links:** 15px medium pills, 40px tall. Default text-soft; hover and active (the section in view, `aria-current="location"`) take the page fill and ink text. Links hide below 768px, leaving name, toggle and Resume.
- **Theme toggle:** plain text naming the theme it switches to ("Dark" / "Light"), styled like a nav link.
- **Footer:** a plain row, no card: copyright in text-soft, then "Code archive" and "GitHub" as text links.

### Featured Project Card
A 28px card split into details and a screenshot. Details, in order: title-size name; a label-size "client · year" meta line (adding the status only when not live); the summary; the fact table; then actions at the bottom: the small ink button labelled with the live hostname, and text links for Google Play and Source code. The screenshot sits in a 16:9 clipped plate inside its project's tint frame, inset 18px from the card's top and right, bleeding off the bottom. On card hover only the screenshot moves: it rises 6px over 400ms.

The first featured project, the flagship, uses a lead layout instead: the card's top holds a larger name (clamp(1.875rem, 3.2vw, 2.5rem)), meta line, summary (1.125rem from 768px) and live-site button on the left and the fact table on the right; below, a full-width tint frame (40px inset from 768px) holds the screenshot at 2.2:1 (16:9 on mobile), object-top. It breaks the run of identical split cards and says which project matters most.

### Preview Project Card
A 28px card, newest project first, two across from 768px. The live screenshot fills the top at full width in 16:9 (object-top, never cropped at the sides) on a surface fill. A card-white details sheet with 20px top corners overlaps the screenshot’s lower edge by 48px (56px on desktop) and casts a soft upward shadow. Sheet content: a title-small name, a "client · year · team · status" meta line (status only when not live, e.g. "Partly live"), the summary in ink, what was built in text-soft, then a hairline footer with the accent hostname and a soft "Source" link, each with an arrow. The whole card is one link to the live site (the Source link sits above it). On hover the screenshot scales to 1.03 over 600ms and the hostname arrow nudges; the card itself does not move.

### Contact Card
The closing ink card: a title-size "Get in touch", a 75%-opacity paragraph, then the email address in Email Display as an underlined link (ink-fg underline at 25%, solid on hover) with an arrow that nudges 4px. Below a 15% ink-fg hairline sit three small pills: inverse "Resume (PDF)", and ghost-inverse "LinkedIn" and "GitHub" with arrows.

### Motion
Nothing moves on its own. State motion is colour, border and opacity (200ms ease-out), plus two small movements: arrows nudge up-right on hover (2px in buttons, 4px on the contact email), and a featured screenshot rises 6px inside its frame on card hover (400ms ease-out). Featured project cards below the fold fade in and settle up 16px once, over 400ms, on first entering the viewport (10% bottom margin), then stop observing; cards already on screen at load, and every card under reduced motion or without JS, are simply visible. Route changes crossfade the root over 320ms. `prefers-reduced-motion` collapses all transitions and animations to effectively zero.

## Do's and Don'ts

### Do:
- **Do** set facts as label-and-value rows with hairlines between them; reach for this before any other pattern.
- **Do** put every content group in a card: card-white, 1px hairline, 28px corners, card shadow.
- **Do** give each featured project one pastel tint frame, and set `tint` on the project data rather than styling a frame by hand.
- **Do** use one accent pill button per group; other primary-weight actions are outline (or ink for compact solids, inverse on the ink card), and secondary actions are underlined text links.
- **Do** label a live-site link with its real hostname.
- **Do** derive every profile value (career start, current roles, education) from the profile and experience data.
- **Do** render Team and Result only when the data holds owner-confirmed values; when absent, omit the row entirely.
- **Do** check every visual change in both paper and dark themes and at 375px.
- **Do** keep motion to colour changes, arrow nudges, the screenshot rise and the one-shot card reveal, and keep it off under reduced motion.

### Don't:
- **Don't** invent numbers, team sizes or outcomes, and never ship a placeholder value.
- **Don't** introduce a raw hex in components; add a token to both themes instead.
- **Don't** bring back the removed template tells: chips or tags for stack, year, client or status; a status pill with a glowing dot; a two-colour or highlighted headline; blurred blobs or glows; big-number fact tiles; diamond or other decorative bullet markers; a timeline spine with ring nodes; a "Current" pill; a monogram tile; round arrow buttons or arrow badges; dashed dividers.
- **Don't** lift, tilt or add a shadow to a card or button on hover.
- **Don't** use any icon other than the drawn arrow: no icon libraries, no glyph icons, no emojis, and never put the arrow in a circle.
- **Don't** use a tint as a text colour, as a second accent, or as a status meaning.
- **Don't** use hard, offset, coloured or glowing shadows.
- **Don't** use Geist Mono or uppercase tracked labels as decoration.
- **Don't** add continuous, looping or scroll-linked animation.
