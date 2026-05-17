import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getSiteSettings } from "@/lib/cms/settings";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: "Nimedya",
  description: "Nimedya agency web platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let faviconUrl: string | null = null;
  try {
    const settings = await getSiteSettings();
    faviconUrl = settings.faviconUrl;
  } catch { /* fallback silently */ }

  return (
    <html lang="tr">
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
