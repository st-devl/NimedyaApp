import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { getSiteSettings } from "@/lib/cms/settings";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: "Nimedya",
  description: "Nimedya agency web platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "tr";

  let faviconUrl: string | null = null;
  let ga4Id: string | null = null;
  let gtmId: string | null = null;
  try {
    const settings = await getSiteSettings();
    faviconUrl = settings.faviconUrl;
    ga4Id = settings.ga4Id;
    gtmId = settings.gtmId;
  } catch { /* fallback silently */ }

  return (
    <html lang={locale}>
      <head>
        {faviconUrl && (
          <>
            <link href={faviconUrl} rel="icon" />
            <link href={faviconUrl} rel="shortcut icon" />
            <link href={faviconUrl} rel="apple-touch-icon" />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
              width="0"
            />
          </noscript>
        )}
        {children}
        {/* Google Tag Manager */}
        {gtmId && (
          <Script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId.replace(/'/g, "\\'").replace(/</g, "\\u003c")}');`,
            }}
            id="gtm-script"
            strategy="afterInteractive"
          />
        )}
        {/* Google Analytics 4 (only when no GTM) */}
        {ga4Id && !gtmId && (
          <>
            <Script id="ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id.replace(/'/g, "\\'").replace(/</g, "\\u003c")}');`,
              }}
              id="ga4-script"
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
