"""Derive the two themed wordmark PNGs from the supplied JPEG.

The source is a flat two-colour lockup on a uniform #001A33 field, so the
background keys out to alpha cleanly. Run from this directory:  python3 derive.py
Requires nothing but the standard library.
"""
import zlib, struct, subprocess, os

SRC_JPEG = "cergam-wordmark-source.jpeg"
BG       = (0, 26, 51)        # #001A33, measured off the source
LETTER   = (203, 229, 254)    # #CBE5FE
DOT      = (193, 131, 74)     # #C1834A
OUT_W    = 564

def read_png(p):
    d = open(p, "rb").read(); i = 8; idat = b""
    while i < len(d):
        ln = struct.unpack(">I", d[i:i+4])[0]; typ = d[i+4:i+8]; data = d[i+8:i+8+ln]
        if typ == b"IHDR": w, h, bd, ct = struct.unpack(">IIBB", data[:10])
        elif typ == b"IDAT": idat += data
        elif typ == b"IEND": break
        i += 12 + ln
    raw = zlib.decompress(idat); ch = {0:1, 2:3, 4:2, 6:4}[ct]; stride = w*ch
    out = bytearray(); prev = bytearray(stride); pos = 0
    for _ in range(h):
        f = raw[pos]; pos += 1; line = bytearray(raw[pos:pos+stride]); pos += stride
        for x in range(stride):
            a = line[x-ch] if x >= ch else 0; b = prev[x]; c = prev[x-ch] if x >= ch else 0
            if   f == 1: line[x] = (line[x]+a) & 255
            elif f == 2: line[x] = (line[x]+b) & 255
            elif f == 3: line[x] = (line[x]+((a+b) >> 1)) & 255
            elif f == 4:
                pa, pb, pc = abs(b-c), abs(a-c), abs(a+b-2*c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[x] = (line[x]+pr) & 255
        out += line; prev = line
    return w, h, ch, bytes(out)

def write_png(path, w, h, rgba):
    raw = b"".join(b"\x00" + bytes(rgba[y*w*4:(y+1)*w*4]) for y in range(h))
    def chunk(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t+d) & 0xffffffff)
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))
    open(path, "wb").write(png)

subprocess.run(["sips", "-s", "format", "png", SRC_JPEG, "--out", "_src.png"],
               check=True, capture_output=True)
W, H, CH, PX = read_png("_src.png")

def alpha_at(r, g, b):
    # the letter vector (LETTER-BG) is uniform across channels, so a plain
    # projection onto it recovers the coverage of each antialiased pixel
    return max(0.0, min(1.0, ((r-BG[0]) + (g-BG[1]) + (b-BG[2])) / (203*3.0)))

minx, miny, maxx, maxy = W, H, 0, 0
for y in range(H):
    for x in range(W):
        o = (y*W + x)*CH
        if alpha_at(PX[o], PX[o+1], PX[o+2]) > 0.12:
            minx, maxx = min(minx, x), max(maxx, x)
            miny, maxy = min(miny, y), max(maxy, y)
pad = 6
minx, miny = max(0, minx-pad), max(0, miny-pad)
maxx, maxy = min(W-1, maxx+pad), min(H-1, maxy+pad)
cw, chh = maxx-minx+1, maxy-miny+1
OUT_H = round(chh*OUT_W/cw); sx, sy = cw/OUT_W, chh/OUT_H

def sample(x0, y0, x1, y1):
    aa = dd = 0.0; n = 0
    for yy in range(int(y0), max(int(y0)+1, int(y1))):
        for xx in range(int(x0), max(int(x0)+1, int(x1))):
            o = ((miny+yy)*W + (minx+xx))*CH
            r, g, b = PX[o], PX[o+1], PX[o+2]
            aa += alpha_at(r, g, b)
            dd += 1.0 if ((r-b) > 35 and r > 70) else 0.0
            n += 1
    return (aa/n if n else 0.0), (dd/n if n else 0.0)

def build(letter, name):
    buf = bytearray(OUT_W*OUT_H*4)
    for y in range(OUT_H):
        for x in range(OUT_W):
            a, dotness = sample(x*sx, y*sy, (x+1)*sx, (y+1)*sy)
            col = DOT if dotness > 0.5 else letter
            o = (y*OUT_W + x)*4
            buf[o], buf[o+1], buf[o+2], buf[o+3] = col[0], col[1], col[2], round(a*255)
    write_png(name, OUT_W, OUT_H, buf)
    print("wrote %s  %dx%d  %.1f KB" % (name, OUT_W, OUT_H, os.path.getsize(name)/1024))

build((0, 26, 51),      "cergam-wordmark-ink.png")    # light theme
build((203, 229, 254),  "cergam-wordmark-paper.png")  # dark theme
os.remove("_src.png")
