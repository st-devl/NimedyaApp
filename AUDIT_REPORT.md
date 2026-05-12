# Sistem Denetim Raporu — Nimedya App

**Tarih:** 2026-05-12
**Denetçi:** Claude Sonnet 4.6
**Kapsam:** Tam kod tabanı analizi (src/, prisma/, config dosyaları)

---

## 1. Genel Özet

Bu proje, Next.js 16 ile geliştirilmiş ikidilli (TR/EN) bir dijital ajans web sitesi + CMS admin panelinden oluşuyor. Teknoloji seçimleri yerinde: TypeScript strict, Zod validasyon, Prisma ORM, scrypt şifreleme, HMAC-signed session cookie. Kod genel hatlarıyla okunabilir ve tutarlı bir mimari yöneliş sergileniyor.

Ancak üretim kalitesinde sayılmak için kritik eksiklikler var: **Slider modülü tamamen sahte veriyle çalışıyor ve backend'e bağlı değil.** Admin panel'de logout butonu yok. DRY ihlalleri var. Hardcoded string ve renk değerleri sisteme yayılmış. Test altyapısı sıfır. Loglama console.log seviyesinde. Bu seviyedeki bir proje "yarım" sayılır — çalışıyor ama teslim edilemez hâlde.

---

## 2. En Kritik Bulgular

| # | Bulgu | Kategori | Şiddet |
|---|-------|----------|--------|
| 1 | Slider modülü sadece hardcoded mock veriyle çalışıyor — kaydet/sil/düzenle hiçbiri çalışmıyor | Yarım kalmış | Kritik |
| 2 | Admin panel'de UI'da logout butonu yok | Güvenlik UX | Kritik |
| 3 | `validateMediaReferences` iki farklı route dosyasına birebir kopyalanmış | DRY ihlali | Yüksek |
| 4 | Admin sayfa auth guard her page'de elle tekrar ediliyor (8 kez) | Mimari | Yüksek |
| 5 | Dashboard "Quick Actions" butonlarının tamamı işlevsiz `<button>` | Yarım kalmış | Yüksek |
| 6 | Footer "Gizlilik" ve "Kullanım" linkleri `href="#"` — sayfa yok | Yarım kalmış | Yüksek |
| 7 | Mobil hamburger menü yok | UX/Erişilebilirlik | Yüksek |
| 8 | Slider admin sidebar'da görünmüyor — sadece direkt URL ile açılıyor | Mimari tutarsızlık | Orta |
| 9 | Hardcoded Türkçe string'ler content sisteminin dışında kalmış (18+ yer) | DRY/i18n | Orta |
| 10 | Test altyapısı tamamen yok | Kalite güvence | Orta |

---

## 3. Amatör / Tekrar Eden Kod Yapıları

### 3.1 — `validateMediaReferences` Fonksiyonunun Kopyalanması

**Dosyalar:**
- `src/app/api/admin/settings/route.ts:7-13`
- `src/app/api/admin/seo/route.ts:7-13`

**Sorun:** Birebir aynı fonksiyon iki ayrı route dosyasında tekrar tanımlanmış.

```typescript
// Her iki dosyada AYNI KOD:
async function validateMediaReferences(ids: Array<number | null>) {
  const requestedIds = ids.filter((id): id is number => typeof id === "number");
  if (requestedIds.length === 0) return true;
  const existingCount = await prisma.mediaAsset.count({ where: { id: { in: requestedIds } } });
  return existingCount === new Set(requestedIds).size;
}
```

**Neden problem:** DRY ihlali. Üçüncü bir route bu işleve ihtiyaç duyarsa üçüncü kopyalanacak. Bug fix tek yerden yapılamaz.

**Çözüm:** `src/lib/cms/media.ts` veya `src/lib/api/validate-media.ts` içine taşı, oradan import et.

---

### 3.2 — Admin Sayfalarında Auth Guard Tekrarı

**Dosyalar:** Her admin page (dashboard, settings, seo, content, messages, media, slider — 7+ dosya)

**Sorun:** Her admin page şu bloğu manuel tekrar ediyor:

```typescript
const { locale } = await params;
if (!isLocale(locale)) notFound();
const isAuthenticated = await hasAdminSession();
if (!isAuthenticated) redirect(`/${locale}/admin/login`);
```

