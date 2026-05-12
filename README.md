# NimedyaApp

Nimedya ajansı için Next.js tabanlı, çift dilli (TR/EN), MariaDB entegre ve Docker-first production-ready web altyapısı.

## Teknolojiler

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Prisma ORM + MariaDB
- ESLint + Prettier
- Docker + Docker Compose

## Proje Yapısı

```text
src/
  app/
    [locale]/
      page.tsx
      layout.tsx
      about/
      services/
      portfolio/
      contact/
    api/
      health/
      db-health/
  components/
    common/
    layout/
    sections/
    ui/
  lib/
    db/
    i18n/
    seo/
    utils/
  config/
  styles/
  types/
prisma/
```

## Frontend Mimari Notları

- Page katmanı (`src/app/[locale]/*`) composition-only olacak şekilde inceltildi.
- Görsel/render blokları `src/components/sections/*` altında sorumluluk bazında ayrıldı.
- Ortak UI bileşenleri `src/components/ui/*` altında (`Button`, `Card`, `Input`, `Badge`, `SectionHeader`, `DataTable`).
- Tema sistemi token tabanlıdır (`src/styles/theme.css`) ve `ThemeProvider` ile yönetilir.
- İçerik yönetimi SSoT yaklaşımı ile `src/content/tr/*` ve `src/content/en/*` dosyalarında tutulur.
- SEO altyapısı merkezi metadata üretimi + canonical/hreflang ve `sitemap/robots` içerir.

## Dil Yapısı (i18n)

- Desteklenen diller: `tr`, `en`
- Varsayılan dil: `tr`
- URL yapısı: `/tr`, `/en`
- Locale yönlendirmesi `src/proxy.ts` ile yapılır.

## Environment Dosyaları

Hazır dosyalar:

- `.env.example`
- `.env.local`
- `.env.production.example`

Kritik değişkenler:

- `NODE_ENV`
- `DATABASE_URL`
- `MARIADB_ROOT_PASSWORD`
- `MARIADB_DATABASE`
- `MARIADB_USER`
- `MARIADB_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DEFAULT_LOCALE`
- `NEXT_PUBLIC_SUPPORTED_LOCALES`

## Local Kurulum (Docker olmadan)

```bash
npm install
cp .env.example .env.local
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Docker ile Local Kurulum

```bash
cp .env.example .env.local
npm run docker:dev
```

Yardımcı komutlar:

```bash
docker compose down
docker compose logs -f
docker compose exec app sh
```

## Database (Prisma + MariaDB)

Prisma komutları:

```bash
npm run db:generate
npm run db:migrate
npm run db:deploy
npm run db:studio
npm run db:seed
```

## Kalite Kontrolleri

```bash
npm run lint
npm run build
```

`build` scripti lint kontrolü sonrası production build alır.

## GitHub Push Adımları

Repository: `git@github.com:st-devl/NimedyaApp.git`

```bash
git status
git add .
git commit -m "Initial production-ready setup"
git branch -M main
git remote add origin git@github.com:st-devl/NimedyaApp.git
git push -u origin main
```

Not: Eğer `origin` zaten varsa önce kontrol edin:

```bash
git remote -v
git remote set-url origin git@github.com:st-devl/NimedyaApp.git
```

## Hostinger Deployment

### Senaryo A: Docker destekleniyorsa

1. Sunucuda repo çekin: `git pull origin main`
2. `.env.production` dosyasını oluşturun (Hostinger DB bilgileri ile).
3. Deploy:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

4. İzleme:

```bash
docker compose -f docker-compose.prod.yml logs -f
```

5. Migration deploy:

```bash
docker compose -f docker-compose.prod.yml exec app npm run db:deploy
```

### Senaryo B: Docker yoksa (Node.js deploy)

1. Sunucuda Node 22 LTS kurulu olmalı.
2. Repo çekin ve bağımlılıkları kurun:

```bash
npm ci
```

3. `.env.production` oluşturun.
4. Prisma migrate deploy:

```bash
npm run db:deploy
```

5. Build/start:

```bash
npm run build
npm run start
```

PM2 veya Hostinger process manager ile process'i kalıcı çalıştırın.

## Production Update Flow

```bash
git pull origin main
# .env.production değerlerini kontrol et
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml exec app npm run db:deploy
```

## Domain ve SSL Notları

- Domain DNS kaydı sunucu IP'sine yönlenmeli.
- Reverse proxy (Nginx) ile `:3000` uygulamasına yönlendirme yapılmalı.
- SSL/TLS sertifikası (Let's Encrypt veya Hostinger SSL) aktif edilmeli.
- `NEXT_PUBLIC_SITE_URL` mutlaka gerçek HTTPS domain olmalı.

## Sorun Giderme

- `DATABASE_URL` hatalarında host/port/user/password kontrol edin.
- Container healthcheck başarısızsa önce `docker compose logs -f` inceleyin.
- Prisma migration sorunlarında:
  - `npm run db:generate`
  - `npm run db:migrate` (local)
  - `npm run db:deploy` (production)
