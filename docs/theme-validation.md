# Theme Validation (4.4)

## Contrast Check

Aşağıdaki oranlar WCAG contrast hesabı ile ölçüldü:

- Light `--app-text` on `--app-bg`: `16.27:1`
- Dark `--app-text` on `--app-bg`: `16.31:1`
- Light `--on-primary` on `--primary`: `17.76:1`
- Dark `--on-primary` on `--primary`: `13.76:1`
- Light `--on-secondary` on `--secondary`: `6.71:1`
- Dark `--on-secondary` on `--secondary`: `11.11:1`
- Light `--app-muted` on card: `9.37:1`
- Dark `--app-muted` on card: `10.41:1`

Sonuç: Metin/zemin çiftlerinin tamamı AA (normal text 4.5:1) eşiğini geçiyor.

## Icon/Gorsel Davranışı

- Global `invert(...)` / `hue-rotate(...)` hack tamamen kaldırıldı.
- `img`, `video`, `svg` için ters çevirme filtresi yok.
- Navbar dünya ve moon ikonları `currentColor` ile çiziliyor; dark modda token bazlı renk alıyor.
- Böylece görseller doğal renklerinde kalırken ikonlar tema ile uyumlu şekilde kontrast sağlıyor.