**Neden problem:** 7 sayfada 7 kez aynı kontrol. Birinde değişiklik yapılırsa diğerleri unutulabilir. Layout-level korumayla tamamen ortadan kaldırılabilir.

**Çözüm:** `src/app/[locale]/admin/layout.tsx` oluştur:

```typescript
export default async function AdminLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) redirect(`/${locale}/admin/login`);
  return <>{children}</>;
}
```

---

### 3.3 — Hardcoded Renk Değerleri (Tema Sisteminin Dışında)

**Dosyalar:**
- `src/components/site/admin-sidebar.tsx:7` → `bg-[#001a2b]`
- `src/components/sections/admin/admin-dashboard-page.tsx:34` → `bg-[#b90c17]`
- `src/components/sections/admin/admin-dashboard-page.tsx:47` → `bg-[#cae6ff]`
- `src/components/sections/admin/admin-dashboard-page.tsx:55` → `bg-[#ffdad6]`
- `src/components/sections/admin/admin-dashboard-page.tsx:53,61` → `text-[#003049]`

**Sorun:** Tema sistemi (`theme.css` + CSS variables) tanımlanmış olduğu hâlde admin bileşenlerinde 18 adet hex renk hardcoded kullanılmış. Dark mode veya tema değişikliğinde bunlar güncellenmez.

**Çözüm:** CSS variable'lara ekle: `--admin-bg`, `--admin-accent`, `--admin-danger` vb.

---

### 3.4 — Hardcoded String'ler Content Sisteminin Dışında

**Dashboard bileşeni** (`admin-dashboard-page.tsx`):
- `"Yayindaki bloklar"`, `"Yeni mesaj"`, `"Medya dosyasi"` — satır 45, 53, 61
- `"Yeni Icerik Ekle"`, `"Yeni Icerik Duzenle"`, `"Medya Yukle"`, `"SEO Duzenle"` — satır 36, 105-107
- `"Beklemede"` — satır 116

Bu string'lerin bir kısmı `content.stats.*` üzerinden geliyor (doğru), ama geri kalanı hardcoded Türkçe. Sisteme göre bazıları i18n içeriğinde, bazıları değil — tutarsızlık.

**Footer** (`footer.tsx`):
- `"Haftalik kreatif notlar"`, `"Kisa strateji notlari..."`, `"Abonelik talep et"` — satır 85-95
- Bu string'ler `t` nesnesine alınmamış, inline locale kontrolüyle yazılmış.

**TopNav** (`top-nav.tsx`):
- `labels` nesnesi hardcoded, content sisteminin dışında. Farklı i18n yaklaşımı var.

**Admin Sidebar** (`admin-sidebar.tsx`):
- `"Dashboard"`, `"Site Ayarlari"`, `"Medya"`, `"SEO"`, `"Icerik"`, `"Mesajlar"` — hepsi hardcoded.

---

### 3.5 — `src/lib/seo/page-metadata.ts` Gereksiz Wrapper

**Dosya:** `src/lib/seo/page-metadata.ts`

```typescript
export function buildPageMetadata(locale: Locale, routeKey: RouteKey) {
  return buildManagedMetadata(locale, routeKey);
}
```

Bu fonksiyon sadece `buildManagedMetadata`'yı çağırıyor. Hiçbir ek mantık yok. Tüm page'ler bu fonksiyonu import ediyor ama doğrudan `buildManagedMetadata`'yı kullanabilir. Gereksiz bir indirection katmanı.

---

### 3.6 — `proxy.ts` Dosyası Yanlış Konumda

**Dosya:** `src/proxy.ts`

Next.js'de middleware `src/middleware.ts` (veya proje kökünde `middleware.ts`) olarak tanımlanmalı. `proxy.ts` adı ve `src/` altındaki konumu hem naming convention hem de Next.js convention'ından sapıyor. Bu dosyanın nasıl devreye girdiği `next.config.ts` veya başka bir yerden incelenmesi gerekiyor — şu haliyle middleware olarak çalışmıyor olabilir.

