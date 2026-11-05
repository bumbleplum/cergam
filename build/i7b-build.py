#!/usr/bin/env python3
"""Build i7b.html (home + three inner pages): inlines the patched CergamGlass library and embeds curated photos as data: URIs into i7b-src.html.
Alt text (PT and EN) and pixel sizes come from the curated manifest. Photos are used at native size, never upscaled."""
import base64, html, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(HERE, "assets") + "/"
CUR = SCR + "cergam-imagery/curated/"
WORK = os.path.join(HERE, "i7b-work")

# 1. our own copy of the render library (the shared file is never edited): regenerate from the original
subprocess.run([sys.executable, os.path.join(WORK, "patch_lib.py")], cwd=WORK, check=True)
lib = open(os.path.join(WORK, "cergam-glass.js"), encoding="utf-8").read()
assert "</script" not in lib.lower()

# 2. photos. Figures for "Trabalhos reais" are generated from @@FIG:key:classes[:loupe-key]@@ so each one carries PT and EN captions.
CAPS = {
 "agua-padrao-azulejo-A": ("Impressão a várias cores sobre vidro, com texto pequeno e código QR legíveis.", "Multicolour print on glass, with small text and a QR code that stay legible."),
 "agua-casario-fosco-A": ("Impressão a uma cor sobre vidro fosco.", "One-colour print on frosted glass."),
 "agua-azul-fosco-B": ("Vidro pintado de azul com impressão a branco.", "Glass painted blue with a white print."),
 "azeite-folhas-A": ("Impressão a branco sobre vidro escuro.", "White print on dark glass."),
 "azeite-texto-negro-A": ("Texto em letras espaçadas impresso a branco sobre vidro preto.", "Widely spaced lettering printed in white on black glass."),
 "vinho-azul-floral-B": ("Padrão floral a duas cores com letras grandes sobre vidro.", "Two-colour floral pattern with large lettering on glass."),
 "vinho-ouro-preto-B": ("Impressão a preto e dourado sobre vidro.", "Black and gold print on glass."),
 "porcelana-cruz-caneca-A": ("Impressão a vermelho sobre porcelana branca.", "Red print on white porcelain."),
 "porcelana-ilustracao-caneca-B": ("Ilustração a várias cores sobre porcelana branca.", "Multicolour illustration on white porcelain."),
 "porcelana-passaro-caneca-B": ("Ilustração a preto sobre porcelana branca.", "Black illustration on white porcelain."),
 "porcelana-azulejo-A": ("Decoração a azul sobre peça de cerâmica, num estilo tradicional.", "Blue decoration on a ceramic piece, in a traditional style."),
 "copos-conhaque-serif-B": ("Texto serifado a preto sobre um copo de pé baixo.", "Black serif text on a short glass."),
 "tampas-dourada-B": ("Impressão no topo de uma tampa dourada.", "Print on the top of a gold cap."),
 "fabrica-paletes-B": ("Caixas embaladas em paletes, prontas para expedição.", "Boxes packed on pallets, ready to ship."),
}
def img(k, extra=""):
    return ('<img src="@@IMG:%s@@" data-ik="%s" alt="@@ALTPT:%s@@" data-alt-en="@@ALTEN:%s@@" width="@@W:%s@@" height="@@H:%s@@" loading="lazy" decoding="async">' % (k, k, k, k, k, k))
def fig(m):
    parts = m.group(1).split(":")
    key, cls = parts[0], parts[1]
    loupe = ""
    if len(parts) > 2:
        lk = parts[2]
        loupe = ('<div class="loupe">%s<span class="lp-l" data-i="loupe">Pormenor</span></div>' % img(lk))
    pt, en = CAPS[key]
    return ('<figure class="job" data-k="%s" data-cap-pt="%s" data-cap-en="%s">'
            '<div class="print"><div class="ph %s">%s</div>%s</div>'
            '<figcaption class="cap"><span class="jcap">%s</span><span class="src2" data-i="photo_tag">Foto Cergam, provisória</span>'
            '<span class="meta"><span data-i="jmeta">Cliente e quantidade:</span> <span class="tbc">a confirmar</span></span></figcaption></figure>'
            % (key, html.escape(pt, quote=True), html.escape(en, quote=True), cls, img(key), loupe, html.escape(pt)))
manifest = {i["file"][:-4]: i for i in json.load(open(CUR + "manifest.json", encoding="utf-8"))["items"]}
src = open(os.path.join(HERE, "i7b-src.html"), encoding="utf-8").read()
src = src.replace("@@LIB@@", lib)
# images shown on the inner pages carry no data of their own: <img data-use="key"> gets its src at run time from the home copy (data-ik), so each photo is embedded once
def use(m):
    k = m.group(1)
    return ('<img data-use="%s" alt="@@ALTPT:%s@@" data-alt-en="@@ALTEN:%s@@" width="@@W:%s@@" height="@@H:%s@@" loading="lazy" decoding="async">' % (k, k, k, k, k))
src = re.sub(r"@@USE:([^@]+)@@", use, src)
src = re.sub(r"@@FIG:([^@]+)@@", fig, src)
used = set(re.findall(r"@@IMG:([^@]+)@@", src))
for k in set(re.findall(r'data-use="([^"]+)"', src)):
    assert k in used, "data-use image without a home copy: " + k
total_img = 0
for name in sorted(used):
    m = manifest[name]
    data = open(CUR + name + ".jpg", "rb").read()
    total_img += len(data)
    w, h = [int(x) for x in m["size_px"].split("x")]
    uri = "data:image/jpeg;base64," + base64.b64encode(data).decode()
    src = src.replace("@@IMG:%s@@" % name, uri)
    src = src.replace("@@ALTPT:%s@@" % name, html.escape(m["alt_pt"], quote=True))
    src = src.replace("@@ALTEN:%s@@" % name, html.escape(m["alt_en"], quote=True))
    src = src.replace("@@W:%s@@" % name, str(w)).replace("@@H:%s@@" % name, str(h))
assert "@@" not in src, re.findall(r"@@[^@]{0,40}@@", src)[:5]
out = os.path.join(HERE, "i7b.html")
open(out, "w", encoding="utf-8").write(src)
assert len(src.encode()) < 3.5 * 1024 * 1024, "over 3.5 MB"
print("i7b.html %d KB (photos %d KB, %d images)" % (len(src.encode()) // 1024, total_img // 1024, len(used)))
