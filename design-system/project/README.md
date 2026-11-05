# Carta Cergam

O seu logótipo em cada garrafa. A design system concept for the new cergam.pt and a brand refresh for Cergam, a Portuguese decorator of glass and porcelain. The site works like a printer's colour chart: a quiet, neutral interface, so the 22 Cores Cergam are the only strong colour and the orange dot of the logo marks whatever is active.

This is a pitch concept, not an official Cergam asset. The logo is not included because Cergam publishes only a small PNG. Ask for the vector master.

## Why this direction

Source: the current site cergam.pt (November 2026), a company and competitor audit, and the two reference sites Cergam named (Saverglass and Estal).

- Cergam's real intellectual property is the colour system: 22 standard colours chosen from about 4,000 jobs, fired into glass at 580 ºC. Today the site states none of it on the home page.
- Competitors are generic template sites. None shows its colours or offers a mockup, and quotes go by email.
- Estal gives colour as identity. Saverglass gives restraint. Cergam sells the thing both treat as an extra: decoration.

So the main feature (22 colours) is also the main interaction: a swatch picker with a live bottle preview.

## Content fundamentals

Portuguese first, written like someone from the plant. English, French and Spanish are written by native speakers from the Portuguese.

- Say the number, not the adjective: "a partir de 24 unidades", "12 a 25 dias úteis".
- One idea per sentence. Name the thing: "garrafa de 75 cl", "cozedura a 580 ºC".
- No superlatives, no "soluções integradas", no "excelência". Proof beats praise.
- Be honest about limits: screen colour is approximate, a proof comes first, the minimum is 24 units.
- Sustainability claims state the exact figure and what it applies to: up to 10% recycled glass.

Instead of "Prazos competitivos" write "Entrega em 12 a 25 dias úteis." Instead of "Soluções de personalização premium" write "O seu logótipo em cada garrafa, a partir de 24 unidades."

## Visual foundations

**Colour.** Pages are `canvas` and `surface`. `primary` (navy blue) is the action colour. `inverse-bg` is the navy band for footer and calls to action. The orange dot, `accent`, marks the active menu item, the selected step and the focus ring. In Clear, `accent` is for graphics only (3.1:1 on canvas); coloured text uses `accent-text`. The five area tints (`tint-agua`, `tint-vinho`, `tint-azeite`, `tint-porcelana`, `tint-serigrafia`) are card bands and always carry ink text.

**The 22 Cores Cergam.** The `cergam-c*` tokens hold the screen values measured from the colour chart on the current site (C1 to C31, 22 colours). They are not a print standard and must be re-sampled from fired tiles before launch. Every swatch shows its code, because colour is never the only identifier. A 22-segment strip, 8px high, sits above the footer on every page.

**Type.** Fraunces for headlines, Public Sans for text and interface, IBM Plex Mono for proof-sheet labels (codes, minimum quantities, lead times). All three support Portuguese, French and Spanish diacritics. Never justify text.

**Space, corners, depth.** 4px base. Cards and images have 2px corners, controls 6px, swatches and the dot are round. Flat by default, 1px borders, two shadows only.

**Motion.** One easing, three durations. The signature move is the bottle print changing colour in 240ms. All motion is off under reduced motion. No autoplay carousels (the current site has one).

**Dark theme.** Available, follows the system setting. The swatch preview panel stays light in dark mode, because printed colours look different on a dark ground.

## Imagery

Three families only: the product on a neutral set (same height and angle across a grid), a macro close-up of the fired print, and honest factory photos (screen, decal sheet, kiln rack, a proof tile beside a colour chart). Natural light, no stock people, no text on photos. Real customer work is shown only with written permission. The current photos are 800 px wide and not hero grade: a new shoot is part of the proposal.

## Components

See the Components view. In this sample: Button, AreaCard, SwatchPicker, ProcessSteps. To build for the full site: header with PT, EN, FR and ES switcher, hero, product card, quote form with logo upload, gallery with colour filter, certification strip, catalogue download list, footer.

Rules for all components:

- One primary action per page region. The quote button stays visible on mobile.
- Targets are 44px minimum. Focus is a 3px `accent` ring with a 2px offset.
- Labels sit above fields. Errors say what happened and how to fix it, in plain words next to the field.
- Every component holds a Portuguese headline 1.3 times the English length.

## To confirm with Cergam before launch

- Real values for the 22 colours (fired tile sampling) and the number of colours per decal.
- Process steps, certificates and the exact Made Blue wording. The site contradicts itself on the minimum run (12 or 24) and the firing temperature (580 or 620 ºC).
- Photo and logo rights, and the vector logo master.
