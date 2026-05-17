type Brand = { name: string; sector: string };

type Props = {
  brandsTitle: string;
  brands: Brand[];
};

export function BrandsSection({ brandsTitle, brands }: Props) {
  if (brands.length === 0) return null;

  const featured = brands[0];
  const mini = brands.slice(1, 3);
  const allLogos = brands;

  return (
    <section
      className="relative overflow-hidden py-[110px]"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, rgba(217,17,30,0.06), transparent 34%), linear-gradient(180deg,#f4f5f6 0%,#eef0f2 100%)",
        color: "var(--primary)",
      }}
    >
      {/* top rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[38px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(7,17,31,.12), transparent)",
        }}
      />

      <div className="nmd-container nmd-page-x">
        {/* Header row */}
        <div className="mb-12 grid grid-cols-1 items-end gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span
              className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em]"
              style={{ color: "var(--secondary)" }}
            >
              <span
                className="h-px w-8 shrink-0"
                style={{ background: "var(--secondary)" }}
              />
              {brandsTitle}
            </span>
            <h2
              className="m-0 max-w-lg font-extrabold leading-none"
              style={{
                fontSize: "clamp(34px, 4.6vw, 58px)",
                letterSpacing: "-0.065em",
                color: "var(--primary)",
              }}
            >
              Markaların dijital yüzünü birlikte güçlendiriyoruz.
            </h2>
          </div>
          <p
            className="m-0 max-w-lg text-base font-medium leading-[1.8]"
            style={{ color: "rgba(7,17,31,.58)" }}
          >
            Büyüme aşamasındaki markalar için stratejik kreatif üretim yapıyoruz; fotoğraf, video, web ve içerik süreçlerini bütünleşik bir sistem olarak yönetiyoruz.
          </p>
        </div>

        {/* Showcase card */}
        <div
          className="relative rounded-[34px] p-px shadow-[0_28px_90px_rgba(7,17,31,.08)]"
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,.95),rgba(7,17,31,.09),rgba(217,17,30,.16))",
          }}
        >
          <div
            className="relative overflow-hidden rounded-[33px] p-8 md:p-[34px]"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,255,255,.88),rgba(255,255,255,.58)), linear-gradient(180deg,rgba(0,35,51,.03),rgba(0,35,51,.06))",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* grid pattern */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(7,17,31,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(7,17,31,.035) 1px,transparent 1px)",
                backgroundSize: "42px 42px",
                maskImage: "linear-gradient(to bottom,black,transparent 80%)",
              }}
            />

            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1.15fr_.85fr]">
              {/* Featured card */}
              {featured && (
                <article
                  className="flex min-h-[360px] flex-col justify-end rounded-[28px] p-8 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)] md:min-h-[390px]"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(3,8,18,.88),rgba(3,8,18,.22)), linear-gradient(135deg,#0d1f38,#1a0a10)",
                  }}
                >
                  {/* decorative circles */}
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
                    aria-hidden
                  >
                    <div
                      className="absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-20"
                      style={{ background: "radial-gradient(circle,#d9111e,transparent 65%)" }}
                    />
                    <div
                      className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full opacity-10"
                      style={{ background: "radial-gradient(circle,#4a7fa5,transparent 65%)" }}
                    />
                  </div>
                  <div className="relative">
                    <small
                      className="block text-[11px] font-extrabold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(255,255,255,.72)" }}
                    >
                      {featured.sector}
                    </small>
                    <h3
                      className="mb-3 mt-3.5 font-extrabold leading-none text-white"
                      style={{
                        fontSize: "clamp(30px, 3.4vw, 48px)",
                        letterSpacing: "-0.055em",
                      }}
                    >
                      {featured.name}
                    </h3>
                    <p
                      className="m-0 max-w-sm text-sm font-medium leading-[1.75]"
                      style={{ color: "rgba(255,255,255,.65)" }}
                    >
                      Ürün sunumu, kategori mimarisi ve satış odaklı dijital deneyim için modern bir görsel dil oluşturuldu.
                    </p>
                  </div>
                </article>
              )}

              {/* Mini cards stack */}
              {mini.length > 0 && (
                <div className="flex flex-col gap-4">
                  {mini.map((brand, i) => (
                    <article
                      key={brand.name}
                      className="flex min-h-[186px] flex-1 overflow-hidden rounded-[26px] border bg-white shadow-[0_18px_50px_rgba(7,17,31,.045)]"
                      style={{ borderColor: "rgba(7,17,31,.075)" }}
                    >
                      {/* color accent strip */}
                      <div
                        className="w-2 shrink-0"
                        style={{
                          background:
                            i === 0
                              ? "linear-gradient(180deg,#d9111e,#8b0a12)"
                              : "linear-gradient(180deg,#1a3a5c,#0d1f38)",
                        }}
                      />
                      <div className="flex flex-col justify-center p-6">
                        <small
                          className="block text-[10px] font-extrabold uppercase tracking-[0.13em]"
                          style={{ color: "var(--secondary)" }}
                        >
                          {brand.sector}
                        </small>
                        <h3
                          className="mb-2 mt-2.5 font-extrabold leading-tight"
                          style={{
                            fontSize: "21px",
                            letterSpacing: "-0.04em",
                            color: "var(--primary)",
                          }}
                        >
                          {brand.name}
                        </h3>
                        <p
                          className="m-0 text-[13px] font-medium leading-[1.65]"
                          style={{ color: "rgba(7,17,31,.56)" }}
                        >
                          {i === 0
                            ? "Klinik algısını güçlendiren web, içerik ve görsel üretim desteği."
                            : "Sezonluk kampanya, ürün fotoğrafı ve sosyal medya kreatifleri."}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Logo strip */}
            <div
              className="relative mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border px-6 py-5 md:flex-nowrap"
              style={{
                background: "rgba(255,255,255,.58)",
                borderColor: "rgba(7,17,31,.07)",
              }}
            >
              <span
                className="shrink-0 text-[12px] font-bold uppercase tracking-[0.08em]"
                style={{ color: "rgba(7,17,31,.42)" }}
              >
                Seçili İş Ortakları
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {allLogos.map((brand) => (
                  <span
                    key={brand.name}
                    className="block text-[15px] font-extrabold"
                    style={{
                      letterSpacing: "-0.02em",
                      color: "rgba(7,17,31,.54)",
                    }}
                  >
                    {brand.name}
                    <span
                      className="mt-1.5 block h-px origin-left"
                      style={{
                        background: "rgba(217,17,30,.28)",
                        transform: "scaleX(0.35)",
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
