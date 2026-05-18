import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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
  try {
    const settings = await getSiteSettings();
    faviconUrl = settings.faviconUrl;
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
        {children}
      </body>
    </html>
  );
}
