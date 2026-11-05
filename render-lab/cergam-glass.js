/*! cergam-glass.js 1.0 | Rendered product imagery (CONCEPT ART, not photography) for glass and porcelain
   carrying a screen-printed, kiln-fired decal in the Cores Cergam. No dependencies. SVG output. */
(function (global) {
'use strict';

var COLOURS = [["C1","#221F20"],["C3","#929497"],["C4","#BBBDBF"],["C5","#DBDDDE"],["C6","#FEFEFE"],["C7","#C4AA78"],["C8","#551E11"],["C9","#A14726"],["C10","#CC936E"],["C11","#952A2E"],["C12","#D02129"],["C14","#F36E28"],["C15","#F3AD27"],["C16","#F4D033"],["C21","#1F5A32"],["C22","#00786E"],["C24","#318B40"],["C25","#9AC13B"],["C27","#68B9DD"],["C28","#5990CC"],["C29","#0087B4"],["C31","#003D6E"]];
var BYCODE = {}; COLOURS.forEach(function (c) { BYCODE[c[0]] = c[1]; });
var LABEL = 'Imagem de conceito, não fotografia';
var seq = 0;

/* ---------- small helpers ---------- */
function n1(v) { v = Math.round(v * 10) / 10; return v === 0 ? 0 : v; }
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
function hex2rgb(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
function col(c) { if (!c) return [34, 31, 32]; if (Array.isArray(c)) return c; var k = String(c).toUpperCase(); return hex2rgb(BYCODE[k] || c); }
function rgb(c) { return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')'; }
function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function lumOf(c) { return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function pstr(o) { var s = []; for (var i = 0; i < o.length; i++) s.push(n1(o[i][0]) + ',' + n1(o[i][1])); return s.join(' '); }
function grad(id, kind, attrs, stops) {
  var s = '<' + kind + 'Gradient id="' + id + '" ' + attrs + '>';
  stops.forEach(function (st) { s += '<stop offset="' + st[0] + '" stop-color="' + st[1] + '"' + (st[2] != null ? ' stop-opacity="' + st[2] + '"' : '') + '/>'; });
  return s + '</' + kind + 'Gradient>';
}
function jr(seed, k) { var x = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; }

/* ---------- profile builder (right-hand half, [r, y], y up from the floor) ---------- */
function prof(cmds) {
  var pts = [], cur = null;
  cmds.forEach(function (c) {
    var t = c[0], i, u;
    if (t === 'M') { cur = [c[1], c[2]]; pts.push(cur); }
    else if (t === 'L') { var l0 = cur, dl = Math.sqrt((c[1] - l0[0]) * (c[1] - l0[0]) + (c[2] - l0[1]) * (c[2] - l0[1])), nl = Math.max(1, Math.ceil(dl / 6)); for (i = 1; i <= nl; i++) { u = i / nl; pts.push([l0[0] + (c[1] - l0[0]) * u, l0[1] + (c[2] - l0[1]) * u]); } cur = [c[1], c[2]]; }
    else if (t === 'Q') { var p0 = cur; for (i = 1; i <= 9; i++) { u = i / 9; pts.push([(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * c[1] + u * u * c[3], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * c[2] + u * u * c[4]]); } cur = [c[3], c[4]]; }
    else if (t === 'C') { var q0 = cur; for (i = 1; i <= 16; i++) { u = i / 16; var v = 1 - u; pts.push([v * v * v * q0[0] + 3 * v * v * u * c[1] + 3 * v * u * u * c[3] + u * u * u * c[5], v * v * v * q0[1] + 3 * v * v * u * c[2] + 3 * v * u * u * c[4] + u * u * u * c[6]]); } cur = [c[5], c[6]]; }
  });
  return pts;
}
function rAt(pts, y) {
  for (var i = 1; i < pts.length; i++) {
    if (pts[i][1] >= y && pts[i][1] > pts[i - 1][1]) { var t = (y - pts[i - 1][1]) / (pts[i][1] - pts[i - 1][1]); return pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t; }
  }
  return pts[pts.length - 1][0];
}
function idxAt(pts, y, up) { // first index with y >= y (up) or last index with y <= y
  var i; if (up) { for (i = 0; i < pts.length; i++) if (pts[i][1] >= y) return i; return pts.length - 1; }
  for (i = pts.length - 1; i >= 0; i--) if (pts[i][1] <= y) return i; return 0;
}
function innerProfile(pts, t, baseT) {
  var out = [], n = pts.length, i;
  for (i = 0; i < n; i++) {
    var a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, n - 1)];
    var tx = b[0] - a[0], ty = b[1] - a[1], L = Math.sqrt(tx * tx + ty * ty) || 1; tx /= L; ty /= L;
    out.push([pts[i][0] - ty * t, pts[i][1] + tx * t]);
  }
  var res = [], prev = null;
  for (i = 0; i < out.length; i++) {
    if (out[i][1] >= baseT) {
      if (!res.length) { var r0 = prev ? prev[0] + (out[i][0] - prev[0]) * ((baseT - prev[1]) / ((out[i][1] - prev[1]) || 1)) : out[i][0]; res.push([r0, baseT]); }
      if (!res.length || out[i][1] >= res[res.length - 1][1] - 0.01) res.push(out[i]);
    }
    prev = out[i];
  }
  return res;
}
function upTo(pts, y) {
  var out = [];
  for (var i = 0; i < pts.length; i++) {
    if (pts[i][1] <= y) out.push(pts[i]);
    else { var p = pts[i - 1], t = (y - p[1]) / ((pts[i][1] - p[1]) || 1); out.push([p[0] + (pts[i][0] - p[0]) * t, y]); break; }
  }
  return out;
}

/* polygon between two fractions (-1 left edge .. 1 right edge) of the local radius */
function bandPoly(S, fa, fb, i0, i1) {
  var pts = S.pts, e = S.e, o = [], i, k, x;
  i0 = i0 || 0; i1 = (i1 == null) ? pts.length - 1 : i1;
  var cl = function (v) { return clamp(v, -1, 1); };
  for (i = i0; i <= i1; i++) o.push([fa * pts[i][0], -pts[i][1]]);
  var rt = pts[i1][0], yt = -pts[i1][1];
  if (i1 === pts.length - 1 && S.topArc !== false) { for (k = 0; k <= 6; k++) { x = fa + (fb - fa) * k / 6; o.push([x * rt, yt - e * rt * Math.sqrt(Math.max(0, 1 - cl(x) * cl(x)))]); } }
  for (i = i1; i >= i0; i--) o.push([fb * pts[i][0], -pts[i][1]]);
  if (i0 === 0) { var r0 = pts[0][0], yb = -pts[0][1]; for (k = 1; k < 6; k++) { x = fb + (fa - fb) * k / 6; o.push([x * r0, yb + (S.flatBottom ? 0.3 : 1) * e * r0 * Math.sqrt(Math.max(0, 1 - cl(x) * cl(x)))]); } }
  return pstr(o);
}
function bandSet(S, fn, K, i0, i1) {
  var out = '', k, fa, fb, c;
  for (k = 0; k < K; k++) {
    fa = -1 + 2 * k / K; fb = -1 + 2 * (k + 1) / K;
    c = fn(clamp((fa + fb) / 2, -1, 1)); if (c[3] < 0.004) continue;
    if (k === 0) fa = -1.15; if (k === K - 1) fb = 1.15; else fb += 1.1 / K;
    out += '<polygon points="' + bandPoly(S, fa, fb, i0, i1) + '" fill="' + rgb(c) + '" fill-opacity="' + c[3].toFixed(3) + '"/>';
  }
  return out;
}

/* ---------- glass, liquid and lighting parameter sets ---------- */
var GLASSES = {
  clear:  { name: 'Transparente', light: { c0: [140, 164, 160], a0: 0.11, c1: [18, 36, 36], a1: 0.80, ep: 3.4 }, dark: { c0: [186, 214, 226], a0: 0.06, c1: [205, 232, 244], a1: 0.34, ep: 7 }, gloss: 1 },
  extra:  { name: 'Extra-branco',  light: { c0: [190, 204, 210], a0: 0.12, c1: [40, 56, 64], a1: 0.62, ep: 3.8 }, dark: { c0: [225, 238, 248], a0: 0.04, c1: [236, 246, 255], a1: 0.28, ep: 7 }, gloss: 1.1 },
  frosted:{ name: 'Fosco', frost: true, light: { c0: [238, 242, 240], a0: 0.82, c1: [152, 168, 166], a1: 0.95, ep: 2.6 }, dark: { c0: [150, 166, 178], a0: 0.70, c1: [214, 226, 236], a1: 0.90, ep: 2.6 }, gloss: 0.3 },
  green:  { name: 'Verde escuro', light: { c0: [36, 100, 58], a0: 0.84, c1: [6, 24, 13], a1: 0.98, ep: 3.0 }, dark: { c0: [16, 58, 34], a0: 0.90, c1: [46, 108, 68], a1: 0.95, ep: 4 }, gloss: 1, liquidTint: [20, 70, 40] },
  amber:  { name: 'Âmbar', light: { c0: [150, 80, 20], a0: 0.86, c1: [38, 15, 3], a1: 0.98, ep: 3.0 }, dark: { c0: [100, 46, 8], a0: 0.90, c1: [180, 104, 32], a1: 0.95, ep: 4 }, gloss: 1, liquidTint: [110, 50, 8] },
  blue:   { name: 'Azul', light: { c0: [30, 84, 168], a0: 0.84, c1: [6, 20, 60], a1: 0.98, ep: 3.0 }, dark: { c0: [20, 56, 114], a0: 0.85, c1: [64, 126, 206], a1: 0.92, ep: 4 }, gloss: 1, liquidTint: [20, 60, 120] },
  porcelain: { name: 'Porcelana', opaque: true, gloss: 0.8 }
};
var LIQUIDS = {
  water: { name: 'Água', c0: [196, 228, 238], a0: 0.20, c1: [50, 98, 112], a1: 0.55, ep: 3, top: [214, 238, 246] },
  wine:  { name: 'Vinho tinto', c0: [104, 14, 36], a0: 0.97, c1: [30, 3, 10], a1: 0.99, ep: 2.4, top: [110, 18, 40] },
  oil:   { name: 'Azeite', c0: [226, 196, 48], a0: 0.86, c1: [104, 82, 8], a1: 0.96, ep: 2.6, top: [226, 200, 70] },
  gin:   { name: 'Gin', c0: [214, 234, 242], a0: 0.12, c1: [36, 74, 92], a1: 0.42, ep: 3.4, top: [226, 242, 248] },
  coffee:{ name: 'Café', c0: [74, 40, 22], a0: 1, c1: [34, 16, 8], a1: 1, ep: 2, top: [74, 40, 22] }
};
var LIGHTS = {
  daylight: { name: 'Luz do dia, esquerda', side: -1, key: [255, 255, 255], rim: [222, 234, 255], rimA: 0.30, warm: 0, sdx: 1, glow: 0 },
  backlit:  { name: 'Contraluz', side: 0, key: [255, 255, 255], rim: [255, 255, 255], rimA: 0.85, warm: 0, sdx: 0, glow: 1 },
  kiln:     { name: 'Brilho do forno', side: 1, key: [255, 226, 176], rim: [255, 150, 60], rimA: 0.75, warm: 1, sdx: -1, glow: 0.6 }
};

/* ---------- object catalogue ---------- */
function objSpec(name, o) {
  var S;
  switch (name) {
  case 'swing':
    S = { pts: prof([['M', 30, 0], ['Q', 36.5, 0, 36.5, 8], ['L', 35.6, 140], ['C', 35.3, 188, 14, 184, 13.6, 224], ['L', 13.6, 244], ['Q', 17.6, 246, 17.6, 252], ['L', 17.6, 262], ['Q', 17.6, 267, 14, 268]]),
      H: 268, e: 0.10, wallT: 2.4, baseT: 9, print: { y: 98, h: 118, w: 72 }, closure: 'swing', extra: 32, rings: [140, 215] };
    break;
  case 'carafe':
    S = { pts: prof([['M', 38, 0], ['Q', 44.5, 0, 44.5, 9], ['L', 44.5, 170], ['C', 44.5, 204, 33, 202, 33, 234], ['L', 33, 252], ['Q', 33, 266, 38.5, 280]]),
      H: 280, e: 0.11, wallT: 2.3, baseT: 12, print: { y: 100, h: 92, w: 90 }, closure: 'none', extra: 2, open: true, rings: [170, 236] };
    break;
  case 'bordeaux':
    S = { pts: prof([['M', 31, 0], ['Q', 37.5, 0, 37.5, 9], ['L', 37.5, 186], ['C', 37.5, 214, 14.6, 206, 14.6, 240], ['L', 14.6, 284], ['Q', 17.6, 284.5, 17.6, 289], ['L', 17.6, 296], ['Q', 17.6, 300, 15.2, 300]]),
      H: 300, e: 0.10, wallT: 2.6, baseT: 16, print: { y: 100, h: 112, w: 74 }, closure: 'capsule', extra: 4, rings: [186, 252] };
    break;
  case 'spirits':
    S = { pts: prof([['M', 31, 0], ['Q', 37.5, 0, 37.5, 8], ['L', 37.5, 168], ['C', 37.5, 177, 35.5, 182, 29, 185.5], ['L', 19, 190], ['Q', 14.6, 192, 14.6, 200], ['L', 14.6, 238], ['Q', 17.6, 239, 17.6, 244], ['L', 17.6, 250], ['Q', 17.6, 254, 15.4, 254]]),
      H: 254, e: 0.10, wallT: 3, baseT: 24, print: { y: 100, h: 100, w: 74 }, closure: 'bartop', extra: 36, rings: [168, 240] };
    break;
  case 'flask':
    S = { pts: prof([['M', 25, 0], ['Q', 32.5, 0, 32.5, 7], ['L', 32.5, 102], ['C', 32.5, 134, 16.4, 128, 16.2, 150], ['L', 16.2, 160], ['Q', 18, 161, 18, 165], ['L', 18, 167]]),
      H: 167, e: 0.11, wallT: 2.4, baseT: 10, print: { y: 62, h: 76, w: 64 }, closure: 'screw', extra: 26, rings: [102] };
    break;
  case 'oil': case 'oilsq':
    var sq = name === 'oilsq';
    S = { pts: sq ? prof([['M', 28, 0], ['Q', 32.5, 0, 33, 6], ['L', 33, 150], ['C', 33, 168, 18, 168, 14.2, 192], ['L', 14.2, 222], ['Q', 16.6, 223, 16.6, 228], ['L', 16.6, 232], ['Q', 16.6, 236, 14, 236]])
              : prof([['M', 26, 0], ['Q', 33.5, 0, 33.5, 8], ['L', 33.5, 138], ['C', 33.5, 176, 14, 170, 14, 206], ['L', 14, 222], ['Q', 16.6, 223, 16.6, 228], ['L', 16.6, 232], ['Q', 16.6, 236, 14, 236]]),
      H: 236, e: sq ? 0.07 : 0.10, wallT: 2.6, baseT: 12, print: { y: 82, h: 96, w: 64 }, closure: 'pourer', extra: 34, sq: sq, flatBottom: sq, rings: sq ? [] : [138] };
    break;
  case 'tumbler':
    S = { pts: prof([['M', 28.5, 0], ['Q', 30, 0, 30.4, 4], ['L', 36.8, 98], ['L', 37, 100]]),
      H: 100, e: 0.17, wallT: 2.1, baseT: 12, print: { y: 52, h: 50, w: 64 }, closure: 'none', extra: 4, open: true, rings: [] };
    break;
  case 'mug':
    S = { pts: prof([['M', 36, 0], ['Q', 39.5, 0, 39.8, 5], ['L', 41.4, 93], ['Q', 41.6, 95, 41.2, 95.5]]),
      H: 95.5, e: 0.20, wallT: 3.4, baseT: 7, print: { y: 48, h: 54, w: 76 }, closure: 'none', extra: 4, open: true, handle: 'mug', W: 2 * (41.5 + 36), rings: [] };
    break;
  case 'cup':
    S = { pts: prof([['M', 23, 0], ['L', 24.2, 5], ['C', 26, 24, 45, 28, 45.6, 62]]),
      H: 62, e: 0.22, wallT: 2.6, baseT: 5, print: { y: 36, h: 28, w: 70 }, closure: 'none', extra: 4, open: true, handle: 'cup', saucer: true, lift: 6, W: 2 * 80, rings: [], r0: 78 };
    break;
  default:
    throw new Error('CergamGlass: unknown object ' + name);
  }
  S.name = name; S.rt = S.pts[S.pts.length - 1][0]; S.top = true;
  S.maxR = 0; S.pts.forEach(function (p) { if (p[0] > S.maxR) S.maxR = p[0]; });
  S.W = S.W || 2 * S.maxR + 8; S.totalH = S.H + (S.extra || 0) + (S.lift || 0);
  S.r0 = S.r0 || S.pts[0][0];
  S.porcelainDefault = (name === 'mug' || name === 'cup');
  return S;
}

/* ---------- logo (decal artwork) ---------- */
var _cv;
function measure(text, font, fs) {
  try { _cv = _cv || document.createElement('canvas'); var c = _cv.getContext('2d'); c.font = font; return c.measureText(text).width; }
  catch (e) { return text.length * fs * 0.58; }
}
function buildLogo(o, cols, id) {
  var kind = o.logo || 'text';
  var c1 = rgb(cols[0]), c2 = rgb(cols[1]), c3 = rgb(cols[2]);
  var text = (o.text == null ? 'Quinta do Vale' : String(o.text));
  var font = o.font || "'Fraunces', Georgia, 'Times New Roman', serif";
  var g = '', w = 240, h = 240, cap = '';
  if (typeof kind === 'object' && kind.src) { kind = 'image'; }
  var capTxt = text.toUpperCase().slice(0, 22);
  var capSvg = function (y, size, fill, fam, ls) {
    return capTxt ? '<text x="0" y="' + y + '" text-anchor="middle" font-family="' + (fam || "'Inter', 'Helvetica Neue', Arial, sans-serif") + '" font-weight="700" font-size="' + size + '" letter-spacing="' + (ls == null ? 3 : ls) + '" fill="' + fill + '">' + esc(capTxt) + '</text>' : '';
  };
  if (kind === 'text') {
    var lines = text.split(/\n/).slice(0, 3); if (!lines[0]) lines = ['Logo'];
    var fs = 64, wt = o.fontWeight || 600, f1 = wt + ' ' + fs + 'px ' + font, maxw = 0;
    lines.forEach(function (l, i) { maxw = Math.max(maxw, measure(l, i ? '500 ' + (fs * 0.55) + 'px ' + font : f1, fs)); });
    var sc = maxw > 440 ? 440 / maxw : 1; fs *= sc;
    var y = 0, lh = fs * 1.12; h = lines.length === 1 ? fs * 1.3 : lh + (lines.length - 1) * fs * 0.62 + fs * 0.4;
    var top = -h / 2 + fs * 0.92;
    lines.forEach(function (l, i) {
      var sz = i ? fs * 0.55 : fs, yy = i ? top + lh * 0.2 + i * fs * 0.62 : top;
      g += '<text x="0" y="' + n1(yy) + '" text-anchor="middle" font-family="' + esc(font) + '" font-weight="' + (i ? 500 : wt) + '" font-size="' + n1(sz) + '" fill="' + (i ? c2 : c1) + '"' + (i ? ' letter-spacing="' + n1(sz * 0.12) + '"' : '') + '>' + esc(l) + '</text>';
    });
    w = Math.min(440, maxw * sc) + 24;
    if (o.colours && o.colours.length > 2) { g += '<rect x="' + n1(-w * 0.22) + '" y="' + n1(h / 2 - 2) + '" width="' + n1(w * 0.44) + '" height="' + n1(Math.max(3, fs * 0.07)) + '" rx="1" fill="' + c3 + '"/>'; h += fs * 0.18; }
  } else if (kind === 'geometric') {
    h = capTxt ? 262 : 200; var oy = capTxt ? -22 : 0;
    g = '<g transform="translate(0,' + oy + ')"><circle r="84" fill="none" stroke="' + c1 + '" stroke-width="14"/><path d="M0 -58 L54 34 L-54 34 Z" fill="' + c2 + '"/><circle cx="0" cy="-2" r="15" fill="' + c3 + '"/><rect x="-84" y="43" width="168" height="7" fill="' + c1 + '"/></g>' + capSvg(106, 25, c1);
  } else if (kind === 'script') {
    h = capTxt ? 262 : 214; var oy2 = capTxt ? -22 : 0;
    var ch = (text.trim().charAt(0) || 'M').toUpperCase();
    g = '<g transform="translate(0,' + oy2 + ')"><circle r="92" fill="none" stroke="' + c1 + '" stroke-width="4"/><circle r="80" fill="none" stroke="' + c2 + '" stroke-width="1.6"/><text x="0" y="46" text-anchor="middle" font-family="\'Pinyon Script\', \'Snell Roundhand\', \'Apple Chancery\', \'Brush Script MT\', cursive" font-size="148" fill="' + c1 + '">' + esc(ch) + '</text><path d="M-30 66 q14 -12 30 0 q16 12 30 0" fill="none" stroke="' + c3 + '" stroke-width="3" stroke-linecap="round"/></g>' + (capTxt ? '<text x="0" y="118" text-anchor="middle" font-family="\'Fraunces\', Georgia, serif" font-style="italic" font-size="25" letter-spacing="2.5" fill="' + c2 + '">' + esc(text.slice(0, 22)) + '</text>' : '');
  } else if (kind === 'line') {
    h = capTxt ? 262 : 214; var oy3 = capTxt ? -22 : 0;
    var leaves = '', k, st = [-84, 76, -30, 40, 78, -58];
    var sx0 = st[0], sy0 = st[1], cxs = st[2], cys = st[3], ex = st[4], ey = st[5];
    for (k = 1; k <= 7; k++) {
      var t = k / 8, mt = 1 - t;
      var px = mt * mt * sx0 + 2 * mt * t * cxs + t * t * ex, py = mt * mt * sy0 + 2 * mt * t * cys + t * t * ey;
      var dx = 2 * mt * (cxs - sx0) + 2 * t * (ex - cxs), dy = 2 * mt * (cys - sy0) + 2 * t * (ey - cys);
      var an = Math.atan2(dy, dx) * 180 / Math.PI, len = 34 - t * 8;
      [1, -1].forEach(function (sd) {
        if (k % 2 === (sd > 0 ? 0 : 1) || k === 7) leaves += '<path d="M0 0 Q' + n1(len * 0.45) + ' ' + n1(-len * 0.34) + ' ' + n1(len) + ' 0 Q' + n1(len * 0.45) + ' ' + n1(len * 0.34) + ' 0 0Z" transform="translate(' + n1(px) + ' ' + n1(py) + ') rotate(' + n1(an + sd * 48) + ')" fill="none" stroke="' + c1 + '" stroke-width="3.2" stroke-linejoin="round"/>';
      });
    }
    g = '<g transform="translate(0,' + oy3 + ')" stroke-linecap="round"><path d="M' + sx0 + ' ' + sy0 + ' Q' + cxs + ' ' + cys + ' ' + ex + ' ' + ey + '" fill="none" stroke="' + c1 + '" stroke-width="4"/>' + leaves + '<circle cx="-44" cy="62" r="11" fill="none" stroke="' + c2 + '" stroke-width="3.4"/><circle cx="-12" cy="76" r="11" fill="' + c3 + '"/><circle cx="26" cy="64" r="10" fill="none" stroke="' + c2 + '" stroke-width="3.4"/><path d="M-92 104 q23 -12 46 0 t46 0 t46 0 t46 0" fill="none" stroke="' + c2 + '" stroke-width="3"/></g>' + capSvg(128, 24, c1, null, 4);
  } else if (kind === 'crest') {
    h = capTxt ? 266 : 214; var oy4 = capTxt ? -24 : 0;
    var star = '', s0;
    for (s0 = 0; s0 < 10; s0++) { var rr = s0 % 2 ? 9 : 22, aa = -Math.PI / 2 + s0 * Math.PI / 5; star += n1(Math.cos(aa) * rr) + ',' + n1(Math.sin(aa) * rr - 34) + ' '; }
    g = '<g transform="translate(0,' + oy4 + ')"><circle r="94" fill="none" stroke="' + c1 + '" stroke-width="7"/><circle r="80" fill="none" stroke="' + c1 + '" stroke-width="2"/><polygon points="' + star + '" fill="' + c3 + '"/><path d="M-100 8 L-72 8 L-72 52 L-100 52 L-88 30 Z M100 8 L72 8 L72 52 L100 52 L88 30 Z" fill="none" stroke="' + c1 + '" stroke-width="3"/><rect x="-80" y="8" width="160" height="44" fill="none" stroke="' + c1 + '" stroke-width="3.2"/><text x="0" y="39" text-anchor="middle" font-family="\'Inter\', Arial, sans-serif" font-weight="700" font-size="20" letter-spacing="2" fill="' + c2 + '"' + ((capTxt ? Math.min(14, capTxt.length) : 10) * 17.5 > 150 ? ' textLength="150" lengthAdjust="spacingAndGlyphs"' : '') + '>' + esc(capTxt ? capTxt.slice(0, 14) : 'DESDE 1968') + '</text><path d="M-46 70 q46 22 92 0" fill="none" stroke="' + c3 + '" stroke-width="3.4" stroke-linecap="round"/></g>' + (capTxt ? '<text x="0" y="122" text-anchor="middle" font-family="\'Inter\', Arial, sans-serif" font-weight="600" font-size="19" letter-spacing="4" fill="' + c1 + '">QUALIDADE</text>' : '');
  } else if (kind === 'image') {
    var im = o.logo, aw = im.w || 1, ah = im.h || 1; w = 240; h = 240 * ah / aw; if (h > 300) { h = 300; w = 300 * aw / ah; }
    g = '<mask id="' + id + 'im" maskUnits="userSpaceOnUse" x="' + n1(-w / 2) + '" y="' + n1(-h / 2) + '" width="' + n1(w) + '" height="' + n1(h) + '"><image href="' + im.src + '" x="' + n1(-w / 2) + '" y="' + n1(-h / 2) + '" width="' + n1(w) + '" height="' + n1(h) + '" preserveAspectRatio="xMidYMid meet"/></mask><rect x="' + n1(-w / 2) + '" y="' + n1(-h / 2) + '" width="' + n1(w) + '" height="' + n1(h) + '" fill="' + c1 + '" mask="url(#' + id + 'im)"/>';
  }
  return { svg: g, w: w, h: h };
}

/* decal on a cylinder: vector strips with a horizontal curvature warp */
function printOnCylinder(lg, S, ctx, R, py, flat) {
  var id = ctx.id, e = S.e, s = Math.min(S.print.w / lg.w, S.print.h / lg.h) * (ctx.o.logoScale || 1);
  var D = '', G = '';
  D += '<g id="' + id + 'lg">' + lg.svg + '</g>';
  var uw = lg.w * s, Yc = -py;
  if (flat) {
    G = '<use href="#' + id + 'lg" transform="matrix(' + n1(s) + ',0,0,' + n1(s) + ',0,' + n1(Yc) + ')"/>';
    return { defs: D, group: G, R: R, flat: true };
  }
  var maxArc = R * 2.0; if (uw > maxArc) { s *= maxArc / uw; uw = maxArc; }
  var N = clamp(Math.ceil(uw / R * 57.3 / 3), 10, 60), j;
  for (j = 0; j < N; j++) {
    var u0 = -uw / 2 + uw * j / N, u1 = -uw / 2 + uw * (j + 1) / N, t0 = u0 / R, t1 = u1 / R;
    var X0 = R * Math.sin(t0), X1 = R * Math.sin(t1), a = u0 / s, b = u1 / s, kx = (X1 - X0) / (b - a);
    var tm = (t0 + t1) / 2, Xm = (X0 + X1) / 2, Ym = Yc + e * R * (Math.cos(tm) - 1), sl = -e * Math.tan(tm);
    var tx = X0 - a * kx, ty = Ym + sl * (tx - Xm), ov = 0.7 / Math.max(kx, 0.04);
    D += '<clipPath id="' + id + 'k' + j + '"><rect x="' + n1(a - ov) + '" y="' + n1(-lg.h) + '" width="' + n1(b - a + 2 * ov) + '" height="' + n1(lg.h * 2) + '"/></clipPath>';
    G += '<use href="#' + id + 'lg" clip-path="url(#' + id + 'k' + j + ')" transform="matrix(' + kx.toFixed(4) + ',' + (sl * kx).toFixed(4) + ',0,' + s.toFixed(4) + ',' + tx.toFixed(3) + ',' + ty.toFixed(3) + ')"/>';
  }
  return { defs: D, group: G, R: R };
}

/* enamel filter, edge shading and sheen for the decal */
function printLayers(pr, S, ctx, gl) {
  var id = ctx.id, LI = ctx.LI, R = pr.R, D = '', B = '';
  var gloss = gl.gloss != null ? gl.gloss : 1;
  var az = LI.side > 0 ? 315 : 225;
  D += '<g id="' + id + 'pg">' + pr.group + '</g>';
  D += '<filter id="' + id + 'en" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="1.15" result="b"/><feSpecularLighting in="b" surfaceScale="3" specularConstant="' + (0.6 * gloss).toFixed(2) + '" specularExponent="24" lighting-color="#ffffff" result="sp"><feDistantLight azimuth="' + az + '" elevation="52"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="s2"/><feOffset in="SourceAlpha" dx="' + (LI.side > 0 ? -0.5 : 0.5) + '" dy="0.6" result="o"/><feComposite in="o" in2="SourceAlpha" operator="out" result="rim"/><feColorMatrix in="rim" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" result="rimd"/><feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3="' + (0.34 * gloss + 0.06).toFixed(2) + '" k4="0" result="lit"/><feMerge><feMergeNode in="lit"/><feMergeNode in="rimd"/></feMerge></filter>';
  D += '<filter id="' + id + 'wh" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>';
  var lp = LI.side < 0 ? 0.30 : (LI.side > 0 ? 0.70 : 0.5);
  D += grad(id + 'ps', 'linear', 'gradientUnits="userSpaceOnUse" x1="' + n1(-R) + '" y1="0" x2="' + n1(R) + '" y2="0"', [
    [0, '#000', 0.55], [0.10, '#000', 0.32], [0.30, '#000', 0.05], [0.42, '#000', 0], [1, '#000', 0.55]
  ]).replace('</linearGradient>', '</linearGradient>');
  // rebuild with highlight band on the lit side
  D = D.replace(/<linearGradient id="[^"]*ps"[\s\S]*?<\/linearGradient>/, '');
  var st = [[0, '#000', 0.50], [0.10, '#000', 0.30], [0.28, '#000', 0.04]];
  if (LI.side === 0) { st.push([0.40, '#fff', 0.0], [0.5, '#fff', 0.10], [0.60, '#fff', 0.0], [0.72, '#000', 0.04]); }
  else { st.push([clamp(lp - 0.10, 0.3, 0.9), '#fff', 0.0], [lp, '#fff', 0.10 * gloss + 0.01], [lp + 0.10, '#fff', 0.0]); st.push([0.78, '#000', 0.05]); }
  st.push([0.90, '#000', 0.30], [1, '#000', 0.55]);
  st.sort(function (a, b) { return a[0] - b[0]; });
  D += grad(id + 'ps', 'linear', 'gradientUnits="userSpaceOnUse" x1="' + n1(-R) + '" y1="0" x2="' + n1(R) + '" y2="0"', st);
  D += '<mask id="' + id + 'pm" maskUnits="userSpaceOnUse" x="-200" y="-420" width="400" height="460"><g filter="url(#' + id + 'wh)"><use href="#' + id + 'pg"/></g></mask>';
  B += '<g filter="url(#' + id + 'en)"><use href="#' + id + 'pg"/></g>';
  B += '<g mask="url(#' + id + 'pm)"><rect x="-200" y="-420" width="400" height="460" fill="url(#' + id + 'ps)"/></g>';
  return { defs: D, body: B };
}

/* ---------- closures and hardware ---------- */
function metalGrad(id, base, side, extra) {
  var lit = side > 0 ? 1 : 0, bright = mix(base, [255, 255, 255], 0.65), dim = mix(base, [0, 0, 0], 0.5), mid = base;
  var st = [[0, rgb(dim)], [0.14, rgb(mid)], [0.30, rgb(bright)], [0.46, rgb(mid)], [0.82, rgb(mix(base, [0, 0, 0], 0.35))], [1, rgb(dim)]];
  if (lit) st = st.map(function (s) { return [1 - s[0], s[1]]; }).reverse();
  return grad(id, 'linear', 'x1="0" y1="0" x2="1" y2="0"', st);
}
function closure(S, ctx, glassRGB) {
  var id = ctx.id, side = ctx.LI.side, kind = ctx.o.closure || S.closure, D = '', B = '', H = S.H, rt = S.rt;
  if (ctx.o.closure === 'none' || kind === 'none') return { defs: '', body: '' };
  var cc = col(ctx.o.closureColour);
  var hasCC = !!ctx.o.closureColour;
  if (kind === 'swing') {
    D += metalGrad(id + 'cw', [244, 243, 238], side) + metalGrad(id + 'cr', hasCC ? cc : [196, 36, 43], side) + metalGrad(id + 'wi', [196, 200, 206], side);
    B += '<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-17.6,-250 C-27,-254 -26,-280 -13,-291 L13,-291 C26,-280 27,-254 17.6,-250" stroke="#2c3236" stroke-opacity=".5" stroke-width="2.6"/><path d="M-17.6,-250 C-27,-254 -26,-280 -13,-291 L13,-291 C26,-280 27,-254 17.6,-250" stroke="url(#' + id + 'wi)" stroke-width="1.7"/><path d="M-17,-251 C-29.5,-256.5 -28,-281 -14.5,-292" stroke="#fff" stroke-opacity=".8" stroke-width=".9"/></g>';
    B += '<path d="M-12.4,-268 L-12.4,-272.6 Q-12.4,-274 -11,-274 L11,-274 Q12.4,-274 12.4,-272.6 L12.4,-268 Q12.4,-266.6 11,-266.6 L-11,-266.6 Q-12.4,-266.6 -12.4,-268Z" fill="url(#' + id + 'cr)"/>';
    B += '<path d="M-10.8,-273 L-10.8,-292 Q-10.8,-298 -5,-298 L5,-298 Q10.8,-298 10.8,-292 L10.8,-273Z" fill="url(#' + id + 'cw)"/><path d="M-7,-296 C-7,-309 7,-309 7,-296" fill="none" stroke="#9aa0a8" stroke-width="2.2" stroke-linecap="round"/><path d="M-6.4,-296.5 C-6.4,-307.5 5.6,-307.5 5.6,-297" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/>';
  } else if (kind === 'capsule') {
    var capc = hasCC ? cc : [38, 36, 40];
    D += metalGrad(id + 'cp', capc, side);
    B += '<path d="M-' + n1(rt + 0.8) + ',-' + (H - 40) + ' L-' + n1(rt + 0.8) + ',-' + (H + 2) + ' Q-' + n1(rt + 0.8) + ',-' + (H + 4.4) + ' -' + n1(rt - 2) + ',-' + (H + 4.4) + ' L' + n1(rt - 2) + ',-' + (H + 4.4) + ' Q' + n1(rt + 0.8) + ',-' + (H + 4.4) + ' ' + n1(rt + 0.8) + ',-' + (H + 2) + ' L' + n1(rt + 0.8) + ',-' + (H - 40) + ' Q0,-' + (H - 36) + ' -' + n1(rt + 0.8) + ',-' + (H - 40) + 'Z" fill="url(#' + id + 'cp)"/>';
    B += '<ellipse cx="0" cy="-' + (H + 3.2) + '" rx="' + n1(rt - 0.8) + '" ry="' + n1(S.e * rt) + '" fill="' + rgb(mix(capc, [255, 255, 255], 0.18)) + '"/>';
    B += '<rect x="-' + n1(rt + 0.8) + '" y="-' + (H - 35) + '" width="' + n1(2 * rt + 1.6) + '" height="1.2" fill="#000" fill-opacity=".35"/>';
  } else if (kind === 'bartop') {
    var hc = hasCC ? cc : [24, 22, 24];
    D += metalGrad(id + 'bt', hc, side) + metalGrad(id + 'bk', [196, 160, 98], side) + metalGrad(id + 'bs', [196, 170, 120], side);
    B += '<rect x="-8.6" y="-' + (H + 12) + '" width="17.2" height="12" fill="url(#' + id + 'bs)"/>';
    B += '<path d="M-14,-' + (H + 10) + ' L-14,-' + (H + 32) + ' Q-14,-' + (H + 36) + ' -10,-' + (H + 36) + ' L10,-' + (H + 36) + ' Q14,-' + (H + 36) + ' 14,-' + (H + 32) + ' L14,-' + (H + 10) + ' Q0,-' + (H + 7) + ' -14,-' + (H + 10) + 'Z" fill="url(#' + id + 'bt)"/>';
    B += '<path d="M-14.2,-' + (H + 10.5) + ' Q0,-' + (H + 7.5) + ' 14.2,-' + (H + 10.5) + ' L14.2,-' + (H + 14) + ' Q0,-' + (H + 11) + ' -14.2,-' + (H + 14) + 'Z" fill="url(#' + id + 'bk)"/>';
    B += '<rect x="-12.4" y="-' + (H + 33) + '" width="2.2" height="18" rx="1.1" fill="#fff" fill-opacity=".32"/>';
  } else if (kind === 'screw') {
    var sc = hasCC ? cc : [186, 190, 198];
    D += metalGrad(id + 'sc', sc, side);
    var kn = ''; for (var q = -15; q <= 15; q += 3) kn += '<rect x="' + q + '" y="-' + (H + 22) + '" width=".7" height="20" fill="#000" fill-opacity=".22"/>';
    B += '<path d="M-18.6,-' + (H - 4) + ' L-18.6,-' + (H + 24) + ' Q-18.6,-' + (H + 26) + ' -16,-' + (H + 26) + ' L16,-' + (H + 26) + ' Q18.6,-' + (H + 26) + ' 18.6,-' + (H + 24) + ' L18.6,-' + (H - 4) + ' Q0,-' + (H - 7.5) + ' -18.6,-' + (H - 4) + 'Z" fill="url(#' + id + 'sc)"/>' + '<g clip-path="inset(0)">' + kn + '</g>' + '<ellipse cx="0" cy="-' + (H + 25.4) + '" rx="16.4" ry="1.9" fill="' + rgb(mix(sc, [255, 255, 255], 0.5)) + '"/><rect x="-18.6" y="-' + (H + 3) + '" width="37.2" height="1.4" fill="#000" fill-opacity=".3"/>';
  } else if (kind === 'pourer') {
    var pc = hasCC ? cc : [176, 180, 188];
    D += metalGrad(id + 'pc', pc, side);
    B += '<path d="M-17.4,-' + (H - 12) + ' L-17.4,-' + (H + 8) + ' L-15,-' + (H + 10) + ' L-15,-' + (H + 16) + ' L-9.5,-' + (H + 29) + ' Q-8,-' + (H + 32) + ' -4.6,-' + (H + 33.4) + ' L4.6,-' + (H + 33.4) + ' Q8,-' + (H + 32) + ' 9.5,-' + (H + 29) + ' L15,-' + (H + 16) + ' L15,-' + (H + 10) + ' L17.4,-' + (H + 8) + ' L17.4,-' + (H - 12) + ' Q0,-' + (H - 15.5) + ' -17.4,-' + (H - 12) + 'Z" fill="url(#' + id + 'pc)"/>';
    B += '<rect x="-17.4" y="-' + (H + 8.6) + '" width="34.8" height="1.2" fill="#000" fill-opacity=".35"/><rect x="-15" y="-' + (H + 16.4) + '" width="30" height="1" fill="#000" fill-opacity=".28"/><ellipse cx="0" cy="-' + (H + 33.2) + '" rx="4.6" ry="1.1" fill="#2a2d30"/>';
    B += '<path d="M-17.4,-' + (H - 12) + ' Q0,-' + (H - 15.5) + ' 17.4,-' + (H - 12) + '" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1"/>';
  }
  return { defs: D, body: B };
}

/* ---------- the glass or porcelain revolve object ---------- */
function revolve(S, ctx) {
  var o = ctx.o, id = ctx.id, LI = ctx.LI, dark = ctx.dark, jit = ctx.jit || 0, e = S.e, H = S.H;
  var gname = o.glass || (S.porcelainDefault ? 'porcelain' : 'clear');
  if (S.name === 'plate') gname = 'porcelain';
  var gl = GLASSES[gname] || GLASSES.clear, porc = !!gl.opaque, frost = !!gl.frost;
  var D = '', B = '', side = LI.side, ls = side === 0 ? -1 : side;
  var sil = bandPoly(S, -1, 1);
  var inn = innerProfile(S.pts, S.wallT, S.baseT);
  var ri0 = inn[0][0], rin = inn[inn.length - 1][0];
  D += '<clipPath id="' + id + 'sil"><polygon points="' + sil + '"/></clipPath>';
  D += '<filter id="' + id + 'bl" x="-8%" y="-4%" width="116%" height="108%"><feGaussianBlur stdDeviation="' + (frost ? 1.6 : 0.8) + '"/></filter>';
  D += '<filter id="' + id + 'b2" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="' + (frost ? 4.5 : 2.6) + '"/></filter>';
  D += '<filter id="' + id + 'b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0.5"/></filter>';
  var keyC = rgb(LI.key);

  /* hardware behind the body (handles) */
  var handleMarkup = '';
  if (S.handle) {
    var hc = porc ? [238, 233, 223] : [196, 218, 214];
    var hp = S.handle === 'mug' ? 'M40.4,-74 C80,-80 82,-18 38.6,-22' : 'M44.2,-48 C70,-54 68,-14 38,-18';
    var hw = S.handle === 'mug' ? 11 : 7.5;
    var hl = side > 0 ? -1 : 1;
    handleMarkup = '<g fill="none" stroke-linecap="round"><path d="' + hp + '" stroke="' + (porc ? '#a89f8e' : 'rgba(40,66,64,.7)') + '" stroke-width="' + (hw + 1.8) + '"/><path d="' + hp + '" stroke="' + (porc ? '#ece7dc' : 'rgba(' + hc.join(',') + ',.55)') + '" stroke-width="' + hw + '"/><path d="' + hp + '" stroke="#fff" stroke-opacity="' + (porc ? 0.8 : 0.7) + '" stroke-width="' + (hw * 0.28) + '" transform="translate(' + (-1.4 * hl) + ',-1.5)"/><path d="' + hp + '" stroke="#000" stroke-opacity="' + (porc ? 0.12 : 0.1) + '" stroke-width="' + (hw * 0.3) + '" transform="translate(' + (1.8 * hl) + ',1.8)"/></g>';
  }

  /* body shading */
  var fnBody;
  if (porc) {
    var lp = side < 0 ? -0.42 : (side > 0 ? 0.42 : 0);
    fnBody = function (x) {
      var d = Math.abs(x - lp), t = smooth(0.12, 1.4, d);
      var c = mix([252, 250, 245], [233, 228, 218], Math.min(1, t * 1.7)); c = mix(c, [166, 158, 146], Math.max(0, t - 0.45) / 0.55 * 0.82);
      if (x * lp <= 0 && Math.abs(x) > 0.7) c = mix(c, [212, 205, 192], 0.40 * smooth(0.7, 1, Math.abs(x)));
      if (Math.abs(x) > 0.9) c = mix(c, [214, 208, 196], 0.22 * smooth(0.9, 1, Math.abs(x)));
      if (LI.warm) c = mix(c, [255, 208, 150], 0.26);
      if (LI.glow && side === 0) c = mix(c, [255, 255, 255], 0.16);
      return c.concat(1);
    };
  } else {
    var gp = dark ? gl.dark : gl.light;
    var ep = gp.ep, c0 = gp.c0, c1 = gp.c1, a0 = gp.a0, a1 = gp.a1;
    var thick = a0 > 0.5;
    if (LI.glow && side === 0) { a0 *= thick ? 0.55 : 0.7; c0 = mix(c0, [255, 255, 255], thick ? 0.28 : 0.2); }
    if (LI.warm) { c0 = mix(c0, [255, 190, 110], thick ? 0.12 : 0.25); c1 = mix(c1, [90, 40, 10], 0.18); }
    fnBody = function (x) {
      var ax = Math.abs(x), xx = ax;
      if (S.sq) xx = ax < 0.8 ? ax * 0.25 : 0.2 + (ax - 0.8) / 0.2 * 0.8;
      var t = Math.pow(xx, ep), a = a0 + (a1 - a0) * t, c = mix(c0, c1, Math.pow(xx, ep * 0.55));
      var amp = thick ? 0.5 : 1;
      /* dark environment reflections beside the bright streaks give the cylinder its volume */
      var bump = function (cx, w, h) { var q = (x - cx) / w; return h * Math.exp(-q * q); };
      var dk = 0;
      if (S.sq) { dk = 0; }
      else if (side === 0) { dk = bump(-0.80, 0.11, 0.32) + bump(0.80, 0.11, 0.32) + bump(-0.40, 0.12, 0.10) + bump(0.40, 0.12, 0.10); }
      else { dk = bump(ls * 0.83, 0.09, 0.30) + bump(-ls * 0.50, 0.17, 0.24) + bump(-ls * 0.88, 0.07, 0.34) + bump(ls * 0.30, 0.10, 0.08); }
      a += dk * amp * (1 - a * 0.6); c = mix(c, c1, clamp(dk * amp * 1.4, 0, 0.9));
      if (side !== 0) { var lit = x * ls > 0 ? 1 : 0; c = mix(c, [255, 255, 255], (lit ? 0.10 : 0) * smooth(0, 0.9, ax) * (thick ? 0.4 : 1)); }
      return c.concat(clamp(a, 0, 1));
    };
  }
  B += '<g clip-path="url(#' + id + 'sil)"><g filter="url(#' + id + 'bl)">' + bandSet(S, fnBody, 26) + '</g></g>';

  /* frosted grain */
  if (frost) {
    D += '<filter id="' + id + 'gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.6 1.15"/></filter>';
    B += '<g clip-path="url(#' + id + 'sil)" opacity=".42"><rect x="-60" y="-' + (H + 20) + '" width="120" height="' + (H + 40) + '" fill="#fff" filter="url(#' + id + 'gr)"/></g>';
  }

  /* open vessel: interior seen through the rim */
  if (S.open && !S.handle) {
    var ei = S.e * S.rt;
    B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(S.rt - 0.3) + '" ry="' + n1(ei) + '" fill="' + (dark ? 'rgba(10,20,34,.35)' : 'rgba(40,60,58,.14)') + '"/>';
  }

  /* liquid */
  var liq = (o.liquid && o.liquid !== 'none') ? LIQUIDS[o.liquid] : null;
  if (S.name === 'mug' || S.name === 'cup') { liq = (o.liquid === 'coffee' || o.liquid === true) ? LIQUIDS.coffee : null; }
  if (liq && !porc) {
    var fillF = o.fill == null ? 0.72 : o.fill;
    var fy = S.baseT + (inn[inn.length - 1][1] - S.baseT) * fillF;
    if (S.name === 'bordeaux' || S.name === 'spirits' || S.name === 'swing' || S.name === 'oil' || S.name === 'oilsq' || S.name === 'flask') fy = S.baseT + (innerAtTopCap(inn) - S.baseT) * fillF;
    var lp2 = upTo(inn, fy), LS = { pts: lp2, e: e, rt: lp2[lp2.length - 1][0], flatBottom: S.flatBottom };
    var lc0 = liq.c0, lc1 = liq.c1, la0 = liq.a0, la1 = liq.a1;
    if (gl.liquidTint && o.liquid !== 'gin') { lc0 = mix(lc0, gl.liquidTint, 0.5); }
    if (LI.glow && side === 0) { lc0 = mix(lc0, [255, 255, 255], 0.18); la0 *= 0.85; }
    var lfn = function (x) { var ax = Math.abs(x), a = la0 + (la1 - la0) * Math.pow(ax, liq.ep); return mix(lc0, lc1, Math.pow(ax, liq.ep * 0.7)).concat(clamp(a * (side !== 0 && x * ls > 0 ? 0.88 : 1), 0, 1)); };
    var lr = lp2[lp2.length - 1][0], fyS = -fy;
    B += '<g clip-path="url(#' + id + 'sil)"><g filter="url(#' + id + 'bl)">' + bandSet(LS, lfn, 16) + '</g></g>';
    B += '<ellipse cx="0" cy="' + n1(fyS) + '" rx="' + n1(lr) + '" ry="' + n1(e * lr) + '" fill="' + rgb(liq.top) + '" fill-opacity="' + (o.liquid === 'wine' || o.liquid === 'oil' ? 0.55 : 0.30) + '"/>';
    B += '<path d="M' + n1(-lr) + ',' + n1(fyS) + ' A' + n1(lr) + ',' + n1(e * lr) + ' 0 0 0 ' + n1(lr) + ',' + n1(fyS) + '" fill="none" stroke="#fff" stroke-opacity="' + (dark ? 0.7 : 0.75) + '" stroke-width="1.1"/>';
    B += '<path d="M' + n1(-lr * 0.9) + ',' + n1(fyS + 1.5) + ' A' + n1(lr * 0.9) + ',' + n1(e * lr * 0.9) + ' 0 0 0 ' + n1(lr * 0.9) + ',' + n1(fyS + 1.5) + '" fill="none" stroke="' + rgb(liq.c1) + '" stroke-opacity=".35" stroke-width="2.4" filter="url(#' + id + 'b3)"/>';
  } else if (liq && porc && S.open) {
    var ly = S.H - 6, lrr = rAt(inn, ly);
    B += '<ellipse cx="0" cy="-' + ly + '" rx="' + n1(lrr) + '" ry="' + n1(e * lrr) + '" fill="url(#' + id + 'cf)"/>';
    D += grad(id + 'cf', 'radial', 'cx=".42" cy=".35" r=".7"', [[0, '#6a3b22'], [1, '#2b140a']]);
    B += '<ellipse cx="' + n1(-lrr * 0.35 * ls * -1) + '" cy="-' + (ly + 0.5) + '" rx="' + n1(lrr * 0.5) + '" ry="' + n1(e * lrr * 0.28) + '" fill="#fff" fill-opacity=".22" filter="url(#' + id + 'b3)"/>';
  }
  function innerAtTopCap(ip) { var k = ip.length - 1; while (k > 0 && ip[k][0] < ip[0][0] * 0.62) k--; return ip[k][1]; }

  /* base thickness, refraction ring */
  if (!porc || frost) { /* frost keeps rings soft */ }
  if (!porc) {
    var tintRing = dark ? '#cfe6f4' : '#ffffff';
    var bj = 1 + jr(jit, 5) * 0.05;
    D += grad(id + 'bg', 'radial', 'cx=".5" cy=".5" r=".5"', [[0, '#fff', (frost ? 0.18 : 0.46) * bj], [0.7, '#fff', frost ? 0.04 : 0.12], [1, '#fff', 0]]);
    B += '<g clip-path="url(#' + id + 'sil)">';
    B += '<ellipse cx="0" cy="-' + S.baseT + '" rx="' + n1(ri0 * 0.97) + '" ry="' + n1(e * ri0 * 0.97) + '" fill="url(#' + id + 'bg)"/>';
    B += '<polygon points="' + bandPoly(S, -1.2, 1.2, 0, Math.max(1, idxAt(S.pts, S.baseT, false))) + '" fill="#fff" fill-opacity="' + (dark ? 0.10 : 0.16) + '"/>';
    B += '<path d="M' + n1(-ri0) + ',-' + S.baseT + ' A' + n1(ri0) + ',' + n1(e * ri0) + ' 0 0 0 ' + n1(ri0) + ',-' + S.baseT + '" fill="none" stroke="' + (dark ? '#000' : '#10201e') + '" stroke-opacity="' + (dark ? 0.18 : 0.12) + '" stroke-width="2.4" transform="translate(0,-1.8)" filter="url(#' + id + 'b3)"/>';
    B += '<path d="M' + n1(-ri0) + ',-' + S.baseT + ' A' + n1(ri0) + ',' + n1(e * ri0) + ' 0 0 0 ' + n1(ri0) + ',-' + S.baseT + '" fill="none" stroke="' + tintRing + '" stroke-opacity="' + (frost ? 0.35 : 0.85 * bj) + '" stroke-width="1.3"/>';
    B += '<path d="M' + n1(-ri0 * 1.04) + ',-' + (S.baseT - 2.4) + ' A' + n1(ri0 * 1.04) + ',' + n1(e * ri0 * 1.04) + ' 0 0 0 ' + n1(ri0 * 1.04) + ',-' + (S.baseT - 2.4) + '" fill="none" stroke="' + tintRing + '" stroke-opacity=".30" stroke-width="2.6" filter="url(#' + id + 'b3)"/>';
    var r0 = S.pts[0][0];
    B += '<path d="M' + n1(-r0) + ',0 A' + n1(r0) + ',' + n1((S.flatBottom ? 0.3 : 1) * e * r0) + ' 0 0 0 ' + n1(r0) + ',0" fill="none" stroke="' + tintRing + '" stroke-opacity="' + (dark ? 0.65 : 0.5) + '" stroke-width="1.5"/>';
    B += '</g>';
  }

  /* shoulder / neck rings that sell the roundness */
  (S.rings || []).forEach(function (ry) {
    var rr = rAt(S.pts, ry);
    B += '<path d="M' + n1(-rr) + ',-' + ry + ' A' + n1(rr) + ',' + n1(e * rr) + ' 0 0 0 ' + n1(rr) + ',-' + ry + '" fill="none" stroke="#fff" stroke-opacity="' + (porc ? 0.12 : (dark ? 0.18 : 0.26)) + '" stroke-width="1.2" clip-path="url(#' + id + 'sil)" filter="url(#' + id + 'b3)"/>';
  });

  /* inner wall lines */
  if (!porc) {
    var rp = '', lpp = '';
    inn.forEach(function (p, i) { rp += (i ? 'L' : 'M') + n1(p[0]) + ',' + n1(-p[1]) + ' '; lpp += (i ? 'L' : 'M') + n1(-p[0]) + ',' + n1(-p[1]) + ' '; });
    var litLeft = ls < 0, lc = litLeft ? lpp : rp, dc = litLeft ? rp : lpp;
    B += '<g fill="none" clip-path="url(#' + id + 'sil)"><path d="' + lc + '" stroke="#fff" stroke-opacity="' + (dark ? 0.5 : 0.62) + '" stroke-width="1.1"/><path d="' + dc + '" stroke="' + (dark ? '#d8ecfa' : '#0e1c1a') + '" stroke-opacity="' + (dark ? 0.28 : 0.30) + '" stroke-width="1"/></g>';
  }

  /* decal */
  var py = S.print.y, R = rAt(S.pts, py);
  var lg = buildLogo(o, ctx.cols, id);
  var pr = printOnCylinder(lg, S, ctx, R, py, !!S.sq);
  var pl = printLayers(pr, S, ctx, gl);
  D += pr.defs + pl.defs; B += pl.body;

  /* outer contour */
  var cont = '';
  var rr0 = [], ll0 = [];
  S.pts.forEach(function (p, i) { rr0.push((i ? 'L' : 'M') + n1(p[0]) + ',' + n1(-p[1])); ll0.push((i ? 'L' : 'M') + n1(-p[0]) + ',' + n1(-p[1])); });
  var cstr = porc ? '#8b8272' : (dark ? '#e8f4ff' : '#1a2a28');
  var cop = porc ? 0.35 : (dark ? 0.42 : 0.55);
  B += '<g fill="none" stroke="' + cstr + '" stroke-width=".9" stroke-opacity="' + cop + '"><path d="' + rr0.join('') + '"/><path d="' + ll0.join('') + '"/></g>';

  /* speculars and window-box reflection */
  var j1 = jr(jit, 1) * 0.022, j2 = jr(jit, 2) * 0.08, j3 = jr(jit, 3) * 0.1;
  var y0 = S.baseT + (S.sy0 || 8), y1 = S.H - (S.sy1 || (S.open ? 4 : 16));
  if (S.name === 'bordeaux' || S.name === 'spirits' || S.name === 'oil' || S.name === 'oilsq' || S.name === 'swing' || S.name === 'flask') y1 = S.H - 8;
  var i0 = idxAt(S.pts, y0, true), i1 = idxAt(S.pts, y1, false);
  if (i1 <= i0 + 1) i1 = Math.min(S.pts.length - 1, i0 + 3);
  var sg = gl.gloss != null ? gl.gloss : 1, spA = porc ? 0.55 : (frost ? 0.5 : 0.82);
  var vTop = -S.pts[i1][1], vBot = -S.pts[i0][1];
  var fadeG = function (gid, a) { return grad(gid, 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(vTop) + '" x2="0" y2="' + n1(vBot) + '"', [[0, keyC, 0], [0.07, keyC, a], [0.80, keyC, a], [1, keyC, 0]]); };
  var SP = '', sgn = ls < 0 ? -1 : 1;
  var streak = function (fa, fb, a, gid, extra) { D += fadeG(gid, a); return '<polygon points="' + bandPoly(S, fa, fb, i0, i1) + '" fill="url(#' + gid + ')"' + (extra || '') + '/>'; };
  var kA = (porc ? 0.62 : 1) * sg;
  if (side === 0) {
    SP += streak(-0.74 + j1, -0.60 + j1, spA * 0.8 * kA, id + 's1', '');
    SP += streak(0.60 - j1, 0.74 - j1, spA * 0.8 * kA, id + 's2', '');
    SP += streak(-0.12, 0.12, spA * 0.22 * kA, id + 's3', ' filter="url(#' + id + 'b2)"');
  } else {
    SP += streak(sgn * (0.50 + j1), sgn * (0.66 + j1), spA * (1 + j2) * kA, id + 's1', '');
    SP += streak(sgn * (0.36 + j1), sgn * (0.41 + j1), spA * 0.38 * kA, id + 's4', '');
    SP += streak(-sgn * 0.80, -sgn * 0.74, spA * 0.42 * kA, id + 's2', ' filter="url(#' + id + 'b3)"');
    SP += streak(sgn * 0.86, sgn * 0.20, spA * 0.07 * kA, id + 's3', ' filter="url(#' + id + 'b2)"');
  }
  // window-box reflection
  var wy0 = S.baseT + (S.H - S.baseT) * 0.28, wy1 = S.baseT + (S.H - S.baseT) * (S.sq ? 0.62 : 0.62);
  if (S.name === 'tumbler' || S.name === 'mug' || S.name === 'cup' || S.name === 'carafe') { wy0 = S.baseT + (S.H - S.baseT) * 0.22; wy1 = S.baseT + (S.H - S.baseT) * 0.78; }
  var wi0 = idxAt(S.pts, wy0, true), wi1 = idxAt(S.pts, wy1, false);
  if (wi1 > wi0 + 1 && !(S.sq)) {
    var wa = (porc ? 0.20 : (dark ? 0.16 : 0.27)) * sg * (1 + j3), wsgn = side === 0 ? -1 : sgn;
    var panes = '', rows = 3, cols2 = [[0.10, 0.28], [0.32, 0.48]], rr, cc2;
    var ywA = S.pts[wi0][1], ywB = S.pts[wi1][1], gap = 2.6, ph = (ywB - ywA - gap * (rows - 1)) / rows;
    for (rr = 0; rr < rows; rr++) {
      var pa = ywA + rr * (ph + gap), pb = pa + ph, ia = idxAt(S.pts, pa, true), ib = idxAt(S.pts, pb, false);
      if (ib <= ia) continue;
      for (cc2 = 0; cc2 < 2; cc2++) { var f0 = wsgn * cols2[cc2][0], f1 = wsgn * cols2[cc2][1]; panes += '<polygon points="' + bandPoly(S, Math.min(f0, f1), Math.max(f0, f1), ia, ib) + '"/>'; }
    }
    var wg = id + 'wg';
    D += grad(wg, 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(-ywB) + '" x2="0" y2="' + n1(-ywA) + '"', [[0, keyC, wa * 0.55], [0.5, keyC, wa], [1, keyC, wa * 0.3]]);
    SP += '<g filter="url(#' + id + 'b3)" fill="url(#' + wg + ')">' + panes + '</g>';
  } else if (S.sq) {
    var sq0 = S.baseT + 20, sq1 = S.H - 50;
    D += grad(id + 'sqg', 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + -sq1 + '" x2="0" y2="' + -sq0 + '"', [[0, keyC, 0], [0.1, keyC, 0.28 * sg], [0.9, keyC, 0.28 * sg], [1, keyC, 0]]);
    SP += '<rect x="' + n1(sgn * 6 - (sgn > 0 ? 0 : 12)) + '" y="' + -sq1 + '" width="12" height="' + (sq1 - sq0) + '" fill="url(#' + id + 'sqg)" filter="url(#' + id + 'b3)"/>';
    SP += '<rect x="' + n1(-sgn * 29) + '" y="' + -sq1 + '" width="2.4" height="' + (sq1 - sq0) + '" fill="#fff" fill-opacity=".55"/>';
  }
  // rim-light on the shadow side (colour from lighting preset)
  var rimC = rgb(LI.rim), rimA = LI.rimA * (porc ? 0.5 : 1);
  var rside = side === 0 ? 0 : -sgn;
  D += grad(id + 'rg', 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(vTop) + '" x2="0" y2="' + n1(vBot) + '"', [[0, rimC, 0], [0.1, rimC, rimA], [0.9, rimC, rimA], [1, rimC, 0]]);
  if (side === 0) {
    SP += '<polygon points="' + bandPoly(S, -0.99, -0.90, i0, i1) + '" fill="url(#' + id + 'rg)"/><polygon points="' + bandPoly(S, 0.90, 0.99, i0, i1) + '" fill="url(#' + id + 'rg)"/>';
  } else {
    SP += '<polygon points="' + bandPoly(S, rside * 0.985, rside * 0.89, i0, i1) + '" fill="url(#' + id + 'rg)"/>';
  }
  B += '<g clip-path="url(#' + id + 'sil)">' + SP + '</g>';

  /* open rim or bottle lip */
  var rt = S.rt, ri = S.e * rt;
  if (S.open) {
    var rimop = porc ? 1 : (dark ? 0.8 : 0.9);
    if (porc) {
      var wr = rt - S.wallT;
      B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt) + '" ry="' + n1(ri) + '" fill="#f6f3ec"/>';
      B += '<ellipse cx="0" cy="-' + (H - 0.2) + '" rx="' + n1(wr) + '" ry="' + n1(e * wr) + '" fill="url(#' + id + 'in)"/>';
      D += grad(id + 'in', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#bdb5a6'], [0.55, '#e4dfd3'], [1, '#f0ece2']]);
      if (liq && S.open) { /* coffee surface drawn earlier sits under the rim; redraw on top of the interior */ var cy = S.H - 6.5, cr = rAt(inn, cy); B += '<ellipse cx="0" cy="-' + n1(cy) + '" rx="' + n1(cr) + '" ry="' + n1(e * cr) + '" fill="url(#' + id + 'cf)"/>'; }
      B += '<path d="M' + n1(-rt) + ',-' + H + ' A' + n1(rt) + ',' + n1(ri) + ' 0 0 0 ' + n1(rt) + ',-' + H + '" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="1.1"/>';
      B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt) + '" ry="' + n1(ri) + '" fill="none" stroke="#8b8272" stroke-opacity=".35" stroke-width=".8"/>';
    } else {
      var wr2 = rt - S.wallT;
      B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt) + '" ry="' + n1(ri) + '" fill="none" stroke="' + (dark ? '#fff' : '#fff') + '" stroke-opacity="' + rimop + '" stroke-width="2.2"/>';
      B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt) + '" ry="' + n1(ri) + '" fill="none" stroke="' + (dark ? '#bcd8ea' : '#173432') + '" stroke-opacity="' + (dark ? 0.4 : 0.5) + '" stroke-width=".8"/>';
      B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(wr2) + '" ry="' + n1(e * wr2) + '" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width=".8"/>';
      B += '<path d="M' + n1(-rt) + ',-' + H + ' A' + n1(rt) + ',' + n1(ri) + ' 0 0 0 ' + n1(rt) + ',-' + H + '" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="1.5" filter="url(#' + id + 'b3)"/>';
    }
  } else {
    var lipc = dark ? '#e2f0fa' : '#ffffff';
    B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt) + '" ry="' + n1(ri) + '" fill="' + (dark ? 'rgba(180,215,235,.25)' : 'rgba(255,255,255,.35)') + '" stroke="' + lipc + '" stroke-opacity=".85" stroke-width="1.1"/>';
    B += '<ellipse cx="0" cy="-' + H + '" rx="' + n1(rt - S.wallT) + '" ry="' + n1(e * (rt - S.wallT)) + '" fill="' + (dark ? 'rgba(6,14,26,.55)' : 'rgba(20,40,38,.38)') + '"/>';
  }

  var cl = closure(S, ctx);
  D += cl.defs; B += cl.body;
  return { defs: D, body: B, handle: handleMarkup, gl: gl, inn: inn };
}

