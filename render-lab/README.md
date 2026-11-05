# cergam-glass.js

Rendered product imagery (glass and porcelain with a kiln-fired decal in the Cores Cergam). SVG output, no dependencies. Concept art only: every render carries the label "Imagem de conceito, não fotografia" (disable only with `label:false` if you add your own visible label).

## API

```js
CergamGlass.render(target, opts)   // sets target.innerHTML, returns the <svg>
CergamGlass.svg(opts)              // returns an inline SVG string
CergamGlass.batch(target, opts)    // N identical objects in a rack row (opts.count, default 12)
CergamGlass.loadMask(fileOrDataURL, {threshold:140, invert:false}) // Promise -> {src,w,h}
CergamGlass.COLOURS, .objects, .glasses, .liquids, .lights, .marks   // option lists
```

`opts`:
- `object`: swing, carafe, bordeaux, spirits, flask, oil, oilsq, tumbler, mug, cup, plate (top), plate34
- `glass`: clear, extra, frosted, green, amber, blue, porcelain (mug, cup and plates default to porcelain)
- `liquid`: water, wine, oil, gin, coffee (porcelain only); `fill` 0 to 1
- `colours`: up to 3 Cergam codes or hex, e.g. `['C22','C15']`
- `logo`: `'text'`, `'geometric'`, `'script'`, `'line'`, `'crest'`, or `{src,w,h}` from `loadMask`
- `text` (Enter gives lines), `font` (CSS font-family), `logoScale`
- `backdrop`: studio, navy, colour (with `backdropColour:'C31'`); `lighting`: daylight, backlit, kiln
- `size` (px width), `aspect` (portrait, square, wide or a number), `closure`, `closureColour`, `reflection`, `label`

## Integration

Inline the file in a `<script>` block of the target page (it sets `window.CergamGlass`; no network calls), then call `CergamGlass.render('#slot', {...})`. IDs are unique per render, so many renders can share a page. Text logos use the font you name; load it via Google Fonts and re-render after `document.fonts.ready`.

Export: `const svg = CergamGlass.svg({...})` is a self-contained inline SVG string (paste in markup or save as .svg). Uploaded marks are embedded as a data URI.

## Notes

Colours are screen samples, not a print standard. Batch variation is reflections only; decal colours are identical. Build `render-lab.html` by inlining the module into `lab/lab.src.html` (`python3 build.py`).
