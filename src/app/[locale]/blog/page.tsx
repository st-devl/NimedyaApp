import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts } from "@/content/blog-posts";
import { imageManifest } from "@/config/image-manifest";

export const dynamic = "force-dynamic";

const labels = {
  tr: {
    title: "Blog",
    subtitle: "Fotoğrafçılık, video prodüksiyon, web tasarım ve dijital pazarlama üzerine içerikler.",
    readMore: "Devamını Oku →",
    min: "dk okuma",
    breadcrumb: "Blog",
    home: "Ana Sayfa",
  },
  en: {
    title: "Blog",
    subtitle: "Content on photography, video production, web design and digital marketing.",
    readMore: "Read More →",
    min: "min read",
    breadcrumb: "Blog",
    home: "Home",
  },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const t = labels[resolvedLocale];
  const posts = getBlogPosts(resolvedLocale);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: t.breadcrumb, item: `https://nimedya.com/${resolvedLocale}/blog` },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav locale={resolvedLocale} />
      <main>
        <section className="nmd-container nmd-page-x py-[120px]">
          <div className="mb-16 text-center">
            <h1 className="nmd-headline-xl text-[color:var(--primary)]">{t.title}</h1>
            <p className="nmd-body-lg mx-auto mt-4 max-w-2xl text-[color:var(--app-muted)]">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const img = imageManifest[post.image];
              return (
                <Link
                  aria-label={post.title}
                  className="group block overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-xl"
                  href={`/${resolvedLocale}/blog/${post.slug}`}
                  key={post.slug}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      alt={post.title}
                      className="object-cover nmd-transition group-hover:scale-105"
                      fill
                      priority={index === 0}
                      quality={img.quality}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      src={img.src}
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{post.category}</p>
                    <h2 className="text-lg font-semibold leading-tight text-[color:var(--primary)] nmd-transition group-hover:text-[color:var(--secondary)]">{post.title}</h2>
                    <p className="mt-3 text-sm text-[color:var(--app-muted)] line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-[color:var(--app-muted)]">{post.readTime}</span>
                      <span className="text-sm font-semibold text-[color:var(--secondary)]">{t.readMore}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* Email capture / lead magnet */}
      <section className="bg-[color:var(--primary)] py-20">
        <div className="nmd-container nmd-page-x text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--secondary)]">
            {resolvedLocale === "tr" ? "HAFTALIK BÜLTEN" : "WEEKLY NEWSLETTER"}
          </p>
          <h2 className="nmd-headline-lg mb-4 text-white">
            {resolvedLocale === "tr"
              ? "Ücretsiz dijital pazarlama içerikleri"
              : "Free digital marketing insights"}
          </h2>
          <p className="nmd-body-md mx-auto mb-8 max-w-lg text-white/60">
            {resolvedLocale === "tr"
              ? "SEO, içerik stratejisi ve Trabzon işletmeleri için pratik rehberler. Haftada bir, spam yok."
              : "SEO, content strategy and practical guides for businesses. Once a week, no spam."}
          </p>
          <form
            action={`/api/contact?source=newsletter&locale=${resolvedLocale}`}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            method="POST"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              {resolvedLocale === "tr" ? "E-posta adresiniz" : "Your email address"}
            </label>
            <input
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
              id="newsletter-email"
              name="email"
              placeholder={resolvedLocale === "tr" ? "e-posta adresiniz" : "your@email.com"}
              required
              type="email"
            />
            <button
              className="rounded-xl bg-[color:var(--secondary)] px-7 py-3.5 text-sm font-semibold text-white nmd-transition hover:-translate-y-0.5 hover:opacity-90"
              type="submit"
            >
              {resolvedLocale === "tr" ? "Abone Ol" : "Subscribe"}
            </button>
          </form>
          <p className="mt-4 text-xs text-white/40">
            {resolvedLocale === "tr" ? "İstediğiniz zaman abonelikten çıkabilirsiniz." : "Unsubscribe any time."}
          </p>
        </div>
      </section>

      <Footer locale={resolvedLocale} />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildManagedMetadata(locale, "blog");
}
