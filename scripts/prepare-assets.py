"""Cria cópias web de fotos e fontes oficiais. Nunca modifica os originais."""
from pathlib import Path
from PIL import Image, ImageOps
import shutil

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'assets'
photo_dir = root / 'FOTOS PROFISSIONAIS - 10-2024' / 'Editadas Maraisa Fernandes'
photos = {'hero': '_MG_1386.jpg', 'maraisa': '_MG_1548.jpg', 'conversation': '_MG_1329.jpg', 'contact': '_MG_1574.jpg'}
(output / 'photos').mkdir(parents=True, exist_ok=True)
(output / 'fonts').mkdir(parents=True, exist_ok=True)
for name, source in photos.items():
    with Image.open(photo_dir / source) as original:
        original = ImageOps.exif_transpose(original).convert('RGB')
        for width in (640, 1100):
            photo = original.copy()
            photo.thumbnail((width, round(width * original.height / original.width)))
            photo.save(output / 'photos' / f'{name}-{width}.webp', 'WEBP', quality=84, method=6)
        print(name, original.size)
for family, original, target in [
    ('Univia-Pro', 'UniviaPro-Light.otf', 'univia-light.otf'),
    ('Univia-Pro', 'UniviaPro-Regular.otf', 'univia-regular.otf'),
    ('Grota-Sans', 'Grota Sans Regular.otf', 'grota-regular.otf'),
    ('Grota-Sans', 'Grota Sans Medium.otf', 'grota-medium.otf'),
]:
    shutil.copy2(root / 'Identidade Visual' / 'Fontes' / family / original, output / 'fonts' / target)
