p='cergam-glass.js'; s=open('cergam-glass.orig.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)>=1,a[:70]
    s=s.replace(a,b,1)
# seams: abutting bands, crisp edges
rep("""if (k === 0) fa = -1.15; if (k === K - 1) fb = 1.15; else fb += 1.1 / K;
    out += '<polygon points="' + bandPoly(S, fa, fb, i0, i1) + '" fill="' + rgb(c) + '" fill-opacity="' + c[3].toFixed(3) + '"/>';""",
"""if (k === 0) fa = -1.15; if (k === K - 1) fb = 1.15; var solid = c[3] > 0.93; if (solid && k < K - 1) fb += 1.1 / K;
    out += '<polygon points="' + bandPoly(S, fa, fb, i0, i1) + '" fill="' + rgb(c) + '" fill-opacity="' + c[3].toFixed(3) + '"' + (solid ? '' : ' shape-rendering="crispEdges"') + '/>';""")
# less milky clear glass
rep("clear:  { name: 'Transparente', light: { c0: [140, 164, 160], a0: 0.11,","clear:  { name: 'Transparente', light: { c0: [150, 168, 166], a0: 0.045,")
rep("extra:  { name: 'Extra-branco',  light: { c0: [190, 204, 210], a0: 0.12,","extra:  { name: 'Extra-branco',  light: { c0: [196, 208, 214], a0: 0.04,")
rep("var wa = (porc ? 0.20 : (dark ? 0.16 : 0.27)) * sg * (1 + j3)","var wa = (porc ? 0.20 : (dark ? 0.16 : 0.15)) * sg * (1 + j3)")
rep("(dark ? 'rgba(180,215,235,.25)' : 'rgba(255,255,255,.35)')","(dark ? 'rgba(180,215,235,.25)' : 'rgba(255,255,255,.16)')")
# highlights no longer hide the decal: mask speculars over the print
rep("""  B += '<g clip-path="url(#' + id + 'sil)">' + SP + '</g>';

  /* open rim""","""  D += '<filter id="' + id + 'bk" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.74 0"/></filter>';
  D += '<mask id="' + id + 'sm" maskUnits="userSpaceOnUse" x="-200" y="-420" width="400" height="460"><rect x="-200" y="-420" width="400" height="460" fill="#fff"/><g filter="url(#' + id + 'bk)"><use href="#' + id + 'pg"/></g></mask>';
  B += '<g clip-path="url(#' + id + 'sil)"><g mask="url(#' + id + 'sm)">' + SP + '</g></g>';

  /* open rim""")
# caustic: attached to the foot, elongated, fading with the shadow
a=s.index("    if (!gl || !gl.opaque) {\n      var cc = mix(tintRGB")
b=s.index("    }\n  }\n  return { defs: D, body: B, Yf: Yf };")
new="""    if (!gl || !gl.opaque) {
      var cc = mix(tintRGB, [255, 255, 255], 0.55), cx = sgn * (r0 * 1.15 + len * 0.16);
      D += grad(id + 'cg', 'linear', 'gradientUnits="userSpaceOnUse" x1="' + n1(sgn * r0 * 0.7) + '" y1="0" x2="' + n1(sgn * (r0 * 1.15 + len * 0.45)) + '" y2="0"', [[0, rgb(cc), dark ? 0.34 : 0.40], [0.6, rgb(cc), dark ? 0.18 : 0.20], [1, rgb(cc), 0]]);
      B += '<ellipse cx="' + n1(cx) + '" cy="' + n1(Yf + 0.5) + '" rx="' + n1(r0 * 0.95 + len * 0.12) + '" ry="' + n1(e * r0 * 0.55 + 0.8) + '" fill="url(#' + id + 'cg)" filter="url(#' + id + 'ca)"/>';
"""
s=s[:a]+new+s[b:]
# paper backdrop
rep("var lum = b === 'studio' ? 0.9 :","var lum = (b === 'studio' || b === 'paper') ? 0.92 :")
rep("""  if (bd.type === 'studio') {
    D += grad(id + 'bg', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#d9d2c5']""","""  if (bd.type === 'paper') {
    D += grad(id + 'bg', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#EEE9DE'], [0.62, '#E8E2D5'], [1, '#DFD8C8']]);
    D += grad(id + 'fl', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#fff', 0], [0.4, '#fff', 0.22], [1, '#fffaf0', 0.12]]);
    D += grad(id + 'pool', 'radial', 'cx=".5" cy=".5" r=".5"', [[0, '#fffdf6', 0.55], [1, '#fffdf6', 0]]);
    B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'bg)"/>';
    B += '<ellipse cx="' + (w * 0.5) + '" cy="' + (fl - h * 0.30) + '" rx="' + (w * 0.66) + '" ry="' + (h * 0.42) + '" fill="url(#' + id + 'pool)"/>';
    B += '<rect y="' + (fl - h * 0.10) + '" width="' + w + '" height="' + (h - fl + h * 0.10) + '" fill="url(#' + id + 'fl)"/>';
  } else if (bd.type === 'studio') {
    D += grad(id + 'bg', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#d9d2c5']""")
rep("(bd.type === 'studio' ? 0.26 : 0.32)","(bd.type === 'studio' || bd.type === 'paper' ? 0.2 : 0.32)")
s=s.replace("'Inter', 'Helvetica Neue'","'IBM Plex Sans', 'Helvetica Neue'").replace("\\'Inter\\', \\'Helvetica Neue\\'","\\'IBM Plex Sans\\', \\'Helvetica Neue\\'")
open(p,'w',encoding='utf-8').write(s)
