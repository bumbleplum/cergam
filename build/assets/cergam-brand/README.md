# Cergam wordmark

`cergam-wordmark-source.jpeg` is the file Tiago supplied on 2026-11-05 (a WhatsApp
export, 1320x1113, lossy, with the navy background baked in). It is kept here as the
provenance record. **It is not a production asset.**

The two PNGs are derived from it by `build/assets/cergam-brand/derive.py`: the uniform
background `#001A33` is keyed out to alpha, the lettering is recoloured, and the orange
dot `#C1834A` is preserved.

| file | lettering | used when |
|---|---|---|
| `cergam-wordmark-ink.png`   | `#001A33` brand navy      | light theme |
| `cergam-wordmark-paper.png` | `#CBE5FE` brand light blue | dark theme |

Both are 564x111 and are embedded as base64 by `@@LOGO:ink@@` / `@@LOGO:paper@@`
in `i7b-build.py` and `i7a-build.py`.

Measured off the source: hue 209.4 for both the background and the lettering, which is
why the dark surface ramp is built on that hue. The dot is `#C1834A`.

**Ask Cergam for the vector original (SVG, AI or EPS).** These PNGs are traced from a
lossy screenshot; they are good enough at header size and nowhere near good enough for
print or for a large display.
