"""Generates app icons, splash and map markers from the web logo.

Needs Pillow and cairosvg:  pip install pillow cairosvg
Run from anywhere:          python3 apps/mobile/scripts/generate-assets.py
"""
import io
import math
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'apps/mobile/assets/images'
LOGO = ROOT / 'public/asstes/logoSquare.png'
BROWN = (175, 133, 102, 255)


def roll_layers():
    """Returns (logo crop with brown outside the circle, roll on transparent)."""
    logo = Image.open(LOGO).convert('RGBA')
    w = logo.width
    # the brown circle spans ~27%..73% of the logo
    box = (int(w * 0.27), int(w * 0.27), int(w * 0.73), int(w * 0.73))
    crop = logo.crop(box)
    size = crop.width
    on_brown = Image.new('RGBA', crop.size, BROWN)
    roll = Image.new('RGBA', crop.size, (0, 0, 0, 0))
    px, bp, rp = crop.load(), on_brown.load(), roll.load()
    r = size / 2
    for y in range(size):
        for x in range(size):
            c = px[x, y]
            inside = math.hypot(x - r, y - r) < r * 0.95
            brownish = abs(c[0] - BROWN[0]) < 30 and abs(c[1] - BROWN[1]) < 30 and abs(c[2] - BROWN[2]) < 30
            if inside and not brownish:
                bp[x, y] = c
                rp[x, y] = c
    return on_brown, roll


def place(layer, canvas_size, scale, bg=(0, 0, 0, 0)):
    canvas = Image.new('RGBA', (canvas_size, canvas_size), bg)
    s = int(canvas_size * scale)
    img = layer.resize((s, s), Image.LANCZOS)
    off = (canvas_size - s) // 2
    canvas.alpha_composite(img, (off, off))
    return canvas


def app_icons():
    on_brown, roll = roll_layers()
    place(on_brown, 1024, 1.0, BROWN).convert('RGB').save(OUT / 'icon.png')
    place(roll, 1024, 0.62).save(OUT / 'android-icon-foreground.png')
    Image.new('RGBA', (1024, 1024), BROWN).save(OUT / 'android-icon-background.png')
    mono = place(roll, 1024, 0.62)
    white = Image.new('RGBA', mono.size, (255, 255, 255, 255))
    white.putalpha(mono.getchannel('A'))
    white.save(OUT / 'android-icon-monochrome.png')
    place(roll, 512, 0.9).save(OUT / 'splash-icon.png')
    place(on_brown, 48, 1.0, BROWN).save(OUT / 'favicon.png')


# Tabler icons (MIT), same set the web used for toilet types.
GLYPHS = {
    'pub': '<path d="M8 21h8M12 15v6M17 3l1 7c0 3.012-2.686 5-6 5s-6-1.988-6-5l1-7h10z"/><path d="M6 10a5 5 0 0 1 6 0a5 5 0 0 0 6 0"/>',
    'mall': '<circle cx="6" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M17 17h-11v-14h-2"/><path d="M6 5l14 1l-1 7h-13"/>',
    'public': '<ellipse cx="6" cy="10" rx="3" ry="7"/><path d="M21 10c0-3.866-1.343-7-3-7M6 3h12M21 10v10l-3-1l-3 2l-3-3l-3 2v-10M6 10h.01"/>',
    'nature': '<path d="M16 5l3 3l-2 1l4 4l-3 1l4 4h-9M15 21v-3M8 13l-2-2M8 12l2-2M8 21v-13"/><path d="M5.824 15.995a3 3 0 0 1-2.743-3.69a3 3 0 0 1 .304-4.833a3 3 0 0 1 4.615-3.707a3 3 0 0 1 4.614 3.707a3 3 0 0 1 .305 4.833a3 3 0 0 1-2.919 3.695h-4z"/>',
    'work': '<path d="M3 21h18M5 21v-14l8-4v18M19 21v-10l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>',
    'office': '<path d="M3 21h18M3 10h18M5 6l7-3l7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    'other': '<path d="M8 8a3.5 3 0 0 1 3.5-3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1-2 3a3 4 0 0 0-2 4M12 19v.01"/>',
}
COLORS = {
    'pub': '#D97706',
    'mall': '#7C3AED',
    'public': '#0284C7',
    'nature': '#16A34A',
    'work': '#475569',
    'office': '#0F766E',
    'other': '#AF8566',
}


def glyph_png(key, px):
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{px}" height="{px}" viewBox="0 0 24 24" '
        f'fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
        f'{GLYPHS[key]}</svg>'
    )
    return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert('RGBA')


def marker(key, scale, selected=False):
    d = (44 if selected else 34) * scale  # circle diameter
    pad = 4 * scale
    size = int(d + pad * 2)
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse((pad, pad + scale, pad + d, pad + d + scale), fill=(0, 0, 0, 90))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(1.5 * scale)))
    draw = ImageDraw.Draw(img)
    draw.ellipse((pad, pad, pad + d, pad + d), fill='#FFFFFF')
    b = 2.5 * scale
    draw.ellipse((pad + b, pad + b, pad + d - b, pad + d - b), fill=COLORS[key])
    g = glyph_png(key, int(d * 0.52))
    img.alpha_composite(g, (int((size - g.width) / 2), int((size - g.height) / 2)))
    return img


def markers():
    out = OUT / 'markers'
    out.mkdir(exist_ok=True)
    for key in GLYPHS:
        for scale, suffix in ((1, ''), (2, '@2x'), (3, '@3x')):
            marker(key, scale).save(out / f'{key}{suffix}.png')
            marker(key, scale, selected=True).save(out / f'{key}-selected{suffix}.png')


if __name__ == '__main__':
    app_icons()
    markers()
    print('assets written to', OUT)
