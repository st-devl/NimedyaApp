# Breaking Changes

1. `/api/admin/translate` response contract değişti
- Eski: `{ title, description }`
- Yeni: `{ ok: true, data: { title, description } }` veya `{ ok: false, error: { code, message } }`

2. Production ortamında admin translate auth beklentisi
- Translate endpoint artık sadece admin session cookie ile erişilir
- Eski `x-admin-translate-token` başlığı ve `ADMIN_TRANSLATE_TOKEN` env alanı kaldırıldı

3. Theme altyapısı değişti
- Global invert hack kaldırıldı
- Dark mode artık token tabanlı (`ThemeProvider` + `.dark` semantic vars)

4. `next.config.ts` image remote pattern temizliği
- `lh3.googleusercontent.com` remotePattern kaldırıldı
- Görsel kaynakları local manifest üzerinden yönetiliyor
