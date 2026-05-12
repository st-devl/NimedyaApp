# Hardcoded Content Inventory

## Summary
Hardcoded page-level copy still exists in these files:

- `src/app/[locale]/services/page.tsx`
- `src/app/[locale]/services/product-photography/page.tsx`
- `src/app/[locale]/portfolio/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/admin/page.tsx`
- `src/app/[locale]/admin/slider/page.tsx`

## messages.ts usage gap
`src/lib/i18n/messages.ts` currently is not the source of truth for page content.
Most page content is embedded in page-local objects or literal strings.

## Refactor target
Move all public/admin copy to `src/content/{tr,en}/*.ts` and consume via typed selectors.
