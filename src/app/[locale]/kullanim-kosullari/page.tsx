import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function TermsTRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Kullanım Koşulları</h1>
          <div className="prose prose-invert max-w-none space-y-4 text-[color:var(--app-text)]">
            <p>
              Bu kullanım koşulları, Nimedya web sitesinin (&quot;Site&quot;) kullanımınızı düzenleyen şartları belirtir. Siteyi kullanarak, bu koşulları kabul etmiş olursunuz.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">1. Hizmetlerin Kullanımı</h2>
            <p>
              Site, yalnızca yasal amaçlar için kullanılabilir. Telif hakkı ihlali, sahtekarlık veya diğer yasa dışı faaliyetler kesinlikle yasaktır.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
            <p>
              Site&apos;deki tüm içerik, tasarım, grafik ve diğer materyaller Nimedya&apos;nın fikri mülkiyetidir. İzinsiz kullanım, kopyalama veya dağıtım yasaktır.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">3. Kullanıcı Sorumlulukları</h2>
            <p>
              Site&apos;yi kullanırken aşağıdakilerden sorumlusunuz:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Verdiğiniz bilgilerin doğruluğu</li>
              <li>Hesabınızın güvenliğinin korunması</li>
              <li>Oturum açma kimlik bilgilerinizin gizli tutulması</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">4. Sorumluluğun Sınırlandırılması</h2>
            <p>
              Site &quot;olduğu gibi&quot; sağlanır. Nimedya, Site&apos;nin kesintisiz, hatasız veya güvenli olacağını garanti etmez.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">5. Bağlantılar</h2>
            <p>
              Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerdeki içerik için hiçbir sorumluluk taşımıyoruz.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">6. Hükülerin Değiştirilmesi</h2>
            <p>
              Nimedya, bu koşulları önceden haber vererek değiştirme hakkını saklı tutar. Değişikliklerden sonra Site&apos;yi kullanmaya devam etmek, yeni koşulları kabul etmiş anlamına gelir.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">7. Yürürlük</h2>
            <p>
              Bu koşullar yayınlanma tarihinden itibaren yürürlüktedir. Diğer tüm önceki anlaşmalar geçersizdir.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">8. İletişim</h2>
            <p>
              Kullanım koşulları hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
            </p>
          </div>
        </article>
      </main>
      <Footer locale={resolvedLocale} />
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
  return buildManagedMetadata(locale as Locale, "terms");
}
