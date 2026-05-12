# Task Complexity Mapping — Haiku vs Sonnet

**Kategorilendirme Kriteri:**
- **Haiku** (🤖 Claude Haiku): Basit, tek dosya, tekrar eden pattern, az karar
- **Sonnet** (🧠 Claude Sonnet): Karmaşık logic, mimari karar, çok dosya, debug gerekir

---

## ✅ Tamamlanan Tasks (Haiku + Sonnet)
- A-1 through A-5 — Tamamlandı
- B-1, B-2 — Tamamlandı

---

## 🤖 HAIKU TASKS (Basit Değişiklikler)

### Kalan B Grubu
- **B-4** ✨ Dashboard system status widget'ını health endpoints'e bağla
  - Fetch + state gösterme
  - 2-3 dosya
  - Basit API entegrasyonu

### C Grubu — Kod Temizliği
- **C-1** 🗑️ page-metadata.ts wrapper'ını kaldır
  - Basit find-replace
  - Import yeniden yönlendirme
  - 1 dosyayı silip, ~10 dosyayı güncelle

- **C-5** 🎨 Hardcoded hex renkleri CSS variable'lara
  - Styling değişikliği
  - ~18 satır renk değişimi
  - Tekrar eden pattern

- **C-6** 🔗 Footer yasal linkler (href="#" → nofollow veya kaldır)
  - Minimal HTML değişikliği
  - 2 link güncelle

### D Grubu — Uzun Vade (Haiku)
- **D-2** 📄 KVKK/Gizlilik Politikası sayfası oluştur
  - Content creation
  - 2 sayfa oluştur (tr/en)
  - Routing setup

- **D-3** 📄 Kullanım Koşulları sayfası oluştur
  - Content creation
  - 2 sayfa oluştur (tr/en)
  - Routing setup

---

## 🧠 SONNET TASKS (Karmaşık, Mimari)

### Kalan B Grubu
- **B-5** ⚡ Rate limiting DB → in-memory LRU cache
  - Yeni cache algorithm
  - Tüm rate limit çağrılarını update et
  - Test gerekli (threshold'lara göre davranış)
  - 5+ dosya değişikliği

### C Grubu — Kod Temizliği (Karmaşık)
- **C-2** 📝 Dashboard hardcoded string'leri content sistemine al
  - Multiple hardcoded string'leri identify + refactor
  - Content type extension
  - 2-3 dosya değişikliği
  - Content flow logic

- **C-3** 🌐 Footer i18n string'lerini düzelt
  - Locale handling
  - UI state complexity
  - Footer bileşeninde refactor
  - Mixed i18n approaches

- **C-4** 🎨 Admin sidebar hardcoded renkleri CSS variable'a
  - Tema sistem entegrasyonu
  - Dark mode compatibility
  - 2 dosya (component + CSS)

### D Grubu — Uzun Vade (Sonnet)
- **D-1** 🎪 Slider modülü tamamlama
  - Prisma model + migration
  - API routes (CRUD)
  - Form handler
  - Sidebar entegrasyonu
  - **Effort: Çok Yüksek** (3+ gün)

- **D-4** ✅ Vitest unit testleri (auth, password)
  - Test setup + configuration
  - Mock stratejisi
  - Auth flow testing

- **D-5** ✅ Integration testleri (API + content)
  - Database mocking/fixtures
  - API endpoint testing
  - Complex scenarios

- **D-6** 🎭 Playwright e2e testleri
  - Browser automation
  - Full user journeys
  - Screenshot comparison
  - Flakiness handling

- **D-7** 📊 Pino structured logging
  - Logger setup
  - Event streaming
  - All APIs'ye logging ekle
  - Production monitoring

- **D-8** 🔄 GitHub Actions CI/CD
  - Workflow setup
  - Job orchestration
  - Artifact caching
  - Environment management

- **D-9** 👥 Admin kullanıcı yönetimi
  - Database schema extend
  - Admin page oluştur
  - CRUD APIs
  - Permission logic
  - Password reset flow

---

## 📊 Summary

| Grup | Haiku | Sonnet | Toplam |
|------|-------|--------|--------|
| B | 1 | 1 | 2 |
| C | 3 | 2 | 5 |
| D | 2 | 7 | 9 |
| **TOPLAM** | **6** | **10** | **16** |

---

## Önerilen Paralel Çalışma

### Haiku Stream (Hızlı, 1-2 saat)
1. B-4 (30 min)
2. C-1 (15 min)
3. C-5 (20 min)
4. C-6 (10 min)
5. D-2 (20 min)
6. D-3 (20 min)

### Sonnet Stream (Derinlemesine, 2-3 gün)
1. B-5 (2 saat)
2. C-2 (1.5 saat)
3. C-3 (1 saat)
4. C-4 (1 saat)
5. D-1 (3+ saat)
6. D-4 (2 saat)
7. D-5 (2 saat)
8. D-6 (3 saat)
9. D-7 (2 saat)
10. D-8 (2 saat)
11. D-9 (3 saat)
