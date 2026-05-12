import type { ContactContent } from "@/types/content";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact/contact-form";

type ContactPageSectionsProps = {
  content: ContactContent;
};

export function ContactPageSections({ content }: ContactPageSectionsProps) {
  return (
    <main className="nmd-container nmd-page-x py-[120px]">
      <SectionHeader align="center" description={content.text} title={content.title} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="nmd-headline-md mb-6 text-[color:var(--primary)]">{content.formTitle}</h2>
          <ContactForm labels={content.labels} sendLabel={content.send} />
        </Card>

        <Card className="p-8">
          <h2 className="nmd-headline-md mb-6 text-[color:var(--primary)]">{content.hqTitle}</h2>
          <p className="nmd-body-md mb-4 text-[color:var(--app-muted)]">{content.city}</p>
          <p className="nmd-body-md mb-2 text-[color:var(--app-muted)]">hello@nimedya.com</p>
          <p className="nmd-body-md text-[color:var(--app-muted)]">+90 5xx xxx xx xx</p>
          <div className="mt-8 rounded-xl bg-[color:var(--surface-container)] p-12 text-center text-[color:var(--app-muted)]">Harita Alani</div>
        </Card>
      </div>
    </main>
  );
}
