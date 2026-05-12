import Image from "next/image";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { getManagedProductPhotographyContent } from "@/lib/cms/public-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { imageManifest } from "@/config/image-manifest";

export default async function ProductPhotographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getManagedProductPhotographyContent(locale as Locale);

  return (
    <>
      <TopNav active="services" locale={locale as Locale} />
      <main>
        <section className="flex min-h-[820px] flex-col md:flex-row">
          <div className="w-full bg-[#f9f9fb] px-6 py-[120px] md:w-1/2 md:px-20">
            <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[#b90c17]">{t.label}</span>
            <h1 className="nmd-display-lg mb-8 text-[#001a2b]">{t.title}</h1>
            <p className="nmd-body-lg mb-10 max-w-xl text-[#42474d]">{t.desc}</p>
            <button className="rounded-lg bg-[#b90c17] px-10 py-4 text-sm font-semibold text-white nmd-transition hover:-translate-y-1">{t.cta}</button>
          </div>
          <div className="relative min-h-[420px] w-full md:w-1/2">
            <Image alt="Product Photography" className="object-cover" fill priority quality={imageManifest.productServiceHero.quality} sizes={imageManifest.productServiceHero.sizes} src={imageManifest.productServiceHero.src} />
          </div>
        </section>

        <section className="nmd-container nmd-page-x py-[120px]">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="nmd-headline-xl mb-6 text-[#001a2b]">{t.aboutTitle}</h2>
              <p className="nmd-body-lg mb-6 text-[#42474d]">Nimedya olarak urun fotografciligini sadece deklansore basmak olarak gormuyoruz.</p>
              <p className="nmd-body-md text-[#42474d]">Isigin matematigini, kompozisyonun sanatiyla birlestiriyor, e-ticaret ve kataloglar icin premium goruntu paketleri uretiyoruz.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--surface-container)]">
                <Image alt="Detail Shot" className="object-cover grayscale nmd-transition hover:grayscale-0" fill quality={imageManifest.serviceFeatured1.quality} sizes={imageManifest.serviceFeatured1.sizes} src={imageManifest.serviceFeatured1.src} />
              </div>
              <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-xl bg-[color:var(--surface-container)]">
                <Image alt="Lifestyle Shot" className="object-cover grayscale nmd-transition hover:grayscale-0" fill quality={imageManifest.serviceFeatured2.quality} sizes={imageManifest.serviceFeatured2.sizes} src={imageManifest.serviceFeatured2.src} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[color:var(--primary)] py-[120px] text-white">
          <div className="nmd-container nmd-page-x">
            <div className="mb-16 text-center">
              <h2 className="nmd-headline-xl text-[color:var(--accent-light)]">{t.processTitle}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {t.processSteps.map((step, idx) => (
                <article className="text-center" key={step}>
                  <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[color:var(--primary)] ${idx === 1 ? "bg-[color:var(--secondary)]" : "bg-[color:var(--primary-container)]"}`}>
                    <span className="text-2xl font-bold">0{idx + 1}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold">{step}</h3>
                  <p className="nmd-body-md text-[#7398b6]">Fikirden teslime disiplinli ve seffaf bir surec.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale as Locale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "productPhotography");
}
