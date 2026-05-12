# Lighthouse Report (6.4)

Olcum tarihi: 2026-05-11
Calisma modu: local dev server (`http://127.0.0.1:3000`) + headless Lighthouse

| Route | Perf | A11y | Best Practices | SEO | LCP | CLS | INP | TBT |
|---|---:|---:|---:|---:|---|---|---|---|
| /tr | 76 | 95 | 96 | 100 | 6.9 s | 0 | n/a | 20 ms |
| /en | 78 | 95 | 96 | 100 | 6.3 s | 0 | n/a | 40 ms |

## Notlar
- Bu rapor mevcut refactor sonu baseline olarak alindi.
- Onceki snapshot bulunmadigi icin trend/iyilesme karsilastirmasi bu noktadan itibaren yapilacak.
- LCP/CLS/INP takipleri bir sonraki optimizasyon adimlarinda ayni komutlarla tekrar alinmali.