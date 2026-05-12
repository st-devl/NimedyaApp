import { getSiteSettings } from "@/lib/cms/settings";
import type { Locale } from "@/lib/i18n/config";
import { TopNav } from "@/components/site/top-nav";

type TopNavServerProps = {
  locale: Locale;
  active?: "home" | "services" | "portfolio" | "about" | "contact";
};

export async function TopNavServer({ locale, active }: TopNavServerProps) {
  const settings = await getSiteSettings();
  return <TopNav active={active} locale={locale} logoUrl={settings.logoUrl} siteName={settings.siteName} />;
}
