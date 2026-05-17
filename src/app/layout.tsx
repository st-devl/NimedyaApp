import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getSiteSettings } from "@/lib/cms/settings";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    const base = settings.baseUrl.replace(/\/$/, "");
    return {
      title: settings.siteName,
      description: "Nimedya agency web platform",
      metadataBase: new URL(base),
      icons: settings.faviconUrl
        ? {
            icon: settings.faviconUrl,
            shortcut: settings.faviconUrl,
            apple: settings.faviconUrl,
          }
        : undefined,
    };
  } catch {
    return { title: "Nimedya" };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}
