# Docker Validation

Tarih: 2026-05-11

## Doğrulama Sonuçları
- `docker compose config` (dev): PASS
- `docker compose -f docker-compose.prod.yml config` (prod): PASS

Bu doğrulama compose tanımlarının sözdizimi, env interpolasyonu ve servis wiring yapısının geçerli olduğunu kanıtlar.

## Not
- Bu çalışma ortamında Docker daemon socket erişimi olmadığı için runtime `up/ps/down` komutları çalıştırılamadı.
- Docker daemon erişimi olan bir hostta aşağıdaki 3 komutla runtime smoke anında tamamlanır:
  1. `docker compose up -d --build`
  2. `docker compose ps`
  3. `docker compose down`
