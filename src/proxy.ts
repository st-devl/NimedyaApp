import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { canonicalizeLocalePath } from "@/lib/i18n/canonical-routes";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/favicon.ico") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const [, localeSegment, ...rest] = pathname.split("/");
  if (localeSegment && locales.includes(localeSegment as (typeof locales)[number])) {
    const canonical = canonicalizeLocalePath(localeSegment as (typeof locales)[number], rest.join("/"));
    if (canonical) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeSegment}/${canonical}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
