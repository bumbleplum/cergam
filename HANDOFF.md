---
title: "Cergam prototypes: how to pick this up in Claude Code"
type: note
status: draft
language: en
owner: tiago
created: 2026-11-05
---

# Cergam prototypes: how to pick this up

Everything built on 2026-11-05 is saved in this folder. Nothing important lives only in the old session. This note says where things are, how to rebuild and publish them, and what to read first.

## 1. What exists

| What | Published (private) | Source in this folder |
|---|---|---|
| Pitch deck, Portuguese, 11 main and 8 appendix slides | https://claude.ai/artifact/VuGT2BEKMSaz1Zb7odvQaX | `pitch-deck/project/` (`deck.json` and 19 slide files) |
| Trade desk site (chosen): home plus #fabricantes, #amostra, #modelo | https://claude.ai/artifact/Bt7CzRDZ6VYZuCzfHAwCjx | `build/i7b-src.html`, `build/i7b-build.py`, `build/i7b-work/` |
| Traditional site: home plus #agua, #cores, #orcamento | https://claude.ai/artifact/FGYu1E2vv7TqSeMnThTYSP | `build/i7a-src.html`, `build/i7a-build.py`, `build/i7a-work/` |
| Design system "Carta Cergam" | https://claude.ai/artifact/MQSMTdU9P4BgWcwnzWhmC5 | `design-system/project/` |
| Concept render lab (glass imagery library) | https://claude.ai/artifact/4PH3qGTPgUNLDF8qWz4VWJ | `render-lab/` |
| Finished HTML of each site | | `chosen-landing/cergam-site-trade-desk.html`, `traditional-landing/cergam-site-traditional.html` |
| Earlier versions, set aside | | `archive/` (see `README.md`) |

Inputs the builds need are in `build/assets/cergam-imagery/`: the 41 curated photos with `manifest.json`, and the render library `cergam-glass.js`.

Not saved: the 531 images downloaded from cergam.pt during the audit. Download them again if you need others. The audit note `../cergam-image-audit.md` says which ones to use and which to avoid.

## 2. Start a Claude Code session

Open the folder `consulting` (so the rules in `consulting/AGENTS.md` apply), not only the Cergam folder.

```bash
cd "/Users/globe/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidians/consulting"
claude
```

In the Claude desktop app, open the Code tab and choose the same folder.

First message to give it:

```text
Read clients/cergam/prototypes/HANDOFF.md, then clients/cergam/cergam-design-brief.md and cergam-journey-consumption-map.md. We are building the Cergam site prototypes. Follow the consulting AGENTS.md rules. Do not invent facts, prices or names: anything Cergam has not confirmed shows as "a confirmar".
```

## 3. Rebuild a site

The build scripts use only paths inside `build/`. Edit the `-src.html` or the files in the `-work/` folder, then run:

```bash
cd clients/cergam/prototypes/build
python3 i7b-build.py   # writes i7b.html
python3 i7a-build.py   # writes i7a.html
```

Both rebuild byte for byte to the published versions, which was tested on 2026-11-05. Tools needed: `python3` and `node`. `node --check` is a quick syntax test on the inline script.

Where to edit:
- The home page copy and the seven situations of the trade desk site live in one data object (`DOORS`) in `i7b-src.html`, in Portuguese and English.
- The extra pages are in `i7a-work/part-*.html` and `i7b-work/frag-*.html`.
- Images: the build embeds photos from `build/assets/cergam-imagery/curated/` and takes alt text and sizes from `manifest.json`.
- Glass renders: `build/assets/cergam-imagery/render/cergam-glass.js`. The sites use patched copies in each `-work/` folder.

## 4. Check it in a browser

```bash
cd clients/cergam/prototypes/build && python3 -m http.server 8000
```

Open `http://localhost:8000/i7b.html#fabricantes` (or `#amostra`, `#modelo`, and `i7a.html#agua`, `#cores`, `#orcamento`). For screenshots without opening a browser, a headless Chromium is already installed by Playwright under `~/Library/Caches/ms-playwright/` (`chromium_headless_shell-*`). Check at 1440 and 375 px wide.

## 5. Publish

Publishing needs Claude Code with your claude.ai sign-in and the Artifact tool.

- A site: ask Claude to publish the built file to the existing link, for example "publish `build/i7b.html` to https://claude.ai/artifact/Bt7CzRDZ6VYZuCzfHAwCjx". This keeps the link and the history. Publishing without the link creates a new artifact at a new address.
- The deck: the slides are files under `pitch-deck/project/`. Claude must read `deck.json` first, change only what changed, and send the changed slide files with the same link. The three screenshots in `pitch-deck/` are already uploaded to the deck. If the deck is ever recreated, they must be uploaded again.
- Everything stays private until you share it from the artifact's Share menu.

## 6. Rules the content follows

- Verified facts only (from cergam.pt, November 2026): since 1968, personalisation since 2008; 22 Cores Cergam (screen samples); Pantone and CMYK not matched exactly; 12 to 25 working days; 40+ countries; 2,500 m2; Malveira address, +351 21 9862 540, info@cergam.pt.
- Contradictions on the site, shown as "a confirmar": minimum 24, 12 or 48; firing 580 or 620 ºC; dishwasher wording.
- Never invent names, prices, specs, capacities, testimonials or certificates. Renders carry "Imagem de conceito, não fotografia". Photos carry "Foto Cergam, provisória".
- Client documents follow `consulting/AGENTS.md` T-09: plain short sentences, numbers over adjectives, no em-dashes, no compound hyphens. No prices come from anywhere except `rates.md`.

## 7. Still open

- Questions for Cergam: see "O que precisamos de saber" in the deck. Main ones: minimum, firing temperature, dishwasher wording, what starts the lead time, a named contact and reply time, proof step and price, domain and hosting ownership, a vector logo, permission for photos and named work.
- Photo consent: several placeholders show client names (Aliança, Lourinhã, Aidum, Ti Lena, BICA).
- No team or credibility slide in the deck.
- The deck shows the home pages only, not the new inner pages.
- Decisions queued in `consulting/review-queue.md` (each note lists its own five).
- Not tested: real phones, Safari, screen readers, dark mode on every page.
- Possible next steps: send the open questions to Cergam, do the one-hour plant test (colour board and decal macro), a real photo shoot (`../cergam-imagery-brief.md`), a scoping note, then effort and price.
