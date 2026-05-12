# Render Hygiene Notes (6.3)

## Memoization Değerlendirmesi

- Public sayfalar server component olduğu için client-side render tekrar maliyeti düşük.
- Bu nedenle `useMemo`/`useCallback` eklemek public sayfalarda anlamlı kazanç üretmiyor.
- Memoization yalnızca client-side yoğun etkileşimli alanlarda gerekli; mevcut projede bu sınıfa giren ana alan `admin/slider`.

## Placeholder Döngü Temizliği

- `Array.from` tabanlı placeholder döngüler kaldırıldı.
- Home ve Portfolio listeleri artık locale bazlı içerik modelinden (`src/content/*`) geliyor.

## DOM Derinliği

- Page-layer dosyaları composition-only hale getirildi.
- Section katmanında gereksiz wrapper’lar minimumda tutuldu; hierarchy artık sayfa başına tek ana `main` + bölüm blokları düzeninde.