/* ---------- saucer for the coffee cup ---------- */
function saucer(S, ctx) {
  var id = ctx.id, LI = ctx.LI, e = S.e, side = LI.side, D = '', B = '';
  var R = 80, T = 5.5, ry = e * R;
  var lp = side < 0 ? 0.25 : (side > 0 ? 0.75 : 0.5);
  D += grad(id + 'sa', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, '#cfc8ba'], [Math.max(0.06, lp - 0.3), '#f1ede4'], [lp, '#fdfcf8'], [Math.min(0.96, lp + 0.3), '#e5e0d4'], [1, '#b3ab9b']]);
  D += grad(id + 'sb', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, '#a79f8f'], [lp, '#d9d3c5'], [1, '#8d8574']]);
  D += grad(id + 'sw', 'radial', 'cx="' + (0.5 + (side < 0 ? 0.05 : -0.05)) + '" cy=".5" r=".55"', [[0, '#faf8f3'], [0.8, '#eae5d9'], [1, '#d6cfc0']]);
  B += '<path d="M' + -R + ',-' + (T - 0.5) + ' L' + -R + ',-0.5 A' + R + ',' + n1(ry) + ' 0 0 0 ' + R + ',-0.5 L' + R + ',-' + (T - 0.5) + 'Z" fill="url(#' + id + 'sb)"/>';
  B += '<ellipse cx="0" cy="-' + T + '" rx="' + R + '" ry="' + n1(ry) + '" fill="url(#' + id + 'sa)"/>';
  B += '<ellipse cx="0" cy="-' + (T - 0.8) + '" rx="' + (R - 14) + '" ry="' + n1(ry * (R - 14) / R) + '" fill="none" stroke="#a79f8f" stroke-opacity=".38" stroke-width="2.2"/>';
  B += '<ellipse cx="0" cy="-' + (T - 0.8) + '" rx="' + (R - 14) + '" ry="' + n1(ry * (R - 14) / R) + '" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1" transform="translate(' + (side < 0 ? 0.9 : -0.9) + ',0.9)"/>';
  B += '<ellipse cx="0" cy="-' + (T - 0.5) + '" rx="' + (R - 18) + '" ry="' + n1(ry * (R - 18) / R) + '" fill="url(#' + id + 'sw)" opacity=".8"/>';
  B += '<path d="M' + -R + ',-' + T + ' A' + R + ',' + n1(ry) + ' 0 0 0 ' + R + ',-' + T + '" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.1"/>';
  return { defs: D, body: B };
}

