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
          <p className="mb-2 text-sm text-[color:var(--app-muted)]">Son güncelleme: 17 Mayıs 2025</p>
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
          <div className="space-y-4 text-[color:var(--app-text)]">
            <p>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla Nimedya tarafından hazırlanmıştır.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">1. Veri Sorumlusunun Kimliği</h2>
            <p>
              <strong>Ticaret Unvanı:</strong> Nimedya<br />
              <strong>Adres:</strong> Trabzon, Türkiye<br />
              <strong>E-posta:</strong> info@nimedya.com<br />
              <strong>Web Sitesi:</strong> https://nimedya.com
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">2. İşlenen Kişisel Veriler ve Kategoriler</h2>
            <p>Hizmetlerimizi sunarken aşağıdaki kişisel veri kategorilerini işlemekteyiz:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Kimlik Verileri:</strong> Ad, soyad</li>
              <li><strong>İletişim Verileri:</strong> E-posta adresi, telefon numarası, şehir/adres bilgisi</li>
              <li><strong>Talep / Mesaj İçeriği:</strong> İletişim formları aracılığıyla iletilen proje detayları ve mesajlar</li>
              <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü/sürümü, ziyaret tarihi ve saati, sayfa görüntülemeleri</li>
              <li><strong>Çerez Verileri:</strong> Oturum çerezleri ve işlevsel çerezler aracılığıyla elde edilen tercih bilgileri</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">3. Kişisel Verilerin İşlenme Amaçları ve Hukuki Dayanakları</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--app-border)]">
                    <th className="py-3 pr-6 text-left font-semibold text-[color:var(--primary)]">Amaç</th>
                    <th className="py-3 text-left font-semibold text-[color:var(--primary)]">Hukuki Dayanak (KVKK m.5)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--app-border)]/50">
                  <tr>
                    <td className="py-3 pr-6">İletişim taleplerine yanıt vermek</td>
                    <td className="py-3">Bir sözleşmenin kurulması / meşru menfaat</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Proje tekliflerini hazırlamak</td>
                    <td className="py-3">Sözleşme öncesi adımlar</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Hizmet kalitesini iyileştirmek</td>
                    <td className="py-3">Meşru menfaat</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Yasal yükümlülükleri yerine getirmek</td>
                    <td className="py-3">Kanuni yükümlülük</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Web sitesi güvenliğini sağlamak</td>
                    <td className="py-3">Meşru menfaat</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="nmd-headline-md mt-10 mb-4">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz; yasal zorunluluk olmadıkça üçüncü taraflara aktarılmamaktadır. Yalnızca aşağıdaki kategorilerle ve sınırlı ölçüde paylaşılabilir:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Altyapı ve Barındırma Sağlayıcıları:</strong> Web sitesi ve veritabanı sunucusunu işleten hizmet sağlayıcılar (KVKK m.8 kapsamında veri işleyen sıfatıyla)</li>
              <li><strong>E-posta Hizmetleri:</strong> İletişim formu mesajlarının iletimi için kullanılan sağlayıcılar</li>
              <li><strong>Yetkili Kamu Kurum ve Kuruluşları:</strong> Yasal yükümlülük doğrultusunda ilgili kurumlara</li>
            </ul>
            <p>Yurt dışına veri aktarımı yapılmamaktadır.</p>

            <h2 className="nmd-headline-md mt-10 mb-4">5. Çerez (Cookie) Politikası</h2>
            <p>Web sitemizde aşağıdaki çerez kategorileri kullanılmaktadır:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevselliğini sağlar; devre dışı bırakılamaz.</li>
              <li><strong>İşlevsel Çerezler:</strong> Dil ve tercih ayarlarınızı hatırlar. Kapatılabilir.</li>
              <li><strong>Analitik Çerezler:</strong> Ziyaretçi davranışını anonim olarak analiz eder. Tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz.</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">6. Veri Saklama Süreleri</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>İletişim formu verileri: Proje teklifinin sonuçlandığı tarihten itibaren <strong>3 yıl</strong></li>
              <li>Müşteri proje dosyaları: Son işlem tarihinden itibaren <strong>10 yıl</strong> (ticari defterlere ilişkin Türk Ticaret Kanunu yükümlülükleri kapsamında)</li>
              <li>Teknik log verileri: <strong>1 yıl</strong></li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">7. KVKK Kapsamında Haklarınız (m. 11)</h2>
            <p>Kişisel veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
              <li>KVKK&apos;nın 7. maddesi kapsamında silinmesini / yok edilmesini isteme</li>
              <li>Düzeltme ve silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>Otomatik sistemler vasıtasıyla aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde tazminat talep etme</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">8. Başvuru Yöntemi</h2>
            <p>
              Yukarıdaki haklarınızı kullanmak için aşağıdaki kanallardan başvurabilirsiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>E-posta:</strong> info@nimedya.com (konu: KVKK Başvurusu)</li>
              <li><strong>Posta:</strong> Trabzon adresimize kimliğinizi ispatlayan belgelerle ıslak imzalı dilekçe</li>
            </ul>
            <p>
              Başvurularınız, kimliğinizin doğrulanmasının ardından en geç <strong>30 gün</strong> içinde yanıtlanacaktır. Talebin niteliğine göre ek süre ve bilgi istenebilir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">9. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin korunması için teknik ve idari güvenlik önlemleri uygulanmaktadır: şifreli bağlantı (HTTPS/TLS), erişim kısıtlamaları ve düzenli güvenlik denetimleri. Hiçbir internet aktarımı %100 güvenli olmamakla birlikte, endüstri standartlarında en iyi uygulamalar hayata geçirilmektedir.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">10. İletişim</h2>
            <p>
              Bu aydınlatma metni hakkında sorularınız için <strong>info@nimedya.com</strong> adresine e-posta gönderebilirsiniz.
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
