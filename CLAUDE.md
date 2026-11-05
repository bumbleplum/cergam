# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Where to run

Open the `consulting` vault root, not this folder and not `~/dev/cergam` (which is empty):

```bash
cd "/Users/globe/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidians/consulting"
```

The track rules in `consulting/AGENTS.md` apply to everything here and are not repeated below. `clients/cergam/` has no client-level `AGENTS.md`, so the root file is the whole chain.

Read before editing: `HANDOFF.md` and `README.md` (this folder), then `../cergam-design-brief.md` and `../cergam-journey-consumption-map.md`. For imagery decisions, `../cergam-image-audit.md` and `../cergam-imagery-brief.md`.

## Content rules that constrain the code

These are not style preferences. They decide what may appear in markup.

- Anything Cergam has not confirmed renders as a visible `a confirmar` tag (`<span class="tbc">`), never as a confident claim. There are 87 of them in `i7b-src.html` today. Never resolve one by guessing.
- Never invent a name, price, spec, capacity, testimonial or certificate. Prices come only from `consulting/rates.md`, and the prototypes carry none.
- Verified facts (cergam.pt, November 2026), safe to state: since 1968, personalisation since 2008, 22 Cores Cergam as screen values, Pantone and CMYK not matched exactly, 12 to 25 working days, 40+ countries, 2.500 m2, Malveira, +351 21 9862 540, info@cergam.pt.
- Known contradictions on cergam.pt that must stay unresolved: minimum (24, 12 or 48), firing temperature (580 or 620 C), dishwasher wording.
- Every render carries "Imagem de conceito, nao fotografia". Every photo carries "Foto Cergam, provisoria". Photos are Cergam's property and several show client names without consent.
- Copy follows AGENTS.md T-09: short plain sentences, numbers not adjectives, no em-dashes, no compound hyphens. Portuguese is the primary language, English is the switch.
- Means (580 C, 22 colours, 1968) are proof inside a block, never a headline. The brief's message hierarchy decides placement.

## Build and verify

All rebuilds happen in `build/`. That is the only folder whose scripts have working relative paths.

```bash
cd clients/cergam/prototypes/build
python3 i7b-build.py          # trade desk (chosen) -> i7b.html
python3 i7a-build.py          # traditional site    -> i7a.html
python3 -m http.server 8000   # then open http://localhost:8000/i7b.html#fabricantes
```

Both builds are deterministic and currently reproduce the published pages byte for byte. That is the regression test:

```bash
cmp build/i7b.html chosen-landing/cergam-site-trade-desk.html
cmp build/i7a.html traditional-landing/cergam-site-traditional.html
```

After an intended change those will differ, so copy the new output over the finished file in `chosen-landing/` or `traditional-landing/` as part of the same change, keeping the pair in step.

Browser checks for i7a (Playwright headless Chromium, already installed under `~/Library/Caches/ms-playwright/`), run from `build/`:

```bash
node i7a-work/test.js                                  # assertions, prints PASS/FAIL per check
node i7a-work/shot.js agua 1440 /tmp/agua.png          # screenshot: <hash> <width> <out> [full] [height] [scheme] [lang]
```

There is no equivalent harness for i7b. `i7b-work/chk.js` is a scratch dump, not a test. Check i7b by hand at 1440 and 375 px, in both languages, on the home page and `#fabricantes`, `#amostra`, `#modelo`.

Both test and shot scripts fail the page on any network request other than `file:`, `data:` or Google Fonts. Keep it that way: the pages must be self-contained apart from fonts.

## Architecture

### One file per page, built by a Python script

Each site ships as a single self-contained HTML file: inline CSS, two inline `<script>` blocks, and every photo embedded as a base64 `data:` URI. No bundler, no dependencies, no build config. The build is one Python script doing string substitution on a template:

```
i7b-src.html  +  i7b-work/cergam-glass.js  +  assets/cergam-imagery/curated/*.jpg
    -> i7b-build.py (placeholder expansion, base64 embedding)
        -> i7b.html  (about 2.4 MB, asserted under 3.5 MB)
```

The source files hold `@@...@@` placeholders. The build asserts no `@@` survives, so a typo in a placeholder fails the build rather than shipping broken markup.

### Two sites, deliberately parallel, not shared

`i7b` (trade desk, chosen) and `i7a` (traditional, the comparison) are independent implementations of the same brief. They share the photo set and the render library and nothing else. Do not refactor them together: the pair exists so Cergam can compare two approaches side by side.

Their mechanics diverge, and the difference matters when editing:

| | i7b (trade desk) | i7a (traditional) |
|---|---|---|
| English copy | key dictionaries `EN`, `EN2`, `EN7` in the script; markup carries `data-i="key"` | inline `data-en="..."` on each element |
| Photo figures | `@@FIG:key:classes[:loupe-key]@@`, captions in the `CAPS` dict in the build script | `@@PH:key[\|lead-pt\|lead-en]@@`, captions from the manifest plus `CAP_EN` in the build script |
| Repeat use of a photo | `@@USE:key@@` -> `data-use`, src copied at runtime from the home copy | `data-dup`, src copied at runtime from the first use |
| "a confirmar" | `<span class="tbc">` written in the markup | `{{tbc}}` or `{{tbc\|pt\|en}}` stamp expanded by the build |
| Render library | regenerated by `i7b-work/patch_lib.py` on every build | static patched copy at `i7a-work/cergam-glass.js` |

