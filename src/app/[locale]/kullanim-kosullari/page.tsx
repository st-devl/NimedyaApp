import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function TermsTRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <p className="mb-2 text-sm text-[color:var(--app-muted)]">Son güncelleme: 17 Mayıs 2025</p>
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Kullanım Koşulları</h1>
          <div className="space-y-4 text-[color:var(--app-text)]">
            <p>
              Bu Kullanım Koşulları, Nimedya web sitesinin (&quot;Site&quot;) ve sunulan hizmetlerin kullanımını düzenleyen şartları belirtir. Siteyi kullanarak bu koşulları kabul etmiş olursunuz.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">1. Hizmetin Kapsamı</h2>
            <p>
              Nimedya; ürün fotoğrafçılığı, tanıtım filmi ve video prodüksiyon, marka kimliği tasarımı, web tasarım ve geliştirme, SEO ve dijital pazarlama danışmanlığı hizmetleri sunmaktadır. Her hizmetin detaylı kapsamı, proje başlamadan önce yazılı olarak iki tarafça imzalanan proje sözleşmesinde belirlenir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">2. Hizmetlerin Kullanımı</h2>
            <p>
              Site yalnızca yasal amaçlarla kullanılabilir. Aşağıdaki eylemler kesinlikle yasaktır:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Sitenin içeriğini izinsiz kopyalamak, çoğaltmak veya dağıtmak</li>
              <li>Sisteme yetkisiz erişim girişiminde bulunmak</li>
              <li>Zararlı yazılım yaymak veya Siteyi bozmaya çalışmak</li>
              <li>Yanıltıcı ya da yanlış bilgi iletmek</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">3. Fikri Mülkiyet Hakları</h2>
            <p>
              Sitedeki tüm metin, tasarım, grafik, logo ve diğer materyaller Nimedya&apos;ya aittir ve fikri mülkiyet hukukuyla korunmaktadır. İzinsiz kullanım yasaktır.
            </p>
            <p>
              Nimedya tarafından üretilen içerikler (fotoğraf, video, tasarım vb.) telif ücreti ödenmeden ve yazılı izin alınmadan üçüncü taraflarla paylaşılamaz veya ticari amaçla kullanılamaz. Proje sözleşmesinde aksi belirtilmedikçe, teslim edilen içeriklerin kullanım hakları belirlenen hizmet kapsamıyla sınırlıdır.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">4. Ödeme ve Fatura Koşulları</h2>
            <p>
              Proje ücretleri proje sözleşmesinde belirtilir. Genel ödeme yapısı şu şekildedir:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Başlangıç Ödemesi (%50):</strong> Projenin başlaması için ön ödeme gereklidir.</li>
              <li><strong>Teslim Ödemesi (%50):</strong> Nihai dosyaların tesliminden önce tahsil edilir.</li>
            </ul>
            <p>
              Ödeme takvimi proje türüne ve kapsamına göre farklılık gösterebilir; mutabık kalınan oran sözleşmede yazılı biçimde belirlenir. Ödemeler; banka havalesi, EFT veya mutabık kalınan diğer yöntemlerle gerçekleştirilebilir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">5. İptal ve İade Politikası</h2>
            <p>
              Proje başlandıktan sonra yapılan iptallerde, tamamlanan çalışma oranına göre ücret tahsil edilir. Başlangıç ödemesi, projeye ayrılan zaman ve kaynaklar nedeniyle iade edilemez. İptal taleplerinin yazılı olarak iletilmesi gerekmektedir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">6. Revizyon ve Değişiklik Talepleri</h2>
            <p>
              Proje sözleşmesinde belirtilen revizyon sayısı ücrete dahildir. Kapsam dışı ek talepler, güncel liste fiyatları üzerinden ayrıca faturalandırılır.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">7. Gizlilik ve Veri Koruma</h2>
            <p>
              Kişisel verilerin işlenmesine ilişkin bilgiler <a className="text-[color:var(--secondary)] underline underline-offset-2" href="/tr/gizlilik">Gizlilik Politikamızda</a> ayrıntılı biçimde açıklanmaktadır.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">8. Sorumluluğun Sınırlandırılması</h2>
            <p>
              Site &quot;olduğu gibi&quot; sunulmaktadır. Nimedya, Sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Bağlantı kopukluğu, teknik arıza veya üçüncü taraf kaynaklı aksaklıklardan doğabilecek dolaylı zararlar için sorumluluk kabul edilmemektedir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">9. Üçüncü Taraf Bağlantılar</h2>
            <p>
              Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriği, gizlilik politikaları veya güvenilirliği konusunda herhangi bir sorumluluk taşımıyoruz.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">10. Koşulların Değiştirilmesi</h2>
            <p>
              Nimedya, bu Kullanım Koşullarını önceden bildirmeksizin güncelleme hakkını saklı tutar. Değişiklikler Sitede yayınlandığı tarihten itibaren yürürlüğe girer. Güncel versiyona bu sayfa üzerinden ulaşabilirsiniz.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">11. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
            <p>
              Bu Koşullar Türk Hukuku&apos;na tabidir. Uyuşmazlıkların çözümünde <strong>Trabzon Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">12. İletişim</h2>
            <p>
              Kullanım koşulları hakkında sorularınız için <strong>info@nimedya.com</strong> adresine e-posta gönderebilirsiniz.
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
