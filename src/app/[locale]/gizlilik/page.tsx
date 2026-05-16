import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function PrivacyTRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Gizlilik Politikası</h1>
          <div className="prose prose-invert max-w-none space-y-4 text-[color:var(--app-text)]">
            <p>
              Nimedya olarak, kişisel verilerinizin korunması bizim için oldukça önemlidir. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde kişisel bilgileriniz hakkında bilgilendirilmeniz amacıyla hazırlanmıştır.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">1. Toplanan Bilgiler</h2>
            <p>
              Web sitemizi ziyaret ettiğinizde, aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>İletişim formları aracılığıyla gönderilen bilgiler (ad, e-posta, telefon, mesaj)</li>
              <li>İnternet protokolü (IP) adresi</li>
              <li>Tarayıcı türü ve sürümü</li>
              <li>Ziyaret ettiğiniz sayfalar</li>
              <li>Ziyaret tarihi ve saati</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">2. Bilgilerin Kullanım Amacı</h2>
            <p>
              Topladığımız bilgiler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>İletişim isteklerine yanıt vermek</li>
              <li>Hizmet kalitesini iyileştirmek</li>
              <li>Web sitesinin işlevselliğini sağlamak</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">3. Bilgilerin Paylaşılması</h2>
            <p>
              Kişisel bilgileriniz, yasal olarak zorunlu olmadığı sürece üçüncü taraflarla paylaşılmayacaktır. Teknik destek sağlayıcıları ve ödeme işlemcileri gibi hizmet sağlayıcılarla sınırlı olarak paylaşılabilir.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">4. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin korunması için endüstri standartlarında güvenlik önlemleri alıyoruz. Ancak hiçbir internet aktarımı %100 güvenli olamaz.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">5. Çerezler (Cookies)</h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">6. Haklarınız</h2>
            <p>
              KVKK çerçevesinde, kişisel verilerinize erişme, düzeltme, silme ve işlenmesine itiraz etme hakkınız vardır. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">7. İletişim</h2>
            <p>
              Bu gizlilik politikası hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
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
  return buildManagedMetadata(locale as Locale, "privacy");
}
