import Image from "next/image";
import type { PortfolioContent } from "@/types/content";
import { imageManifest } from "@/config/image-manifest";

type PortfolioPageSectionsProps = {
  content: PortfolioContent;
};

export function PortfolioPageSections({ content }: PortfolioPageSectionsProps) {
  return (
    <main className="nmd-container nmd-page-x py-[120px]">
      <div className="mb-16 text-center">
        <h1 className="nmd-headline-xl text-[color:var(--primary)]">{content.title}</h1>
        <p className="nmd-body-lg mt-4 text-[color:var(--app-muted)]">{content.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {content.categories.map((category, idx) => (
            <button className={`rounded-full px-5 py-2 text-sm font-semibold ${idx === 0 ? "bg-[color:var(--primary)] text-[color:var(--on-primary)]" : "bg-[color:var(--app-card)] text-[color:var(--primary)] border border-[color:var(--app-border)]"}`} key={category} type="button">
              {category}
            </button>
          ))}
        </div>
      </div>

      {content.projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {content.projects.map((project) => (
            <article className="group overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl" key={project.title}>
              <div className="relative h-64">
                <Image alt={project.title} className="object-cover nmd-transition group-hover:scale-105" fill quality={imageManifest.portfolio1.quality} sizes={imageManifest.portfolio1.sizes} src={imageManifest[project.image].src} />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[color:var(--primary)]">{project.title}</h2>
                <p className="mt-2 text-sm text-[color:var(--app-muted)]">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-[color:var(--app-muted)]">Henuz portfolyo icerigi eklenmedi.</p>
      )}
    </main>
  );
}