/* ---------- plates ---------- */
function plateObj(o, ctx, view) {
  var id = ctx.id, LI = ctx.LI, side = LI.side, D = '', B = '';
  var R = 130, Rw = 86, top = view === 'top';
  var e = top ? 1 : 0.36, Yc = top ? 0 : -15;
  var lg = buildLogo(o, ctx.cols, id), lgs = Math.min(150 / lg.w, 118 / lg.h) * (o.logoScale || 1);
  var sx = side < 0 ? -1 : (side > 0 ? 1 : 0);
  D += '<g id="' + id + 'lg">' + lg.svg + '</g>';
  var keyC = rgb(LI.key), warm = LI.warm;
  var tint = function (c) { return warm ? rgb(mix(c, [255, 206, 150], 0.28)) : rgb(c); };
  D += grad(id + 'pr', 'radial', 'cx="' + (0.5 + sx * 0.10) + '" cy="' + (top ? 0.5 - 0.08 : 0.46) + '" r=".62"', [[0, tint([253, 252, 248])], [0.72, tint([241, 237, 228])], [1, tint([204, 197, 183])]]);
  D += grad(id + 'pw', 'radial', 'cx="' + (0.5 + sx * 0.08) + '" cy="' + (top ? 0.46 : 0.42) + '" r=".6"', [[0, tint([252, 251, 247])], [0.8, tint([240, 236, 227])], [1, tint([218, 211, 198])]]);
  D += grad(id + 'pe', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, tint([176, 168, 154])], [side < 0 ? 0.28 : 0.7, tint([232, 227, 216])], [1, tint([142, 134, 120])]]);
  D += '<filter id="' + id + 'b3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter><filter id="' + id + 'b6" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>';
  D += '<filter id="' + id + 'en" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="b"/><feSpecularLighting in="b" surfaceScale="2.4" specularConstant=".7" specularExponent="20" lighting-color="#fff" result="sp"><feDistantLight azimuth="' + (side > 0 ? 315 : 225) + '" elevation="52"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="s2"/><feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0"/></filter>';
  var rx = R, ry = R * e, wx = Rw, wy = Rw * e;
  if (top) {
    var sdx = -sx * 16 || 6, sdy = 16;
    B += '<ellipse cx="' + sdx + '" cy="' + sdy + '" rx="' + (R + 4) + '" ry="' + (R + 4) + '" fill="rgba(30,18,6,.34)" filter="url(#' + id + 'b6)"/>';
    B += '<ellipse cx="' + (sdx * 0.2) + '" cy="' + (sdy * 0.2 + 2) + '" rx="' + (R + 1) + '" ry="' + (R + 1) + '" fill="rgba(30,18,6,.35)" filter="url(#' + id + 'b3)"/>';
    B += '<circle r="' + R + '" fill="url(#' + id + 'pr)"/><circle r="' + (R - 0.6) + '" fill="none" stroke="#7c7364" stroke-opacity=".28" stroke-width="1"/>';
    B += '<circle r="' + (R - 9) + '" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2" stroke-dasharray="' + (side < 0 ? '' : '') + '" opacity=".6" filter="url(#' + id + 'b3)"/>';
    B += '<circle r="' + (Rw + 4) + '" fill="none" stroke="#8d8573" stroke-opacity=".22" stroke-width="6" filter="url(#' + id + 'b3)"/>';
    B += '<circle r="' + Rw + '" fill="url(#' + id + 'pw)"/><circle r="' + Rw + '" fill="none" stroke="#7c7364" stroke-opacity=".3" stroke-width=".9"/>';
    D += grad(id + 'pa', 'linear', 'x1="' + (sx <= 0 ? 0 : 1) + '" y1="0" x2="' + (sx <= 0 ? 1 : 0) + '" y2="1"', [[0, '#fff', 0.85], [0.3, '#fff', 0], [1, '#fff', 0]]);
    B += '<circle r="' + (Rw - 1.5) + '" fill="none" stroke="url(#' + id + 'pa)" stroke-width="2.4"/>';
    B += '<g filter="url(#' + id + 'en)"><use href="#' + id + 'lg" transform="matrix(' + n1(lgs) + ',0,0,' + n1(lgs) + ',0,0)"/></g>';
    D += grad(id + 'sh', 'linear', 'x1="0" y1="0" x2="1" y2="1"', [[0, '#fff', 0.34], [0.35, '#fff', 0.0], [1, '#000', 0.10]]);
    B += '<circle r="' + (R - 0.5) + '" fill="url(#' + id + 'sh)"/>';
    return { defs: D, body: B };
  }
  /* three-quarter view */
  var T = 8.5;
  B += '<ellipse cx="0" cy="' + (Yc + T) + '" rx="' + (rx - 2) + '" ry="' + (ry + 0) + '" fill="url(#' + id + 'pe)"/>';
  B += '<path d="M' + -rx + ',' + Yc + ' L' + (-rx + 2) + ',' + (Yc + T) + ' L' + (rx - 2) + ',' + (Yc + T) + ' L' + rx + ',' + Yc + 'Z" fill="url(#' + id + 'pe)"/>';
  B += '<ellipse cx="0" cy="' + Yc + '" rx="' + rx + '" ry="' + n1(ry) + '" fill="url(#' + id + 'pr)"/>';
  B += '<path d="M' + -rx + ',' + Yc + ' A' + rx + ',' + n1(ry) + ' 0 0 0 ' + rx + ',' + Yc + '" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.2"/>';
  B += '<ellipse cx="0" cy="' + Yc + '" rx="' + (rx - 9) + '" ry="' + n1(ry * (rx - 9) / rx) + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" filter="url(#' + id + 'b3)"/>';
  B += '<ellipse cx="0" cy="' + (Yc + 1) + '" rx="' + (wx + 4) + '" ry="' + n1((wy + 1.4)) + '" fill="none" stroke="#7c7364" stroke-opacity=".28" stroke-width="5" filter="url(#' + id + 'b3)"/>';
  B += '<ellipse cx="0" cy="' + (Yc + 1) + '" rx="' + wx + '" ry="' + n1(wy) + '" fill="url(#' + id + 'pw)"/>';
  D += grad(id + 'pl', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, '#5e5647', 0.34], [0.5, '#5e5647', 0.06], [1, '#fff', 0.8]]);
  B += '<path d="M' + -wx + ',' + (Yc + 1) + ' A' + wx + ',' + n1(wy) + ' 0 0 0 ' + wx + ',' + (Yc + 1) + '" fill="none" stroke="url(#' + id + 'pl)" stroke-width="1.8"/>';
  B += '<ellipse cx="0" cy="' + (Yc + 1) + '" rx="' + wx + '" ry="' + n1(wy) + '" fill="none" stroke="#7c7364" stroke-opacity=".3" stroke-width=".8"/>';
  B += '<g filter="url(#' + id + 'en)"><use href="#' + id + 'lg" transform="matrix(' + n1(lgs * 0.92) + ',0,0,' + n1(lgs * 0.92 * e) + ',0,' + (Yc + 2) + ')"/></g>';
  D += grad(id + 'sh', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, '#fff', side < 0 ? 0.3 : 0], [0.5, '#fff', 0], [1, '#fff', side > 0 ? 0.3 : 0]]);
  B += '<ellipse cx="0" cy="' + Yc + '" rx="' + rx + '" ry="' + n1(ry) + '" fill="url(#' + id + 'sh)"/>';
  return { defs: D, body: B };
}

