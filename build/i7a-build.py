#!/usr/bin/env python3
"""Build i7a.html from i7a-src.html: inlines the patched CergamGlass copy (i7a-work/cergam-glass.js, a copy of the i5b patched library),
expands {{tbc}} stamps and @@PH:...@@ photo figures, and embeds curated photos as data: URIs. Alt text PT/EN from the curated manifest."""
import base64, html, json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(HERE, "assets") + "/"
CUR = SCR + "cergam-imagery/curated/"
lib = open(os.path.join(HERE, "i7a-work", "cergam-glass.js"), encoding="utf-8").read()
assert "</script" not in lib.lower()
manifest = {i["file"][:-4]: i for i in json.load(open(CUR + "manifest.json", encoding="utf-8"))["items"]}
CAP_EN = {
 "fabrica-corte-decalques-B": "Cutting the decal sheets before they are applied.",
 "fabrica-serigrafia-maquina-A": "Screen-printing machine running in the factory.",
 "fabrica-forno-entrada-A": "Decorated bottles at the entrance of the firing oven.",
 "fabrica-paletes-B": "Boxes packed on pallets, ready to ship.",
 "cor-garrafa-tecnica-A": "Test bottle with the real colours printed and fired onto the glass.",
 "agua-swingtop-arco-iris-B": "Vertical lettering in rainbow colours on a swing-top bottle.",
 "agua-padrao-azulejo-detalhe-A": "Close detail of the print: fine lines in several colours on glass.",
 "agua-padrao-azulejo-A": "Multicolour print on glass, with small text and a QR code that stay legible.",
 "agua-casario-fosco-A": "One-colour print on frosted glass.",
 "agua-azul-fosco-B": "Glass painted blue with a white print.",
 "agua-circulo-minimal-B": "Thin black monogram on clear glass.",
 "vinho-ouro-xo-A": "Gold print on clear glass, sharp and easy to read.",
 "vinho-rosas-par-A": "The same design applied to two bottle sizes.",
 "vinho-ouro-preto-B": "Black and gold print on glass.",
 "vinho-tinto-escuro-B": "White and gold print on dark glass.",
 "azeite-folhas-A": "White print on dark glass.",
 "azeite-texto-negro-A": "Widely spaced lettering printed in white on black glass.",
 "azeite-arvore-ambar-A": "Light-coloured print on amber glass.",
 "azeite-ramo-verde-B": "Light print on green glass.",
 "porcelana-cruz-caneca-A": "Red print on white porcelain.",
 "porcelana-azulejo-A": "Blue decoration on a ceramic tile, in a traditional style.",
 "porcelana-passaro-caneca-B": "Black illustration on white porcelain.",
}
CAP_PT_OVERRIDE = {"porcelana-azulejo-A": "Decoração a azul sobre um azulejo, num estilo tradicional."}
used = {}
dups = 0
def photo(k, w, h, lazy=True):
    """First use of a photo carries the data URI (so the home page works without JS); every later use
    carries data-dup and the page script copies the first one's src, so each image is embedded once."""
    global dups
    m = manifest[k]
    pw, ph = [int(x) for x in m["size_px"].split("x")]
    if k in used:
        dups += 1
        src = 'data-dup="%s"' % k
    else:
        src = 'src="@@IMG:%s@@" data-img="%s"' % (k, k)
    used[k] = m
    return ('<img %s alt="%s" data-alt-en="%s" width="%d" height="%d" loading="lazy" decoding="async">'
            % (src, html.escape(m["alt_pt"], quote=True), html.escape(m["alt_en"], quote=True), pw, ph))
def fig(mt):
    parts = mt.group(1).split("|")
    k = parts[0]
    m = manifest[k]
    cpt = CAP_PT_OVERRIDE.get(k, m["caption_pt"]); cen = CAP_EN[k]
    lead = ""
    if len(parts) > 2:
        lead = '<b data-en="%s">%s</b> ' % (html.escape(parts[2]), html.escape(parts[1]))
    return ('<figure class="shot"><div class="shot-img">%s</div><figcaption><span>%s<span data-en="%s">%s</span></span>'
            '<span class="src2" data-en="Cergam photo">Foto Cergam</span></figcaption></figure>'
            % (photo(k, 0, 0), lead, html.escape(cen, quote=True), html.escape(cpt)))
def tbc(mt):
    if mt.group(1):
        return '<span class="tbc" data-en="%s">%s</span>' % (html.escape(mt.group(2), quote=True), html.escape(mt.group(1)))
    return '<span class="tbc" data-en="to be confirmed">a confirmar</span>'
src = open(os.path.join(HERE, "i7a-src.html"), encoding="utf-8").read()
src = src.replace("@@LIB@@", lib)
src = re.sub(r"\{\{tbc(?:\|([^|}]*)\|([^}]*))?\}\}", tbc, src)
src = re.sub(r"@@PH:([^@]+)@@", fig, src)
total = 0
for name in sorted(used):
    data = open(CUR + name + ".jpg", "rb").read(); total += len(data)
    src = src.replace("@@IMG:%s@@" % name, "data:image/jpeg;base64," + base64.b64encode(data).decode())
# 3. brand wordmark. Two themed PNGs derived from the supplied lockup by
#    assets/cergam-brand/derive.py; see the README there.
for _tone in ("ink", "paper"):
    _p = os.path.join(HERE, "assets", "cergam-brand", "cergam-wordmark-%s.png" % _tone)
    with open(_p, "rb") as _f:
        src = src.replace("@@LOGO:%s@@" % _tone,
                          "data:image/png;base64," + base64.b64encode(_f.read()).decode())
assert "@@" not in src, re.findall(r"@@[^@]{0,40}@@", src)[:5]
out = os.path.join(HERE, "i7a.html")
open(out, "w", encoding="utf-8").write(src)
assert len(src.encode()) < 3.5 * 1024 * 1024, "over 3.5 MB"
print("i7a.html %d KB (photos %d KB, %d images, %d reused by reference)" % (len(src.encode()) // 1024, total // 1024, len(used), dups))
