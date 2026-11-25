---
name: Shorno Kamal Roy, portfolio
description: Soft Studio. A warm off-white page of white rounded cards, pastel screenshot frames and one teal accent.
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
  tint-mint-fg: "#145a3b"
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
  tint-mint-fg-dark: "#8fdcb2"
  signal-ok-dark: "#57c27a"
  signal-warn-dark: "#e0b04f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.6vw, 3.9rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "opsz auto"
  figure:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum, lnum"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-small:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
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
  chip:
    fontFamily: "Hanken Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
  data-mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  xs: "6px"
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
  section: "64px"
  section-desktop: "80px"
components:
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-fg}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-inverse:
    backgroundColor: "{colors.ink-fg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-ghost-inverse:
    textColor: "{colors.ink-fg}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-arrow-badge:
    rounded: "{rounded.pill}"
    size: "26px"
  chip-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-text}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-muted:
    backgroundColor: "{colors.page}"
    textColor: "{colors.text-soft}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-live:
    backgroundColor: "{colors.tint-mint}"
    textColor: "{colors.tint-mint-fg}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  card-compact:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    padding: "20px"
  fact-tile:
    backgroundColor: "{colors.tint-mint}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.lg}"
    padding: "20px"
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
    padding: "64px"
---

# Design System: Shorno Kamal Roy, portfolio

## Overview

**Creative North Star: "The Soft Studio"**

A friendly, polished engineer's portfolio laid out like a tidy studio wall: white cards pinned to a warm off-white page, each one rounded, hairline-edged and resting on a soft ambient shadow. The proof is the product screenshots, so they get the colour: every featured project sits in its own pastel frame (mint, sand, sky, lilac) and rises slightly out of it. Everything else stays quiet so the screenshots and one teal accent carry the page.

Density is moderate and card-based. Information is grouped into self-contained cards (intro, fact tiles, project cards, experience timeline, skills, the ink contact card) separated by a consistent 20px gutter, with generous internal padding. Language is standard recruiter language; the visual system supports scanning rather than reading.

Two themes share one structure. `paper` (default, `:root`) is warm off-white with white cards; `dark` (`.dark`) inverts to near-black graphite with lifted charcoal cards, deepened tints and a lighter cyan accent. The ink contact card swaps with the theme, so in dark it becomes a light card on a dark page.

**Key Characteristics:**
- White rounded cards (28px) with a hairline border and soft two-layer shadow on a warm page.
- Pill everything that is interactive: header, nav links, buttons, chips.
- Pastel tint frames behind screenshots; one tint per project.
- One teal accent for the primary action, links, highlights and timeline nodes.
- Bricolage Grotesque headings in tight tracking; Hanken Grotesk for everything else.
- Hover is a small lift; the only entry motion is a one-shot screenshot reveal.

## Colors

A neutral warm-paper ground with one deep teal-blue accent and four soft pastel tints that only ever appear as fills.

### Primary
- **Deep Studio Teal** (accent; dark: accent-dark): the primary button, inline links (company names, "Source" links), the highlighted phrase in the hero headline, project bullet markers, current-role timeline nodes, the header monogram tile, focus outlines and text selection. Hover deepens to **Teal Shadow** (accent-hover; dark: a lighter cyan). Text on accent is accent-fg.
- **Teal Wash** (accent-soft): an 8% (12% in dark) translucent accent for quiet highlighted grounds. Defined and exposed; reserve it for that role.

### Secondary
- **Studio Ink** (ink / ink-fg): the dark solid used for the contact card, the ink button (header Resume, "Visit site") and arrow badges on outline buttons. It inverts per theme: near-black on paper, near-white in dark, so ink surfaces always contrast with the page.

### Tertiary
- **Pastel Tints** (tint-mint, tint-sand, tint-sky, tint-lilac): fills only. Screenshot frames (each project declares one tint), the hero fact tiles (mint, sand), the soft sky glow in the hero card. Never used as text colour.
- **Mint Status** (tint-mint with tint-mint-fg): the one tint that carries meaning: "live", "Current" and the availability pill. Text on mint always uses tint-mint-fg.