`setLang()` snapshots the Portuguese text into `data-pt` on load, then swaps `innerHTML`. In i7b a missing `EN` key silently falls back to Portuguese, so new `data-i` keys must be added to the dictionary in the same edit.

### DOORS: the content model of the chosen page

`i7b-src.html` has one array, `DOORS` (seven entries: `maquinas`, `lancamento`, `brinde`, `agencia`, `loica`, `reencomenda`, `outro`). Each entry is a `[pt, en]` pair per field and drives the headline, the three answers, the order sheet defaults, the render, which rules rows show (`rows: ["r5","r4",...]`), which photos appear (`jobs`) and the call to action. The situation selector is built from it at runtime; with JavaScript off the page stays on `maquinas`, the lead door chosen on 2026-11-05 (makers of water filtration equipment).

Copy changes for the home page and the seven situations belong in `DOORS`, in both languages. Nowhere else.

### Images

`assets/cergam-imagery/curated/` holds 40 curated JPEGs plus `manifest.json`. The manifest is the source of truth for `alt_pt`, `alt_en`, `caption_pt`, `size_px`, tier, consent risk and `max_css_width_1x`. The build reads width and height from it and emits them on every `<img>`, so photos are used at native size and never upscaled. Adding a photo means adding a manifest entry first.

The 531 images downloaded from cergam.pt during the audit were not kept. Download again if you need others, and consult `../cergam-image-audit.md` for which to use and which to avoid.

### Render library (CergamGlass)

`render-lab/cergam-glass.js` is the shared original: dependency-free SVG renders of decorated glass and porcelain, documented in `render-lab/README.md`. It is never edited in place. Each site uses its own patched copy, and i7b's is produced by `i7b-work/patch_lib.py`, which applies asserted `str.replace` edits to `cergam-glass.orig.js` (seams, clearer glass, speculars masked over the decal, caustics, a paper backdrop, IBM Plex Sans). Those asserts fail loudly if the original changes, which is the point. To change a render, edit `patch_lib.py`, not the generated file.

### Deck and design system

`pitch-deck/project/` and `design-system/project/` are artifact projects, not web pages. `deck.json` holds the slide `order`, sections, font faces and the design-system reference; each slide is a file in `slides/`. `design-system/project/tokens.json` is the Carta Cergam token set (light default plus dark, with the 22 `cergam-c*` print colours marked as data, not interface colours). Read `deck.json` before touching slides, change only what changed, and send the changed slide files.

## Traps

- `i7a-work/part-*.html` and `i7b-work/frag-*.html` are sliced working copies. No build script reads them. Editing a fragment alone changes nothing: the real source is the single `-src.html` file. Treat the fragments as read-only aids for navigating a 120 to 200 KB template, or re-splice deliberately.
- `chosen-landing/*-build.py` and `traditional-landing/*-build.py` still carry absolute `/private/tmp/...` scratchpad paths from the original session and will not run. Use the copies in `build/`.
- `build/i7b-src.html` and `chosen-landing/cergam-site-trade-desk-src.html` are byte-identical duplicates, same for the i7a pair. Edit the one in `build/` and copy across, or they drift apart silently.
- `archive/` holds six superseded prototype generations whose published artifacts were deleted. Read them for history, do not revive them without a reason: `README.md` records why each was set aside.

## Publishing

Publishing goes through the Artifact tool and keeps the existing private links. Always pass the artifact URL, or a new artifact is created at a new address.

| Target | Link |
|---|---|
| Trade desk site (chosen) | https://claude.ai/artifact/Bt7CzRDZ6VYZuCzfHAwCjx |
| Traditional site | https://claude.ai/artifact/FGYu1E2vv7TqSeMnThTYSP |
| Pitch deck (PT) | https://claude.ai/artifact/VuGT2BEKMSaz1Zb7odvQaX |
| Design system "Carta Cergam" | https://claude.ai/artifact/MQSMTdU9P4BgWcwnzWhmC5 |
| Render lab | https://claude.ai/artifact/4PH3qGTPgUNLDF8qWz4VWJ |

Everything stays private until Tiago shares it. The three screenshots in `pitch-deck/` are already uploaded to the deck and would need re-uploading only if the deck were recreated.

## Decisions and open items

Every note in `../` ends with at most five decisions for Tiago (AGENTS.md T-06). When a task leaves a decision, placeholder or check for him, add a line to `consulting/review-queue.md` in the same write. Eight Cergam items are queued there now, all dated 2026-11-05.

The list of what Cergam must still confirm lives in `README.md` ("What the chosen page still needs from Cergam") and in `HANDOFF.md` section 7. Do not shorten that list by filling a gap with a plausible answer.