/* ---------- backdrops, shadows, scene ---------- */
function backdropInfo(o) {
  var b = o.backdrop || 'studio', cc = col(o.backdropColour || 'C22');
  if (typeof b === 'object') { cc = col(b.colour); b = 'colour'; }
  if (BYCODE[String(b).toUpperCase()]) { cc = col(b); b = 'colour'; }
  var lum = b === 'studio' ? 0.9 : (b === 'navy' ? 0.06 : lumOf(cc));
  return { type: b, colour: cc, lum: lum, dark: lum < 0.42 };
}
function drawBackdrop(bd, LI, id, VW, VH, floorY, top) {
  var D = '', B = '', w = VW, h = VH, fl = floorY;
  if (bd.type === 'studio') {
    D += grad(id + 'bg', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#d9d2c5'], [0.5, '#d0c8b9'], [1, '#c3b9a7']]);
    D += grad(id + 'fl', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#fff', 0], [0.35, '#fff', 0.20], [1, '#fffaf0', 0.10]]);
    D += grad(id + 'pool', 'radial', 'cx=".5" cy=".5" r=".5"', [[0, '#fffaf0', 0.42], [1, '#fffaf0', 0]]);
    D += grad(id + 'vg', 'radial', 'cx=".5" cy=".46" r=".78"', [[0.55, '#3a2a18', 0], [1, '#3a2a18', 0.26]]);
    B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'bg)"/>';
    B += '<ellipse cx="' + (w * 0.5) + '" cy="' + (fl - h * 0.30) + '" rx="' + (w * 0.62) + '" ry="' + (h * 0.40) + '" fill="url(#' + id + 'pool)"/>';
    B += '<rect y="' + (fl - h * 0.10) + '" width="' + w + '" height="' + (h - fl + h * 0.10) + '" fill="url(#' + id + 'fl)"/>';
    B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'vg)"/>';
  } else if (bd.type === 'navy') {
    D += grad(id + 'bg', 'radial', 'cx=".5" cy=".52" r=".75"', [[0, '#1d426f'], [0.55, '#0e2447'], [1, '#050c1b']]);
    D += grad(id + 'fl', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#6ea0d8', 0], [0.2, '#6ea0d8', 0.10], [1, '#000', 0.30]]);
    B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'bg)"/><rect y="' + (fl - h * 0.12) + '" width="' + w + '" height="' + (h - fl + h * 0.12) + '" fill="url(#' + id + 'fl)"/>';
  } else {
    var c = bd.colour, lite = mix(c, [255, 255, 255], 0.22), dk = mix(c, [0, 0, 0], 0.34);
    D += grad(id + 'bg', 'radial', 'cx=".5" cy=".50" r=".78"', [[0, rgb(lite)], [0.5, rgb(c)], [1, rgb(dk)]]);
    D += grad(id + 'fl', 'linear', 'x1="0" y1="0" x2="0" y2="1"', [[0, '#fff', 0], [0.3, '#fff', bd.dark ? 0.08 : 0.14], [1, '#000', 0.10]]);
    B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'bg)"/><rect y="' + (fl - h * 0.10) + '" width="' + w + '" height="' + (h - fl + h * 0.10) + '" fill="url(#' + id + 'fl)"/>';
  }
  if (LI.side < 0 && !top) { D += grad(id + 'lk', 'linear', 'x1="0" y1="0" x2="1" y2="0"', [[0, '#fff', bd.dark ? 0.10 : 0.30], [0.7, '#fff', 0]]); B += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + 'lk)"/>'; }
  if (LI.glow && LI.side === 0) { D += grad(id + 'hg', 'radial', 'cx=".5" cy=".5" r=".5"', [[0, '#fff', bd.dark ? 0.55 : 0.9], [0.5, '#fff', bd.dark ? 0.16 : 0.35], [1, '#fff', 0]]); B += '<ellipse cx="' + (w * 0.5) + '" cy="' + (fl - h * 0.30) + '" rx="' + (w * 0.5) + '" ry="' + (h * 0.5) + '" fill="url(#' + id + 'hg)"/>'; }
  if (LI.warm) { D += grad(id + 'kg', 'radial', 'cx=".5" cy=".5" r=".5"', [[0, '#ff8a2c', 0.45], [0.55, '#ff6a10', 0.14], [1, '#ff6a10', 0]]); B += '<ellipse cx="' + (w * 0.8) + '" cy="' + (fl - h * 0.08) + '" rx="' + (w * 0.66) + '" ry="' + (h * 0.55) + '" fill="url(#' + id + 'kg)"/>'; B += '<rect width="' + w + '" height="' + h + '" fill="#ff7a1c" fill-opacity="' + (bd.dark ? 0.05 : 0.11) + '"/>'; }
  /* fine photographic grain */
  D += '<filter id="' + id + 'gn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11"/><feColorMatrix type="saturate" values="0"/></filter>';
  B += '<rect width="' + w + '" height="' + h + '" filter="url(#' + id + 'gn)" opacity=".055" style="mix-blend-mode:overlay"/>';
  return { defs: D, body: B };
}

function shadowLayer(S, ctx, bd, gl, tintRGB, id) {
  var LI = ctx.LI, e = S.e, r0 = S.r0, H = S.H, D = '', B = '';
  var Yf = S.reflY != null ? S.reflY : e * r0 * (S.flatBottom ? 0.3 : 1);
  var dark = bd.dark;
  var sA = dark ? 0.62 : 0.52, sgn = LI.sdx;
  D += '<filter id="' + id + 'sb" x="-40%" y="-120%" width="180%" height="340%"><feGaussianBlur stdDeviation="3.2"/></filter><filter id="' + id + 'sc" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="1.8"/></filter><filter id="' + id + 'ca" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="2.6"/></filter>';
  var shRGB = mix([20, 12, 6], tintRGB, dark ? 0.25 : 0.18);
  if (LI.side === 0) {
    var ey = 6 + H * 0.16;
    D += grad(id + 'sg', 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + Yf + '" x2="0" y2="' + (Yf + ey * 2) + '"', [[0, rgb(shRGB), sA * 0.9], [1, rgb(shRGB), 0]]);
    B += '<ellipse cx="0" cy="' + n1(Yf * 0.4 + ey * 0.5) + '" rx="' + n1(r0 * 1.15) + '" ry="' + n1(ey) + '" fill="url(#' + id + 'sg)" filter="url(#' + id + 'sb)"/>';
    B += '<ellipse cx="0" cy="' + n1(Yf * 0.14) + '" rx="' + n1(r0 * 1.0) + '" ry="' + n1(e * r0 * 1.1 + 1) + '" fill="' + rgb(shRGB) + '" fill-opacity="' + (sA * 1.3) + '" filter="url(#' + id + 'sc)"/>';
    var cy = Yf + ey * 0.55, cr = gl && !gl.opaque ? mix(tintRGB, [255, 255, 255], 0.55) : [255, 255, 255];
    if (!gl || !gl.opaque) B += '<ellipse cx="0" cy="' + n1(cy) + '" rx="' + n1(r0 * 0.72) + '" ry="' + n1(ey * 0.38) + '" fill="' + rgb(cr) + '" fill-opacity="' + (dark ? 0.5 : 0.62) + '" filter="url(#' + id + 'ca)"/>';
  } else {
    var dx = sgn * (H * 0.42 + r0 * 0.6), len = Math.abs(dx);
    D += grad(id + 'sg', 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + n1(dx) + '" y2="0"', [[0, rgb(shRGB), sA], [0.55, rgb(shRGB), sA * 0.55], [1, rgb(shRGB), 0]]);
    B += '<ellipse cx="' + n1(dx * 0.5) + '" cy="' + n1(Yf * 0.12) + '" rx="' + n1(len * 0.5 + r0 * 0.9) + '" ry="' + n1(e * r0 * 1.0 + 2.5) + '" fill="url(#' + id + 'sg)" filter="url(#' + id + 'sb)"/>';
    B += '<ellipse cx="0" cy="' + n1(Yf * 0.14) + '" rx="' + n1(r0 * 1.02) + '" ry="' + n1(e * r0 * 1.1 + 1) + '" fill="' + rgb(shRGB) + '" fill-opacity="' + (sA * 1.4) + '" filter="url(#' + id + 'sc)"/>';
    if (!gl || !gl.opaque) {
      var cc = mix(tintRGB, [255, 255, 255], 0.5), cx = sgn * r0 * 1.9;
      B += '<ellipse cx="' + n1(cx) + '" cy="' + n1(Yf + 0.6) + '" rx="' + n1(r0 * 0.62) + '" ry="' + n1(e * r0 * 0.7 + 1) + '" fill="' + rgb(cc) + '" fill-opacity="' + (dark ? 0.42 : 0.5) + '" filter="url(#' + id + 'ca)"/>';
      B += '<ellipse cx="' + n1(cx * 0.9) + '" cy="' + n1(Yf + 0.6) + '" rx="' + n1(r0 * 0.28) + '" ry="' + n1(e * r0 * 0.3 + 0.5) + '" fill="#fff" fill-opacity=".7" filter="url(#' + id + 'sc)"/>';
    }
  }
  return { defs: D, body: B, Yf: Yf };
}

function instance(o, i, jit, bd, LI) {
  var id = 'cg' + (++seq) + '_' + i + '_';
  var cols = (o.colours && o.colours.length ? o.colours : ['C12']).map(col); while (cols.length < 3) cols.push(cols[cols.length - 1]);
  var ctx = { o: o, id: id, LI: LI, dark: bd.dark, cols: cols, jit: jit };
  var obj = o.object || 'swing', D = '', B = '', R = {};
  if (obj === 'plate' || obj === 'plate34') {
    var view = obj === 'plate' ? 'top' : '34';
    var pl = plateObj(o, ctx, view);
    D = pl.defs;
    var S = view === 'top' ? { e: 1, r0: 120, H: 0, totalH: 260, W: 280, view: 'top', flatBottom: false } : { e: 0.36, r0: 122, H: 24, totalH: 60, W: 270, view: '34', flatBottom: false, reflY: 38 };
    R = { id: id, S: S, defs: D, body: pl.body, gl: GLASSES.porcelain, tint: [240, 236, 226] };
    return R;
  }
  var Sx = objSpec(obj, o);
  var rv = revolve(Sx, ctx);
  D += rv.defs;
  var inner = '';
  if (Sx.saucer) { var sc = saucer(Sx, ctx); D += sc.defs; inner += sc.body; }
  var lift = Sx.lift ? -Sx.lift : 0;
  inner += '<g' + (lift ? ' transform="translate(0,' + lift + ')"' : '') + '>' + rv.handle + rv.body + '</g>';
  var gl = rv.gl, tint = gl.opaque ? [240, 236, 226] : (gl.light.a0 > 0.5 ? gl.light.c0 : mix(gl.light.c0, gl.light.c1, 0.25));
  var liqc = (o.liquid && LIQUIDS[o.liquid] && !gl.opaque) ? LIQUIDS[o.liquid].c0 : null; if (liqc && o.liquid !== 'water' && o.liquid !== 'gin') tint = mix(tint, liqc, 0.6);
  return { id: id, S: Sx, defs: D, body: inner, gl: gl, tint: tint };
}

function aspectOf(a) { if (typeof a === 'number') return a; return a === 'square' ? 1 : (a === 'wide' ? 0.667 : (a === 'tall' ? 0.7 : 0.8)); }

function sceneSVG(o) {
  o = o || {};
  var LI = LIGHTS[o.lighting || 'daylight'] || LIGHTS.daylight;
  var bd = backdropInfo(o);
  var batch = o.count && o.count > 1 ? Math.round(o.count) : 0;
  var VW = batch ? 1600 : 800, asp = batch ? (o.aspect != null ? aspectOf(o.aspect) : 0.36) : aspectOf(o.aspect);
  var VH = Math.round(VW / (batch ? 1 : 1) * (batch ? asp : 1 / asp * 1));
  if (!batch) VH = Math.round(VW / asp);
  var sid = 'cg' + (++seq) + 's_';
  var inst = [], i, n = batch || 1;
  for (i = 0; i < n; i++) inst.push(instance(o, i, batch ? (i + 1) * 1.37 : (o.jitter || 0), bd, LI));
  var S = inst[0].S, top = S.view === 'top';
  var floorY = top ? VH * 0.5 : VH * (batch ? 0.80 : 0.79);
  var k, spacing = 0, totW;
  if (top) k = Math.min(VW, VH) * 0.40 / 130;
  else if (batch) { spacing = S.W * 1.28; totW = spacing * n; k = Math.min(VH * 0.68 / S.totalH, VW * 0.94 / totW); }
  else k = Math.min(VH * 0.74 / S.totalH, VW * 0.62 / S.W);
  if (S.view === '34') k = Math.min(VH * 0.5 / 60, VW * 0.72 / S.W);
  if (S.name === 'cup' || S.name === 'mug') k = Math.min(VH * 0.40 / S.totalH, VW * 0.56 / S.W);
  if (S.name === 'tumbler') k = Math.min(VH * 0.40 / S.totalH, VW * 0.46 / S.W);
  if (!top && !batch && S.totalH * k < VH * 0.5) floorY = Math.min(VH * 0.80, VH * 0.5 + S.totalH * k * 0.5);
  var bk = drawBackdrop(bd, LI, sid, VW, VH, floorY, top);
  var defs = bk.defs, body = bk.body;
  var reflA = o.reflection != null ? o.reflection : (bd.type === 'navy' ? 0.50 : (bd.type === 'studio' ? 0.26 : 0.32));
  var sx0 = batch ? -(n - 1) * spacing / 2 : 0;
  for (i = 0; i < n; i++) {
    var I = inst[i], x = (VW / 2 + (batch ? sx0 + i * spacing : 0)), sh = null, parts = '';
    defs += I.defs;
    var r0 = I.S.r0, Yf = I.S.e * r0 * (I.S.flatBottom ? 0.3 : 1);
    if (I.S.view === 'top') {
      parts = '<g transform="translate(' + n1(VW / 2) + ',' + n1(VH / 2) + ') scale(' + n1(k * 100) / 100 + ')">' + I.body + '</g>';
    } else {
      sh = shadowLayer(I.S, { LI: LI }, bd, I.gl, I.tint, I.id); defs += sh.defs;
      if (I.S.reflY != null) Yf = I.S.reflY;
      var mid = I.id + 'rm';
      var rh = Math.max(I.S.totalH * 0.5, 40);
      defs += grad(mid + 'g', 'linear', 'gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(Yf) + '" x2="0" y2="' + n1(Yf + rh) + '"', [[0, '#fff', 1], [1, '#fff', 0]]);
      defs += '<mask id="' + mid + '" maskUnits="userSpaceOnUse" x="-400" y="' + n1(Yf - 4) + '" width="800" height="' + n1(rh + 20) + '"><rect x="-400" y="' + n1(Yf) + '" width="800" height="' + n1(rh) + '" fill="url(#' + mid + 'g)"/></mask>';
      defs += '<filter id="' + I.id + 'rb" x="-10%" y="-5%" width="120%" height="110%"><feGaussianBlur stdDeviation="' + (bd.type === 'navy' ? 0.7 : 1.3) + '"/></filter>';
      parts = '<g transform="translate(' + n1(x) + ',' + n1(floorY) + ') scale(' + k.toFixed(4) + ')">' + sh.body + '<g mask="url(#' + mid + ')" opacity="' + reflA + '"><g filter="url(#' + I.id + 'rb)"><g transform="translate(0,' + n1(2 * Yf) + ') scale(1,-1)">' + I.body + '</g></g></g>' + I.body + '</g>';
    }
    if (I.S.view === 'top') parts = parts.replace(/translate\([^)]*\) scale/, 'translate(' + n1(x) + ',' + n1(VH / 2) + ') scale');
    body += parts;
  }
  var lab = o.label === false ? '' : esc(o.label || LABEL), ls = Math.round(clamp(10.5 * VW / (o.size || (batch ? 1100 : 480)), VW * 0.012, VW * 0.04));
  var lblW = Math.round(lab.length * ls * 0.56 + ls * 1.6);
  var labFill = bd.dark ? '#fff' : '#201a12';
  var label = lab ? '<g><rect x="' + (VW * 0.025) + '" y="' + (VH - VH * 0.025 - ls * 1.9) + '" width="' + lblW + '" height="' + (ls * 1.9) + '" rx="' + (ls * 0.95) + '" fill="' + (bd.dark ? '#000' : '#fff') + '" fill-opacity=".42"/><text x="' + (VW * 0.025 + ls * 0.8) + '" y="' + (VH - VH * 0.025 - ls * 0.6) + '" font-family="\'Inter\', \'Helvetica Neue\', Arial, sans-serif" font-size="' + ls + '" fill="' + labFill + '" fill-opacity=".92">' + lab + '</text></g>' : '';
  var w = o.size || (batch ? 1100 : 480);
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + VW + ' ' + VH + '" width="' + w + '" height="' + Math.round(w * VH / VW) + '" role="img" aria-label="' + esc(o.alt || (LABEL + ': ' + (o.object || 'swing') + ' com decalque')) + '" style="display:block;max-width:100%;height:auto"><defs>' + defs + '</defs>' + body + label + '</svg>';
  return svg;
}

/* ---------- uploaded logo to one-colour mask ---------- */
function loadMask(src, opts) {
  opts = opts || {};
  return new Promise(function (resolve, reject) {
    function fromURL(url) {
      var img = new Image();
      img.onload = function () {
        var m = opts.maxSize || 420, sc = Math.min(1, m / Math.max(img.width, img.height)), w = Math.max(1, Math.round(img.width * sc)), h = Math.max(1, Math.round(img.height * sc));
        var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h);
        var d = x.getImageData(0, 0, w, h), p = d.data, th = (opts.threshold == null ? 140 : opts.threshold), i, inv = !!opts.invert;
        for (i = 0; i < p.length; i += 4) { var l = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]; var ink = inv ? l >= th : l < th; var v = ink ? 255 : 0; p[i] = p[i + 1] = p[i + 2] = v; p[i + 3] = 255; }
        x.putImageData(d, 0, 0); resolve({ src: c.toDataURL('image/png'), w: w, h: h });
      };
      img.onerror = function () { reject(new Error('image load failed')); };
      img.src = url;
    }
    if (typeof src === 'string') fromURL(src);
    else { var fr = new FileReader(); fr.onload = function () { fromURL(fr.result); }; fr.onerror = reject; fr.readAsDataURL(src); }
  });
}

/* ---------- public API ---------- */
var API = {
  version: '1.0',
  label: LABEL,
  COLOURS: COLOURS,
  objects: [['swing', 'Garrafa swing-top (água)'], ['carafe', 'Garrafa alta para água'], ['bordeaux', 'Garrafa de vinho (Bordeaux)'], ['spirits', 'Garrafa de espirituosas'], ['flask', 'Frasco'], ['oil', 'Azeite redonda'], ['oilsq', 'Azeite quadrada'], ['tumbler', 'Copo'], ['mug', 'Caneca'], ['cup', 'Chávena com pires'], ['plate', 'Prato (vista de cima)'], ['plate34', 'Prato (3/4)']],
  glasses: Object.keys(GLASSES).map(function (k) { return [k, GLASSES[k].name]; }),
  liquids: Object.keys(LIQUIDS).map(function (k) { return [k, LIQUIDS[k].name]; }),
  lights: Object.keys(LIGHTS).map(function (k) { return [k, LIGHTS[k].name]; }),
  marks: [['text', 'Texto'], ['geometric', 'Marca geométrica'], ['script', 'Monograma'], ['line', 'Ilustração a traço'], ['crest', 'Selo']],
  svg: function (o) { return sceneSVG(o); },
  render: function (target, o) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    var s = sceneSVG(o); if (el) el.innerHTML = s; return el ? el.firstElementChild : s;
  },
  batch: function (target, o) {
    o = Object.assign({}, o, { count: (o && o.count) || 12 });
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    var s = sceneSVG(o); if (el) el.innerHTML = s; return el ? el.firstElementChild : s;
  },
  loadMask: loadMask
};
if (typeof module !== 'undefined' && module.exports) module.exports = API;
global.CergamGlass = API;
})(typeof window !== 'undefined' ? window : this);