### Neutral
- **Warm Paper** (page): the page ground, nav-link active pill, muted chips, the rows inside the "Currently working at" card and the hover fill of round arrow buttons.
- **Card White** (card): every card, outline buttons, outline chips, the header pill (at 85% opacity under a backdrop blur).
- **Stone** (surface): a deeper panel tone, rarely used.
- **Graphite Ink** (ink-text): headings and body text.
- **Slate Soft** (text-soft): secondary copy, labels, intros, dates, inactive nav. **text-muted** and **text-faint** exist for the archive and operator console; on the homepage, text-soft is the only quiet text tone.
- **Hairline** (hairline): card borders, chip borders, the timeline spine, the dashed divider in compact project cards. **Hairline Strong** (hairline-strong) marks the education node on the timeline and footer link underlines.
- **Signals** (signal-ok, signal-warn): status only. signal-ok is the dot in the availability pill; both are used in the operator console.

### Named Rules
**The One Accent Rule.** Teal is the only saturated colour that carries action or emphasis. Tints are pastel fills, never a second accent.

**The Tint Is a Frame Rule.** Pastel tints sit behind content (screenshots, figures); text never takes a tint colour, and mint is the only tint that means something (live, current).

**The Token-Only Rule.** Components use the named tokens through Tailwind utilities (`bg-bg`, `text-fg-soft`, `bg-tint-sky`). No raw hex in components; a new role is added to both `:root` and `.dark` and exposed in `@theme inline`.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui), optical sizing on
**Body Font:** Hanken Grotesk (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono, for code-like data only (repo names on the archive, operator fields)

**Character:** A characterful, slightly quirky grotesque set heavy-ish (600) and tight (-0.03em, 1.04 line height) for headings and figures, against a calm, legible humanist grotesque for everything a recruiter actually reads.

### Hierarchy
- **Display** (600, clamp(2.4rem, 4.6vw, 3.9rem), 1.04): the hero headline only. The contact headline uses the same face at clamp(2.2rem, 4.2vw, 3.6rem).
- **Figure** (600, clamp(2.75rem, 5vw, 4rem), 1, tabular lining numerals): the big numbers on the hero fact tiles.
- **Headline** (600, clamp(2rem, 3.4vw, 2.75rem), 1.04): section heads via the block head ("Featured projects").
- **Title** (600, 1.875rem): featured project names and the card heads "Work experience" and "Skills". A step down at 1.625rem for the "More projects" subhead, and **Title Small** (1.375rem) for compact project card names.
- **Lead** (400, 1.125rem, 1.6): the hero intro, max 54ch.
- **Body** (400, 1.0625rem, 1.6): default body. Block-head intros cap at 44ch, the contact paragraph at 46ch.
- **Body Small** (0.9375rem): project bullets, compact card summaries, timeline sublines, nav links and medium buttons (600).
- **Label** (500, 0.875rem): field labels ("Location", "Currently working at"), dates, skill group heads (600).
- **Chip** (600, 0.8125rem, line height 1): chips. The "Current" pill drops to 0.75rem, 700.

### Named Rules
**The Display-for-Heads Rule.** Bricolage is for headings, figures and the monogram. Body, labels, chips and buttons are Hanken.

**The Mono-Is-Data Rule.** Geist Mono only for code-like data. Never as decoration, never uppercase-tracked labels.

**The Tabular Figures Rule.** Dates and figures use tabular lining numerals (`.tabular`).

## Layout

A centred container (max 1200px) with a 16px gutter on mobile and 28px from 640px. The page is a vertical sequence of sections, each opening with 64px of top space (80px from 768px); no dividing rules between sections. 768px (`md`) is the single layout pivot: below it everything stacks into one column.

Inside sections, cards sit in asymmetric two-column grids with a 20px gap:
- Hero: intro card and fact column at 1.35fr / 1fr. The fact column is a 2-up grid of tinted tiles above two full-width compact cards.
- Featured project card: details and screenshot at 1fr / 1.35fr. On mobile the screenshot moves above the details.
- Experience and skills: 1.2fr / 1fr.
- More projects: three equal compact cards from 768px.
- Contact card: copy and actions at 1.3fr / 1fr, actions right-aligned and bottom-aligned on desktop.

Card padding is 24px on mobile and 32 to 44px on desktop (hero intro 28/44px, project details 24/36px, experience and skills 24/32px, compact cards 20 to 24px). The sticky header floats 14px below the top of the viewport; anchor targets offset by the header height (80px) plus 1rem. Below 381px the name in the header hides and only the monogram shows.

## Elevation & Depth

Lifted, but softly. Cards rest on a two-layer ambient shadow (a 1-2px contact shadow plus a long, negatively spread drop) that reads as paper on a desk, not as a floating panel. Hover raises the shadow to a deeper "lift" on featured cards and a "card" shadow on buttons. Dark mode keeps the same geometry with black at higher opacity. The pastel frames add a second kind of depth: the screenshot casts an upward shadow onto its tint, as if slid into a sleeve.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgb(22 24 27 / 0.04), 0 8px 24px -12px rgb(22 24 27 / 0.12)`; dark `0 1px 2px rgb(0 0 0 / 0.3), 0 8px 24px -12px rgb(0 0 0 / 0.5)`): every card at rest, the header pill, and buttons on hover.
- **Lift** (`box-shadow: 0 1px 2px rgb(22 24 27 / 0.04), 0 20px 40px -20px rgb(22 24 27 / 0.25)`; dark `0 1px 2px rgb(0 0 0 / 0.3), 0 20px 40px -20px rgb(0 0 0 / 0.7)`): featured project cards on hover.
- **Sleeve** (`box-shadow: 0 -2px 30px -10px rgb(22 24 27 / 0.25)`): the screenshot inside its tint frame, both themes.
- **Halo** (a 4px ring of signal-ok at 20%): the live dot in the availability pill.

### Named Rules
**The Soft Shadow Rule.** Shadows are wide, low-opacity and negatively spread. No hard, offset or coloured shadows.

**The Lift-on-Hover Rule.** Elevation changes only on hover: cards and buttons rise 1 to 3px; only a screenshot rises further (6px), and only inside its frame.

## Shapes

Generously rounded and pill-heavy. Large containers use 28px (`xl`), with the contact card going to 36px on desktop (28px on mobile). Compact cards and fact tiles use 20px (`lg`), inner rows 14px (`md`), the header monogram tile 10px (`sm`). Everything interactive or label-like is a full pill: header, nav links, buttons, chips, status pills, round arrow buttons. Screenshot frames are rounded on the top corners only (18px) and run off the bottom edge of the card; the screenshot inside is also top-rounded and clipped, and its corners must be tighter than its frame's. Borders are always 1px hairlines; the only dashed line is the footer divider inside compact project cards.

Two soft decorative shapes exist and belong to the world: a blurred sky-tint circle bleeding off the hero card's top-right corner, and on the contact card an organic accent blob (55% opacity) with a smaller sand circle (35%), both clipped by the card. Project bullets are small 8px squares rotated 45 degrees in accent.

## Components

### Buttons
Friendly, solid pills with an optional round arrow badge.
- **Shape:** full pill. Medium is 48px tall with 22px side padding and 15px semibold text; small is 40px tall, 16px padding, 14px text. With an arrow the right padding tightens (10px / 6px) so the badge sits close to the edge.
- **Arrow badge:** a 26px circle holding the 11px arrow, in the inverse of the button's fill (accent-fg on accent, ink on outline, ink-fg on ink).
- **Accent:** teal fill, the one primary action per group ("Get in touch"). Hover deepens to accent-hover.
- **Ink:** ink fill, for compact solid actions (header Resume, "Visit site").
- **Outline (default):** card-white fill, hairline border, ink text ("View resume", "Google Play", "Source code").
- **Inverse / Ghost inverse:** for the ink contact card only. Inverse is an ink-fg pill; ghost inverse is transparent with a 25% ink-fg border that rises to 60% on hover.
- **Hover / Focus:** every variant lifts 1px and gains the card shadow (200ms ease-out). Focus is a 2px accent outline at 3px offset. Buttons are native anchors so mail and PDF links bypass the router.

### Chips
- **Style:** pills, 13px semibold, 4px by 10px. **Outline** (card-white, hairline border) for tech stack and skills; **Muted** (page fill, soft text) for year, client and non-live status; **Live** (mint fill, mint-fg text) for live status.
- **State:** chips are static labels. They have no hover or selected state.

### Cards / Containers
- **Corner Style:** 28px for primary cards, 20px for compact cards and tiles.
- **Background:** card-white; fact tiles use a pastel tint with no border or shadow.
- **Shadow Strategy:** card shadow at rest; see Elevation & Depth.
- **Border:** 1px hairline.
- **Internal Padding:** 24px mobile, 32 to 44px desktop.

### Navigation
- **Header:** a sticky floating pill (card-white at 85% with a medium backdrop blur, hairline border, card shadow) holding the tilted accent monogram tile ("SR", rotated -6 degrees), the full name in bold, then section links, the theme toggle and an ink Resume button.
- **Links:** 15px medium pills, 40px tall. Default text-soft; hover and active (the section in view, `aria-current="location"`) take the page fill and ink text. Links hide below 768px, leaving monogram, toggle and Resume.
- **Theme toggle:** plain text naming the theme it switches to ("Dark" / "Light"), styled like a nav link.
- **Footer:** a plain row, no card: copyright in text-soft, then "Code archive" and "GitHub" as semibold links with a hairline-strong underline that turn accent on hover.

### Featured Project Card (signature)
A 28px card split into details and a screenshot. Details: status, year and client chips; a title-size name; the summary; a bullet list with a bold "Role:" row, an optional "Team:" row, highlights, and optional results in semibold; outline stack chips; then actions at the bottom ("Visit site" ink with arrow, outline "Google Play" / "Source code"). The screenshot sits in a 16:9 clipped plate inside its project's tint frame, which is inset 18px from the card's top and right and bleeds off the bottom. On hover the card lifts 2px to the lift shadow (300ms) and the screenshot rises 6px out of its sleeve (400ms).

### Compact Project Card
A 20px card with a status chip, a 36px round arrow button top-right (page fill), a title-small name linked over the whole card, a soft summary, and a dashed-hairline footer row with the role and an accent "Source" link. On hover the card rises 3px and tilts -0.4 degrees (250ms) while the arrow button turns ink and rotates 45 degrees.

### Experience Timeline
Inside a card: a 2px hairline spine with 16px ring nodes (3px border on card-white). Roles use accent rings; the education entry, always last, uses a hairline-strong ring. Each entry: tabular date in text-soft, a bold role and accent-linked company, a mint "Current" pill on present roles, and a soft line for type and scope.

### Contact Card
The closing ink card: display headline, a 75%-opacity paragraph, and an inverse email button with arrow beside ghost-inverse Resume and LinkedIn, all clipped with the accent blob and sand circle.

### Motion
Nothing moves on its own. Hover lifts are the only state motion (buttons 200ms, compact cards 250ms, featured cards 300ms, screenshots 400ms, all ease-out). Featured project cards below the fold fade in and settle up 16px once, over 400ms, on first entering the viewport (10% bottom margin), then stop observing; cards already on screen at load, and every card under reduced motion or without JS, are simply visible. Route changes crossfade the root over 320ms. `prefers-reduced-motion` collapses all transitions and animations to effectively zero.

## Do's and Don'ts

### Do:
- **Do** put every content group in a card: card-white, 1px hairline, 28px (or 20px for compact) corners, card shadow.
- **Do** give each featured project one pastel tint frame, and set `tint` on the project data rather than styling a frame by hand.
- **Do** use one accent pill button per group; every other action is outline (or ink for compact solids, inverse on the ink card).
- **Do** use the drawn arrow as the only icon: in button badges, round arrow buttons and outbound links.
- **Do** derive every figure (years, project count, current roles) from the project and experience data.
- **Do** render Team and Results only when the data holds owner-confirmed values; when absent, omit the row entirely.
- **Do** check every visual change in both paper and dark themes and at 375px.
- **Do** keep motion to hover lifts and the one-shot screenshot reveal, and keep it off under reduced motion.

### Don't:
- **Don't** invent numbers, team sizes or outcomes, and never ship a placeholder value.
- **Don't** introduce a raw hex in components; add a token to both themes instead.
- **Don't** use any icon other than the drawn arrow: no icon libraries, no glyph icons, no emojis.
- **Don't** use a tint as a text colour or as a second accent.
- **Don't** use hard, offset or coloured shadows, or lift a card or button more than 3px.
- **Don't** use Geist Mono or uppercase tracked labels as decoration.
- **Don't** add continuous, looping or scroll-linked animation.
