---
title: "Cergam prototypes: what is kept and what is archived"
type: note
status: draft
language: en
owner: tiago
created: 2026-11-05
---

# Cergam prototypes

Index of the prototype work built on 2026-11-05. The chosen page, the design system and the render lab stay published as private artifacts. Everything else is archived here as local HTML files and its published copy was deleted. Open any HTML file in a browser. Pages need an internet connection only for Google Fonts.

All pages are concept prototypes. Product details, contact slots, minimums and certifications marked "a confirmar" are not confirmed by Cergam. Photos were copied from cergam.pt as placeholders, remain the property of Cergam and its customers, and several show client names that need consent. Renders are concept art, labelled "Imagem de conceito, não fotografia".

## Kept (published as private artifacts)

| What | Local copy | Published link |
|---|---|---|
| Chosen landing page (light corporate first screen with a peek of the case selector, then a trade order sheet that adapts to seven situations; request summary split from what Cergam must confirm). Chosen 2026-11-05. | `chosen-landing/cergam-site-trade-desk.html` (home plus three example pages: fornecimento para fabricantes `#fabricantes`, amostra e cores `#amostra`, ficha de produto `#modelo`), plus `-src.html` and `-build.py` (the build script still has absolute paths from the working session) | https://claude.ai/artifact/Bt7CzRDZ6VYZuCzfHAwCjx |
| Traditional landing page, a conventional comparison to the chosen page (hero, audiences, benefits, process, 22 colours, gallery, FAQ, enquiry). Built 2026-11-05. | `traditional-landing/cergam-site-traditional.html` (home plus three example pages: vidro para água `#agua`, as 22 cores `#cores`, pedir orçamento `#orcamento`), plus `-src.html` and `-build.py` | https://claude.ai/artifact/FGYu1E2vv7TqSeMnThTYSP |
| Pitch deck in Portuguese, restructured for the Cergam decision maker: 11 main slides (what they asked for, their hidden asset, what the site costs them, the market, the idea, what they get, imagery, impact, what we need, how we start) and 8 appendix slides. No prices and no team slide, removed at Tiago's request. Built 2026-11-05. | `pitch-deck/project/` (deck.json and 19 slide files) and the three screenshots it uses | https://claude.ai/artifact/VuGT2BEKMSaz1Zb7odvQaX |
| Design system "Carta Cergam" | `design-system/project/` (tokens, brand book, cover, four component previews) | https://claude.ai/artifact/MQSMTdU9P4BgWcwnzWhmC5 |
| Render lab (concept glass imagery) | `render-lab/` (`cergam-glass.js`, `render-lab.html`, README) | https://claude.ai/artifact/4PH3qGTPgUNLDF8qWz4VWJ |

## Archived (published copies deleted)

These folders were not copied into `~/dev/cergam`. They live only in the consulting vault, under
`/Users/globe/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidians/consulting/clients/cergam/prototypes/archive/`.

| Folder | What it is | Why it was set aside |
|---|---|---|
| `archive/01-first-prototype/` | First Cergam site (home, products, quote), concept "Carta Cergam" | Led with process claims and had little imagery. |
| `archive/02-variants-producer-led/` | Four alternative landing pages: live proof, colour fields, kiln-lit, quote as the page | Led with 580 ºC and 22 colours, not with the buyer. |
| `archive/03-buyer-led-no-imagery/` | Three buyer-led landing pages: three answers, doors, trade desk | Right idea, almost no imagery. |
| `archive/04-imagery-rebuilds-not-chosen/` | Imagery rebuilds of the three answers and the doors | Not chosen. The trade desk was taken forward. |
| `archive/05-landing-before-corporate-first-screen/` | The trade desk with the seven-situation selector, before the first screen was made more corporate | Replaced by the light corporate first screen. Its text block still mixed the request with Cergam's caveats. |
| `archive/06-first-screen-navy-not-chosen/` | The corporate first screen on the navy ground | Not chosen. The light version was taken forward. |

| `archive/07-single-page-before-inner-pages/` | The trade desk page and the traditional page as single pages, before the three example inner pages were added to each | Replaced in place by the multi-page versions at the same links. |

Two comparison artifacts for the corporate first screen (navy and light) are still published at https://claude.ai/artifact/JQuDL4cgyR5NNgS5yLS7i3 (navy) and https://claude.ai/artifact/VwqHjJE4h52iPYTPvY3DJd (light). They can be deleted: the light one is now the chosen page, the navy one is archived above.

## Related notes (same client folder)

Buyer and design thinking: `cergam-buyer-situations.md`, `cergam-buyer-questions.md`, `cergam-landing-narratives.md`, `cergam-landing-red-team.md`, `cergam-journey-consumption-map.md`, `cergam-design-brief.md`. Imagery: `cergam-image-audit.md`, `cergam-imagery-brief.md`. Company and market: `cergam-company-analysis.md`, `cergam-competitor-analysis.md`, `cergam-design-system-proposal.md`.

## Assumed values that Cergam must verify

On 2026-11-05, on Tiago's instruction, both prototypes were changed to read as finished sites: the visible `a confirmar` tags, the prototype badges and the open-item lists were removed, and every gap was filled with a plausible value. **Nothing in the list below came from Cergam.** The pages no longer show where the gaps are, so this list is the only record of them. Check every line before anything here is shown as fact or reused as copy.

Contradictions on cergam.pt, resolved by picking one side:

| Item | Value now stated | The other published value |
|---|---|---|
| Minimum, glass | 24 pieces | the site also says 12 |
| Minimum, porcelain | 48 pieces | — |
| Decal firing | 580 ºC | another listing says 620 ºC |
| Dishwasher | industrial only | domestic never confirmed, now simply not claimed |

Values invented outright, with no source:

| Item | Value now stated |
|---|---|
| What starts the lead time | artwork approval |
| Reply time | 1 working day |
| Who replies | "Equipa comercial" (a role, no person named) |
| Colour tolerance between batches | judged against the approved sample |
| Packing | cardboard box with dividers, pallets on request |
| Samples and proof | digital proof before production, fired sample on request |
| Price | varies with colours, quantity and product; every enquiry gets its own quote (no figure) |
| Logo file | vector (AI, EPS, PDF), or PNG at 300 dpi |
| Neck and cap fit | confirmed with the quote, from the buyer's equipment model |
| Recommended notice for a repeat order | 20 working days |
| Shipping cost and time | stated in the quote |
| Batch reference on the swatch card | L-2611 |
| Example product `CG-AQ-500` | 500 ml, 228 mm high, 68 mm diameter, 420 g, GPI 28 mm thread, clear glass |
| Three "similar models" | bottle 750 ml, carafe 1.000 ml, swing-top 500 ml |
| Data protection note (i7a) | data sent is used only to answer the enquiry |

Deliberately **not** invented, and removed instead:

- Company tax number (NIF) and the privacy-policy link. Legal identifiers are not guessable; the complaints book now links to the public `livroreclamacoes.pt`.
- The Made Blue programme wording and figure. A third-party charity claim.
- Any individual's name. Replaced by the role.
- Client names and quantities on photos. The pages now say these are not identified; the consent problem in `cergam-image-audit.md` is unchanged.
- The product datasheet PDF and 3D drawing. The files do not exist, so the Documents block was removed rather than given dead buttons.
- Any price. `$VAULT/rates.md` is still the only source and the prototypes still carry no figure.

One behaviour now reads as untrue to a visitor: submitting a form shows "Pedido enviado. Respondemos por email em 1 dia útil." The forms still send nothing.

Colour names are gone rather than invented: the 22 colours are identified by code, C1 to C31. The real values still need fired samples.
