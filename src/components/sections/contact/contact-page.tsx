import type { ContactContent } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { getSiteSettings } from "@/lib/cms/settings";

type ContactPageSectionsProps = {
  content: ContactContent;
  locale: Locale;
};

export async function ContactPageSections({ content, locale }: ContactPageSectionsProps) {
  const settings = await getSiteSettings();

  return (
    <section className="nmd-container nmd-page-x py-[120px]">
      <SectionHeader align="center" as="h1" description={content.text} title={content.title} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="nmd-headline-md mb-6 text-[color:var(--primary)]">{content.formTitle}</h2>
          <ContactForm labels={content.labels} locale={locale} sendLabel={content.send} />
        </Card>

        <Card className="p-8">
          <h2 className="nmd-headline-md mb-6 text-[color:var(--primary)]">{content.hqTitle}</h2>
          <p className="nmd-body-md mb-4 text-[color:var(--app-muted)]">{content.city}</p>
          {settings.contactEmail && <p className="nmd-body-md mb-2 text-[color:var(--app-muted)]">{settings.contactEmail}</p>}
          {settings.contactPhone && <p className="nmd-body-md text-[color:var(--app-muted)]">{settings.contactPhone}</p>}
        </Card>
      </div>
    </section>
  );
}
