import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function TermsENPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Terms of Use</h1>
          <div className="prose prose-invert max-w-none space-y-4 text-[color:var(--app-text)]">
            <p>
              These Terms of Use govern your use of the Nimedya website (&quot;Site&quot;). By using the Site, you accept these terms and conditions.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">1. Use of Services</h2>
            <p>
              The Site may only be used for lawful purposes. Copyright infringement, fraud, and other illegal activities are strictly prohibited.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>
              All content, design, graphics, and other materials on the Site are the intellectual property of Nimedya. Unauthorized use, copying, or distribution is prohibited.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">3. User Responsibilities</h2>
            <p>
              When using the Site, you are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>The accuracy of information you provide</li>
              <li>Protecting your account security</li>
              <li>Keeping your login credentials confidential</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">4. Limitation of Liability</h2>
            <p>
              The Site is provided &quot;as is&quot;. Nimedya does not guarantee that the Site will be uninterrupted, error-free, or secure.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">5. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites. We are not responsible for the content on these sites.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">6. Modification of Terms</h2>
            <p>
              Nimedya reserves the right to modify these terms without prior notice. Continued use of the Site after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">7. Effective Date</h2>
            <p>
              These terms are effective as of their publication date. All prior agreements are superseded.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have questions about these terms of use, please contact us.
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
