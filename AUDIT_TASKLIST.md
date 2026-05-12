# Audit Düzeltme Görev Listesi

Kaynak: `AUDIT_REPORT.md` — 2026-05-12

---

## A) Acil Düzeltilmesi Gerekenler

- [ ] **A-1** — `proxy.ts` → `src/middleware.ts` olarak yeniden adlandır ve Next.js middleware olarak çalıştığını doğrula
- [ ] **A-2** — Admin sidebar'a logout butonu ekle (`/api/admin/logout`'a POST gönder)
- [ ] **A-3** — Mobil hamburger menü ekle (`top-nav.tsx` — `hidden md:flex` sorunu)
- [ ] **A-4** — Slider sayfasını tamamlanana kadar sidebar'dan ve erişilebilir route'lardan kaldır (veya "Yapım Aşamasında" banneri ekle)
- [ ] **A-5** — Dashboard quick action butonlarını (`Yeni Icerik Duzenle`, `Medya Yukle`, `SEO Duzenle`) `<Link>`'e çevir

---

## B) Performans ve Mimari İyileştirmeler

- [ ] **B-1** — `validateMediaReferences` fonksiyonunu `src/lib/cms/media.ts`'e taşı, `settings/route.ts` ve `seo/route.ts`'deki kopyaları sil
- [ ] **B-2** — Admin sayfalarındaki tekrar eden auth guard bloğunu `src/app/[locale]/admin/layout.tsx`'e taşı (7 dosyadan kaldır)
- [ ] **B-3** — Admin sidebar'a `usePathname()` ile aktif link state'i ekle
- [ ] **B-4** — Dashboard system status widget'ını hardcoded değerlerden `/api/health` ve `/api/db-health` endpoint'lerine bağla
- [ ] **B-5** — Rate limiting'i DB tabanlıdan in-memory LRU cache'e geçir (`ApiRateLimit` modeli yerine)

---

## C) Kod Temizliği ve Refactor

- [ ] **C-1** — `src/lib/seo/page-metadata.ts` wrapper'ını kaldır, tüm `buildPageMetadata` çağrılarını direkt `buildManagedMetadata`'ya yönlendir
- [ ] **C-2** — Admin dashboard'daki hardcoded Türkçe string'leri (`"Yayindaki bloklar"`, `"Yeni mesaj"`, `"Medya dosyasi"`, `"Beklemede"`) content sistemine veya `AdminDashboardContent` tipine al
- [ ] **C-3** — `footer.tsx`'deki inline locale string'lerini (`"Haftalik kreatif notlar"` vb.) `t` nesnesine taşı
- [ ] **C-4** — Admin sidebar'daki hardcoded renkleri (`#001a2b`, `#b90c17`, `#003049`) `theme.css`'e CSS variable olarak tanımla
- [ ] **C-5** — Dashboard ve admin bileşenlerindeki diğer hardcoded hex renkleri (`#cae6ff`, `#ffdad6`, `#eeedf0`) CSS variable'lara geçir
- [ ] **C-6** — Footer `href="#"` yasal linkleri: sayfa oluşturulana kadar kaldır veya `nofollow` ile işaretle

---

## D) Uzun Vadeli İyileştirmeler

- [ ] **D-1** — Slider modülünü tamamla: Prisma `Slider` modeli + migration + `/api/admin/slider` CRUD route'ları + form submit handler + sidebar entegrasyonu
- [ ] **D-2** — KVKK / Gizlilik Politikası sayfası oluştur (`/[locale]/gizlilik` ve `/[locale]/privacy`)
- [ ] **D-3** — Kullanım Koşulları sayfası oluştur (`/[locale]/kullanim-kosullari` ve `/[locale]/terms`)
- [ ] **D-4** — Vitest kurulumu + auth (session encode/decode, password hash) unit testleri
- [ ] **D-5** — Vitest + contact form API integration testleri
- [ ] **D-6** — Playwright ile e2e testler: login akışı, contact form, admin settings güncelleme
- [ ] **D-7** — Pino ile structured logging ekle (login, settings update, content update event'leri)
- [ ] **D-8** — GitHub Actions CI/CD pipeline: lint + type-check + build + test
- [ ] **D-9** — Admin kullanıcı yönetimi sayfası: şifre değiştirme, yeni admin ekleme

---

## Tamamlanan Görevler

_(Görev tamamlandıkça buraya taşı)_

---

## Notlar

- **A grubu** production çıkışını bloke eder — önce bunlar.
- **B grubu** mimari borç — bir sprint içinde temizlenmeli.
- **C grubu** kod kalitesi — B grubuyla paralel yürütülebilir.
- **D grubu** uzun vade — ayrı sprint(ler) olarak planla.
- `proxy.ts` (A-1) en yüksek riskli madde — routing çalışmıyor olabilir, ilk doğrulanmalı.
