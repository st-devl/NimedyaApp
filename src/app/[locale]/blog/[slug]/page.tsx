import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/content/blog-posts";
import { imageManifest } from "@/config/image-manifest";

export const dynamic = "force-dynamic";

type RouteParams = { locale: string; slug: string };

const labels = {
  tr: { home: "Ana Sayfa", blog: "Blog", back: "← Blog'a Dön", related: "İlgili Yazılar", readMore: "Devamını Oku →" },
  en: { home: "Home", blog: "Blog", back: "← Back to Blog", related: "Related Articles", readMore: "Read More →" },
};

export default async function BlogPostPage({ params }: { params: Promise<RouteParams> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const post = getBlogPost(resolvedLocale, slug);
  if (!post) notFound();

  const t = labels[resolvedLocale];
  const img = imageManifest[post.image];

  const related = getBlogPosts(resolvedLocale)
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "Nimedya", url: "https://nimedya.com" },
    publisher: {
      "@type": "Organization",
      name: "Nimedya",
      logo: { "@type": "ImageObject", url: "https://nimedya.com/images/logo.svg" },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: `https://nimedya.com${img.src}`,
    inLanguage: resolvedLocale === "tr" ? "tr-TR" : "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `https://nimedya.com/${resolvedLocale}` },
      { "@type": "ListItem", position: 2, name: t.blog, item: `https://nimedya.com/${resolvedLocale}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://nimedya.com/${resolvedLocale}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <TopNav locale={resolvedLocale} />
      <main>
        <article>
          {/* Hero */}
          <div className="relative h-[50vh] min-h-[380px] w-full overflow-hidden">
            <Image
              alt={post.title}
              className="object-cover"
              fill
              priority
              quality={img.quality}
              sizes="100vw"
              src={img.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 nmd-container nmd-page-x pb-12">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--secondary)]">{post.category}</p>
              <h1 className="nmd-headline-xl max-w-3xl text-white">{post.title}</h1>
              <p className="mt-3 text-sm text-white/70">{post.readTime} · {new Date(post.publishedAt).toLocaleDateString(resolvedLocale === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>

          {/* Body */}
          <section className="nmd-container nmd-page-x py-16">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-sm text-[color:var(--app-muted)]">
                  <li><Link className="nmd-transition hover:text-[color:var(--primary)]" href={`/${resolvedLocale}`}>{t.home}</Link></li>
                  <li>/</li>
                  <li><Link className="nmd-transition hover:text-[color:var(--primary)]" href={`/${resolvedLocale}/blog`}>{t.blog}</Link></li>
                  <li>/</li>
                  <li className="text-[color:var(--primary)]">{post.title}</li>
                </ol>
              </nav>

              <div className="prose prose-lg max-w-none text-[color:var(--app-muted)]">
                {post.body.map((paragraph, i) => {
                  if (paragraph.startsWith("**") && paragraph.includes("**\n\n")) {
                    const [heading, ...rest] = paragraph.split("**\n\n");
                    const headingText = heading.replace(/^\*\*/, "");
                    return (
                      <div key={i}>
                        <h2 className="mt-8 mb-3 text-xl font-semibold text-[color:var(--primary)]">{headingText}</h2>
                        <p className="nmd-body-md">{rest.join("\n\n")}</p>
                      </div>
                    );
                  }
                  return <p className="nmd-body-md mb-5" key={i}>{paragraph}</p>;
                })}
              </div>

              {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span className="rounded-full border border-[color:var(--app-border)] px-4 py-1.5 text-xs font-medium text-[color:var(--app-muted)]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <Link
                  className="text-sm font-semibold text-[color:var(--secondary)] nmd-transition hover:opacity-70"
                  href={`/${resolvedLocale}/blog`}
                >
                  {t.back}
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-[color:var(--surface-container)] py-16">
            <div className="nmd-container nmd-page-x">
              <h2 className="nmd-headline-md mb-8 text-[color:var(--primary)]">{t.related}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {related.map((p) => {
                  const relImg = imageManifest[p.image];
                  return (
                    <Link
                      aria-label={p.title}
                      className="group flex gap-4 overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-4 nmd-transition hover:shadow-lg"
                      href={`/${resolvedLocale}/blog/${p.slug}`}
                      key={p.slug}
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          alt={p.title}
                          className="object-cover nmd-transition group-hover:scale-105"
                          fill
                          quality={relImg.quality}
                          sizes="112px"
                          src={relImg.src}
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--secondary)]">{p.category}</p>
                        <h3 className="text-sm font-semibold leading-snug text-[color:var(--primary)]">{p.title}</h3>
                        <p className="mt-1 text-xs text-[color:var(--secondary)] font-medium">{t.readMore}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale={resolvedLocale} />
    </>
  );
}

export function generateStaticParams() {
  return [...getBlogPosts("tr"), ...getBlogPosts("en")].map((p) => ({
    locale: p.locale,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getBlogPost(locale as Locale, slug);
  if (!post) return {};

  const img = imageManifest[post.image];
  const canonicalPath = `/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | Nimedya Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${post.title} | Nimedya Blog`,
      description: post.description,
      url: canonicalPath,
      siteName: "Nimedya",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: `https://nimedya.com${img.src}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Nimedya Blog`,
      description: post.description,
      images: [{ url: `https://nimedya.com${img.src}`, width: 1200, height: 630, alt: post.title }],
    },
  };
}
