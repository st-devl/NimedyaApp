import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import type { ServicesContent } from "@/types/content";
import { imageManifest } from "@/config/image-manifest";

type ServicesPageSectionsProps = {
  locale: Locale;
  content: ServicesContent;
};

export function ServicesPageSections({ locale, content }: ServicesPageSectionsProps) {
  return (
    <main>
      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-16 text-center">
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg mx-auto mt-4 max-w-3xl text-[color:var(--app-muted)]">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service, index) => (
            <article className="group overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl" key={service}>
              <div className="relative h-56">
                <Image
                  alt={service}
                  className="object-cover nmd-transition group-hover:scale-105"
                  fill
                  quality={imageManifest.serviceFeatured1.quality}
                  sizes={imageManifest.serviceFeatured1.sizes}
                  src={index % 2 === 0 ? imageManifest.serviceFeatured1.src : imageManifest.homeHero.src}
                />
              </div>
              <div className="p-8">
                <h2 className="nmd-headline-md mb-3 text-[color:var(--primary)]">{service}</h2>
                <p className="nmd-body-md text-[color:var(--app-muted)]">Premium goruntu dili ve stratejik yaklasimla olceklenebilir dijital etki.</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link className="inline-flex rounded-lg bg-[color:var(--primary)] px-10 py-4 text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90" href={localizedPath(locale, "productPhotography")}>{content.cta}</Link>
        </div>
      </section>
    </main>
  );
}
