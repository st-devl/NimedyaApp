type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company?: string;
};

type Props = {
  heading: string;
  items: Testimonial[];
};

export function TestimonialsStrip({ heading, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="nmd-container nmd-page-x">
        <h2 className="nmd-headline-md mb-12 text-center text-[color:var(--primary)]">{heading}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <article
              className="flex flex-col rounded-2xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-7"
              key={t.name}
            >
              <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <svg aria-hidden="true" fill="#d9111e" height="15" key={s} viewBox="0 0 24 24" width="15">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 text-[15px] italic leading-relaxed text-[color:var(--app-muted)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[color:var(--primary)]/10" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[color:var(--primary)]">{t.name}</p>
                  <p className="mt-0.5 text-xs text-[color:var(--app-muted)]">
                    {t.title}{t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