**Çözüm:** `src/middleware.ts` olarak yeniden adlandır (veya içeriği `src/middleware.ts`'e taşı).

---

### 3.7 — Admin Sidebar'da Active State Yokluğu

**Dosya:** `src/components/site/admin-sidebar.tsx`

Aktif durum yalnızca Dashboard link'ine hardcoded uygulanmış (`border-l-4 border-[#b90c17] bg-[#003049]`). Diğer sayfalara gidildiğinde sidebar'da hangi sayfada olunduğu belli değil. `usePathname()` ile dinamik aktif state verilmeli.

---

## 4. Performans İyileştirme Önerileri

### 4.1 — `getSiteSettings` Çift Çağırımı Tek Request'te

**Mevcut durum:** `TopNav` ve `Footer` her ikisi de `getSiteSettings()` çağırıyor.

**Durum:** `react/cache` ile sarılmış olduğu için React render pass içinde deduplication yapılıyor — bu sorun zaten çözülmüş.

**Öncelik:** Düşük — bilgi amaçlı.

---

### 4.2 — Admin Sayfalarında Tekrar Eden `mediaAsset.findMany` Sorgusu

**Mevcut durum:**
- `settings/page.tsx:21`
- `seo/page.tsx:40`
- `api/admin/settings/route.ts:20`
- `api/admin/seo/route.ts:24`

**Problem:** Medya listesi 4 farklı yerde aynı sorguyla çekiliyor. Yüzlerce medya dosyası olduğunda bu maliyetli olacak.

**Çözüm:** `lib/cms/media.ts`'deki `listAllMedia()` fonksiyonunu tüm bu yerlerden kullan.

**Öncelik:** Orta

---

### 4.3 — HTTP Cache Headers Yok

**Mevcut durum:** API route'larında cache header tanımlanmamış.

**Problem:** Sık değişmeyen admin GET endpoint'lerinde bile caching stratejisi tanımlanmamış.

**Çözüm:** `Cache-Control: no-store` veya `s-maxage` ile kontrollü caching uygula.

**Öncelik:** Düşük

---

### 4.4 — Rate Limiting Veritabanı Tabanlı

**Mevcut durum:** `ApiRateLimit` modeli DB'de. Her istek bir DB write içeriyor.

**Problem:** Yüksek trafikte veya distributed deployment'ta her rate limit kontrolü DB'ye hit vuruyor. Bu ölçeklenemez.

**Çözüm:** Redis veya in-memory LRU cache ile değiştir.

**Öncelik:** Orta — şu an düşük trafik için sorun yok, ölçeklenince kritik.

---

### 4.5 — Mobil Navigasyon Tamamen Gizlenmiş

**Mevcut durum:** `top-nav.tsx`'de navigation linkleri `hidden md:flex` ile mobile'da gizleniyor.

**Problem:** Mobil kullanıcılar navigasyona erişemiyor.

**Çözüm:** Hamburger menü + off-canvas/sheet panel ekle.

**Öncelik:** Kritik (UX açısından)

---

## 5. Yarım Kalmış Yapılar

### 5.1 — Slider Modülü (En Kritik)

**Nerede:** `src/app/[locale]/admin/slider/page.tsx`, `src/components/sections/admin/admin-slider-page.tsx`, `src/components/sections/admin/slider/`

**Ne amaçla başlanmış:** Admin panelden sürükle-bırak sıralı slider yönetimi. Çeviri sistemiyle entegre, TR/EN form.

**Neden yarım:** Prisma şemasında `Slider` modeli yok. Hiçbir API endpoint yok. `constants.ts` içinde 3 satır hardcoded mock veri var. "Düzenle" ve "Sil" butonları event handler'sız. "Yeni Ekle" butonu işlevsiz. Kaydet işlevi yok.

**Yapılacaklar:**
1. Prisma şemasına `Slider` modeli ekle
2. `/api/admin/slider` route'ları oluştur (CRUD)
3. Form submit handler yaz
4. `sliderRows` yerine gerçek API çağrısı kullan
5. Admin sidebar'a ekle

**Karar:** Tamamlanması gerekiyor — silinmesi değil.

---

### 5.2 — Dashboard Quick Actions Butonları

**Nerede:** `src/components/sections/admin/admin-dashboard-page.tsx:105-107`

```tsx
<button>Yeni Icerik Duzenle</button>
<button>Medya Yukle</button>
<button>SEO Duzenle</button>
```

**Sorun:** Hiçbirinde `onClick` veya `href` yok. Tıklanabilir görünüyor, hiçbir şey olmuyor.

**Karar:** `Link` ile replace edilmeli.

---

### 5.3 — Footer Yasal Sayfalar

**Nerede:** `src/components/site/footer.tsx:105-106`

```tsx
<a href="#">{t.policy}</a>
<a href="#">{t.terms}</a>
```

**Sorun:** Gizlilik Politikası ve Kullanım Koşulları sayfaları yok. Placeholder link var.

**Karar:** Sayfalar oluşturulana kadar bu linkler kaldırılmalı veya `nofollow` ile işaretlenmeli.

---

### 5.4 — Admin Logout UI

**Nerede:** `/api/admin/logout/route.ts` mevcut — ama UI'da logout butonu yok.

**Sorun:** Admin paneline giren kullanıcı çıkış yapamıyor. Sadece cookie süresi dolana kadar (8 saat) oturumu devam ediyor.

**Karar:** Sidebar'a veya header'a logout butonu ekle, `/api/admin/logout`'a POST gönder.

---

### 5.5 — Dashboard System Status Widget

**Nerede:** `src/components/sections/admin/admin-dashboard-page.tsx:113-117`

```tsx
<li>API <span className="text-green-600">Online</span></li>
<li>Database <span className="text-green-600">Online</span></li>
<li>Deploy <span className="text-yellow-600">Beklemede</span></li>
```

Tüm durum bilgisi hardcoded. `"Beklemede"` hiçbir zaman değişmez. `/api/health` ve `/api/db-health` endpoint'leri var ama kullanılmıyor.

**Karar:** Bu widget'ı gerçek endpoint'lere bağla veya kaldır.

---

### 5.6 — Slider Sayfası Sidebar'da Görünmüyor

Admin sidebar'da 6 link var: Dashboard, Site Ayarları, Medya, SEO, İçerik, Mesajlar. Slider sayfası (`/[locale]/admin/slider`) sidebar'a eklenmemiş. Sadece direkt URL ile erişilebilir.

---

## 6. Kritik Eksiklikler ve Riskler

### 6.1 — Mobil Navigasyon Yok

**Risk:** Yüksek
**Sorun:** `hidden md:flex` ile mobile'da navigation tamamen gizlenmiş. Mobil kullanıcılar site içinde gezinemiyor. Bu ajans web sitesi için ölümcül bir UX hatasıdır.
**Çözüm:** Hamburger menü + `<Sheet>` veya `<Dialog>` based off-canvas navigation ekle.

---

### 6.2 — Admin Panel'de Logout Butonu Yok

**Risk:** Yüksek
**Sorun:** Paylaşılan bilgisayarda admin girişi yapılırsa oturum 8 saat açık kalır. Logout API var ama UI'da yok.
**Çözüm:** Sidebar footer'ına logout butonu ekle.

---

### 6.3 — Slider'ın Backend'i Yok

**Risk:** Yüksek
**Sorun:** Slider sayfası hem menüde gösteriliyor hem de mock veriyle çalışıyor. Kullanıcı slider kaydettiğini sanabilir ama hiçbir şey kaydedilmiyor.
**Çözüm:** Slider özelliği tamamlanana kadar sayfayı sidebar ve routing'den kaldır ya da "Yapım Aşamasında" banneri ekle.

---

### 6.4 — `proxy.ts` — Middleware Olarak Çalışmıyor Olabilir

**Risk:** Orta
**Sorun:** `src/proxy.ts` olarak adlandırılmış. Next.js'de middleware `middleware.ts` olarak tanımlanmak zorunda. `proxy.ts` adıyla otomatik olarak middleware'e bağlanmıyor. Bu dosyanın aktif olup olmadığını doğrula.
**Çözüm:** `src/middleware.ts` olarak yeniden adlandır.

---

### 6.5 — Üretimde Loglama Sistemi Yok

**Risk:** Orta
**Sorun:** Audit log sadece `console.info(JSON.stringify(...))` ile yapılıyor. Container restart'ta kaybolur. Translate API'de audit log var ama login, settings update, content update işlemlerinde yok.
**Çözüm:** Pino veya Winston ile structured logging, log rotation veya harici log servisi entegrasyonu.

---

### 6.6 — Gizlilik/KVKK Sayfaları Yok

**Risk:** Orta (Hukuki)
**Sorun:** Footer'da "Gizlilik" ve "Kullanım Koşulları" linkler var ama sayfa yok. İletişim formuyla kişisel veri toplandığında KVKK uyumu için gizlilik sayfası zorunlu.
**Çözüm:** İçerik oluştur veya linkleri kaldır.

---

### 6.7 — Hiç Test Yok

**Risk:** Orta
**Sorun:** Unit test, integration test, e2e test — hiçbiri yok. Auth logic, rate limiting, password hashing gibi kritik kodlar test edilmeden yayında.
**Çözüm:** En azından auth ve contact form akışları için Vitest + Playwright ekle.

---

### 6.8 — Admin Panel Kullanıcı Yönetimi Yok

**Risk:** Düşük (şimdi), Orta (uzun vade)
**Sorun:** Sadece seed ile admin kullanıcı oluşturulabiliyor. DB'ye elle müdahale olmadan yeni admin eklenemiyor. Şifre reset mekanizması yok.
**Çözüm:** Admin kullanıcı yönetimi sayfası ekle (en azından şifre değiştirme).

---

## 7. Mimari Kalite Puanlaması

| Kriter | Puan | Açıklama |
|--------|------|----------|
| Kod Okunabilirliği | **7/10** | Genel olarak temiz, ama dashboard'daki hardcoded string/renk karmaşası ve tutarsız i18n yaklaşımı düşürüyor |
| Mimari Düzen | **6/10** | lib/cms service katmanı iyi, ama page'lerden direkt Prisma çağrıları bu katmanı bypass ediyor; proxy.ts naming sorunu; gereksiz wrapper katmanları |
| Component Yapısı | **6/10** | sections/admin alt yapısı iyi bölünmüş, ama sidebar'da active state yok, slider bileşenleri mock veriye bağlı |
| Performans Potansiyeli | **7/10** | React cache kullanımı, Promise.all paralel queryler, standalone build iyi; rate limiting DB-based ölçeği yok |
| Güvenlik Seviyesi | **8/10** | scrypt + HMAC session + timing-safe compare + Zod + rate limiting etkileyici; logout UI eksikliği ve loglama yetersizliği düşürüyor |
| Ölçeklenebilirlik | **5/10** | DB-backed rate limiting, local file upload storage, session refresh yok; tek admin kullanıcısı |
| Bakım Kolaylığı | **6/10** | Test yok, loglama yetersiz, DRY ihlalleri, mock slider karışıklık yaratır |
| Profesyonellik | **6/10** | Güvenlik altyapısı profesyonel; ama mock slider, çalışmayan butonlar, logout yok — teslim edilemez |

**Genel Ortalama: 6.4/10**

---

## 8. Çözüm Yol Haritası

### A) Acil Düzeltilmesi Gerekenler

| Görev | Öncelik | Zorluk | Fayda |
|-------|---------|--------|-------|
| Slider'ı sidebar'dan ve routing'den kaldır veya "Beta" olarak işaretle | Kritik | Kolay | Kullanıcı yanıltma engellenir |
| Logout butonu ekle | Kritik | Kolay | Temel güvenlik UX |
| Mobil hamburger menü ekle | Kritik | Orta | Mobil kullanılabilirlik |
| Dashboard quick action butonlarını `Link`'e çevir | Yüksek | Kolay | Temel UX |
| `proxy.ts` → `middleware.ts` olarak yeniden adlandır ve doğrula | Yüksek | Kolay | Routing güvencesi |

### B) Performans ve Mimari İyileştirmeler

| Görev | Öncelik | Zorluk | Fayda |
|-------|---------|--------|-------|
| `validateMediaReferences`'ı `lib/cms/media.ts`'e taşı | Yüksek | Kolay | DRY |
| Admin sayfalarındaki auth guard tekrarını `layout.tsx`'e taşı | Yüksek | Orta | 7 dosyadan tekrar kaldırılır |
| Hardcoded renkleri CSS variable'lara geçir | Orta | Orta | Tema tutarlılığı |
| Rate limiting için in-memory LRU cache | Orta | Orta | DB yükü azalır |
| Dashboard system status widget'ını health endpoint'lerine bağla | Orta | Orta | Gerçek sistem bilgisi |

### C) Kod Temizliği ve Refactor

| Görev | Öncelik | Zorluk | Fayda |
|-------|---------|--------|-------|
| Dashboard ve Footer'daki hardcoded string'leri content sistemine al | Orta | Orta | i18n tutarlılığı |
| `page-metadata.ts` wrapper'ını kaldır, direkt `buildManagedMetadata` kullan | Düşük | Kolay | Gereksiz indirection kaldırılır |
| Admin sidebar'a `usePathname()` ile aktif state ekle | Yüksek | Kolay | UX |
| Footer yasal sayfa linklerini çalışır hale getir veya kaldır | Orta | Orta | KVKK uyumu |

### D) Uzun Vadeli Profesyonel İyileştirmeler

| Görev | Öncelik | Zorluk | Fayda |
|-------|---------|--------|-------|
| Slider modülünü Prisma + API ile tamamla | Yüksek | Yüksek | Söz verilen özelliği teslim et |
| Vitest ile auth ve contact form unit testleri | Yüksek | Orta | Regresyon koruması |
| Pino structured logging | Orta | Orta | Production debugging |
| Admin kullanıcı yönetimi ve şifre reset | Orta | Yüksek | Operasyonel bağımsızlık |
| Playwright ile kritik e2e testler | Orta | Yüksek | Güven |
| CI/CD pipeline (GitHub Actions: lint + build + test) | Orta | Orta | Kalite kapısı |
| KVKK / Gizlilik sayfası | Yüksek | Orta | Hukuki zorunluluk |

---

## 9. Profesyonel Refactor Önerileri

### 9.1 Admin Layout'a Auth Guard Taşıma

```
src/app/[locale]/admin/
├── layout.tsx       ← Buraya auth guard + sidebar taşı
├── page.tsx         ← Sadece dashboard içeriği
├── settings/page.tsx
└── ...
```

`layout.tsx` oluşturulursa tüm admin page'lerdeki tekrar eden `hasAdminSession` + `redirect` kodu silinebilir. **7 dosyada tekrar eden 4 satır** tek seferde çözülür.

### 9.2 Content Sistemi Tek Kaynaktan Beslenme

`top-nav.tsx` içindeki `labels` nesnesi, `footer.tsx` içindeki inline string'ler ve `admin-login-form.tsx` içindeki locale kontrolü — hepsi farklı yaklaşımlar kullanıyor. Tek yaklaşım seçilmeli: ya `content/` dizini, ya her bileşende yerel `labels` nesnesi. Karışık olmamak şartıyla ikisi de kabul edilebilir, ama şu an her ikisi birlikte kullanılıyor.

### 9.3 Slider — Tamamla veya Kaldır

Slider sayfası mevcut haliyle production'a çıkamaz. İki seçenek:

**Seçenek A:** Prisma modeli + API + bağlantı ile tamamla (2-3 günlük iş)
**Seçenek B:** Şimdilik sayfayı kaldır, sidebar'dan çıkar, URL'i 404'e yönlendir. İleriki sprintte tamamla.

Şu hâlde bırakmak kabul edilemez.

---

## 10. Son Karar

**Bu sistem orta-seviye bir proje.**

Güvenlik altyapısı (scrypt, HMAC session, rate limiting, Zod validation) gerçekten iyi tasarlanmış. TypeScript strict mode + Zod + Prisma kombinasyonu doğru seçim. Separation of concerns genel olarak tutarlı.

Ama birkaç noktada gerçek profesyonellikten sapıyor:

1. **Slider teslim edilemez halde** — mock veriyle çalışan bir özellik production'da olmamalı.
2. **Logout butonu yok** — temel bir güvenlik UX gereksinimi.
3. **Mobil menü yok** — ajans sitesi için affedilemez.
4. **Test yok** — kritik auth kodu güvensizde.
5. **Dashboard butonları çalışmıyor** — kullanıcı güveni kırılır.

"Backend tamamlandı" denmesi doğru değil. Backend tamamlandı ama slider için backend hiç yazılmadı. Bu bir tutarsızlık.

Düzgün yapılandırılmış, temiz bir iskelet üzerine inşa edilmiş; ama henüz eksik odaları olan bir bina. A kategorisine çıkmak için yaklaşık 4-6 günlük çalışma daha gerekiyor.
