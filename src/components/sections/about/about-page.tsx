import Image from "next/image";
import type { AboutContent } from "@/types/content";
import { imageManifest } from "@/config/image-manifest";

type AboutPageSectionsProps = {
  content: AboutContent;
};

export function AboutPageSections({ content }: AboutPageSectionsProps) {
  return (
    <main>
      <section className="flex min-h-[820px] flex-col md:flex-row">
        <div className="w-full px-6 py-[120px] md:w-1/2 md:px-20">
          <span className="nmd-label-sm mb-4 block uppercase tracking-widest text-[color:var(--secondary)]">{content.pretitle}</span>
          <h1 className="nmd-display-lg mb-8 text-[color:var(--primary)]">{content.title}</h1>
          <p className="nmd-body-lg max-w-xl text-[color:var(--app-muted)]">{content.text}</p>
        </div>
        <div className="relative min-h-[420px] w-full md:w-1/2">
          <Image alt="Team" className="object-cover" fill priority quality={imageManifest.aboutHero.quality} sizes={imageManifest.aboutHero.sizes} src={imageManifest.aboutHero.src} />
        </div>
      </section>

      <section className="bg-[color:var(--surface-container-low)] py-[120px]">
        <div className="nmd-container nmd-page-x">
          <h2 className="nmd-headline-xl mb-16 text-center text-[color:var(--primary)]">{content.valuesTitle}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.values.map((item) => (
              <article className="rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-10 shadow-sm nmd-transition hover:-translate-y-1 hover:shadow-2xl" key={item.title}>
                <h3 className="nmd-headline-md mb-4 text-[color:var(--primary)]">{item.title}</h3>
                <p className="nmd-body-md text-[color:var(--app-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nmd-container nmd-page-x py-[120px]">
        <h2 className="nmd-headline-xl mb-16 text-[color:var(--primary)]">{content.teamTitle}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.team.map((name, i) => (
            <article className="group relative aspect-[3/4] overflow-hidden rounded-xl" key={name}>
              <Image alt={name} className="object-cover nmd-transition group-hover:scale-110" fill quality={imageManifest.team1.quality} sizes={imageManifest.team1.sizes} src={i === 0 ? imageManifest.team1.src : i === 1 ? imageManifest.team2.src : i === 2 ? imageManifest.team3.src : imageManifest.aboutWorkspace.src} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--primary)]/80 to-transparent p-6">
                <h3 className="text-2xl font-semibold text-white">{name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
