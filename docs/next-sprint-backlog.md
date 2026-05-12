# Next Sprint Backlog

1. Admin auth/session altyapısı
- Admin translate endpoint token yerine gerçek session/role kontrolüne taşınmalı.

2. OpenAI provider implementasyonu
- `openai` translate provider gerçek API entegrasyonu ile tamamlanmalı.

3. Kalan accent renk token dönüşümü
- Sections/site içinde kalan 8 hex utility class `--success/--warning/--error` tokenlarına taşınmalı.

4. E2E test otomasyonu
- Route smoke, theme toggle, admin slider translate akışları Playwright ile otomatikleştirilmeli.

5. Docker CI doğrulaması
- GitHub Actions içinde docker compose up/down smoke pipeline eklenmeli.
