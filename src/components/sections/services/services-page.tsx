import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";
import type { ServiceDetailsContent, ServicesContent } from "@/types/content";
import { imageManifest, type ImageManifestKey } from "@/config/image-manifest";

const SERVICE_IMAGES: ImageManifestKey[] = [
  "serviceFeatured1",
  "serviceFeatured2",
  "portfolio1",
  "portfolio2",
  "portfolio3",
];

type ServicesPageSectionsProps = {
  locale: Locale;
  content: ServicesContent;
  serviceDetails: ServiceDetailsContent;
};

function buildServiceHref(locale: Locale, slug: string): string {
  const base = locale === "tr" ? "hizmetler" : "services";
  return `/${locale}/${base}/${slug}`;
}

export function ServicesPageSections({ locale, content, serviceDetails }: ServicesPageSectionsProps) {
  const productPhotographyHref = localizedPath(locale, "productPhotography");

  // Map services content (by index) to detail slugs. The first service is Product
  // Photography (static route); the next 5 align with serviceDetails order.
  function detailHrefFor(index: number): string | null {
    if (index === 0) return productPhotographyHref;
    const detail = serviceDetails[index - 1];
    if (!detail) return null;
    return buildServiceHref(locale, detail.slug);
  }

  return (
    <>
      <section className="nmd-container nmd-page-x py-[120px]">
        <div className="mb-16 text-center">
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg mx-auto mt-4 max-w-3xl text-[color:var(--app-muted)]">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service, index) => {
            const detailHref = detailHrefFor(index);
            return (
              <article className="group overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl" key={service.title || index}>
                <div className="relative h-56">
                  {(() => {
                    const key = SERVICE_IMAGES[index % SERVICE_IMAGES.length];
                    const img = imageManifest[key];
                    return (
                      <Image
                        alt={service.title || "Service"}
                        className="object-cover nmd-transition group-hover:scale-105"
                        fill
                        priority={index === 0}
                        quality={img.quality}
                        sizes={img.sizes}
                        src={img.src}
                      />
                    );
                  })()}
                </div>
                <div className="flex flex-col gap-4 p-8">
                  <h2 className="text-xl font-semibold text-[color:var(--primary)]">{service.title}</h2>
                  <p className="nmd-body-md flex-1 text-[color:var(--app-muted)]">{service.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      className="inline-flex min-h-[44px] items-center rounded-lg bg-[color:var(--secondary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--on-secondary)] nmd-transition hover:-translate-y-0.5 hover:opacity-90"
                      href={`${localizedPath(locale, "contact")}?hizmet=${encodeURIComponent(service.title)}`}
                    >
                      {locale === "tr" ? "Teklif Al" : "Get a Quote"}
                    </Link>
                    {detailHref && (
                      <Link
                        className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-[color:var(--app-muted)] underline-offset-4 nmd-transition hover:text-[color:var(--primary)] hover:underline"
                        href={detailHref}
                      >
                        {locale === "tr" ? "Hizmet Detayları →" : "Service Details →"}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link className="inline-flex rounded-xl bg-[color:var(--primary)] px-10 py-4 text-sm font-semibold text-[color:var(--on-primary)] nmd-transition hover:-translate-y-1 hover:opacity-90" href={productPhotographyHref}>{content.cta}</Link>
        </div>
      </section>
    </>
  );
}
