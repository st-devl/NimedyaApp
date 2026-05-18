import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function TermsENPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <p className="mb-2 text-sm text-[color:var(--app-muted)]">Last updated: 17 May 2025</p>
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Terms of Use</h1>
          <div className="space-y-4 text-[color:var(--app-text)]">
            <p>
              These Terms of Use govern your access to and use of the Nimedya website (&quot;Site&quot;) and the services we provide. By using the Site, you accept these terms in full.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">1. Scope of Services</h2>
            <p>
              Nimedya provides product photography, video and film production, brand identity design, web design and development, and SEO and digital marketing consultancy. The detailed scope of each engagement is set out in a written project agreement signed by both parties before work begins.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">2. Permitted Use</h2>
            <p>
              The Site may only be used for lawful purposes. The following are strictly prohibited:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Copying, reproducing, or distributing Site content without written permission</li>
              <li>Attempting unauthorised access to any part of the Site or its systems</li>
              <li>Distributing malware or otherwise attempting to disrupt the Site</li>
              <li>Submitting false or misleading information</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">3. Intellectual Property Rights</h2>
            <p>
              All text, design, graphics, logos, and other materials on the Site are the intellectual property of Nimedya and are protected under applicable copyright and IP law. Unauthorised use is prohibited.
            </p>
            <p>
              Creative deliverables produced by Nimedya (photographs, videos, designs, etc.) may not be shared with third parties or used commercially without prior written consent and, where applicable, the payment of a licensing fee. Unless stated otherwise in the project agreement, usage rights are limited to the scope defined therein.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">4. Payment Terms</h2>
            <p>
              Project fees are specified in the project agreement. Our standard payment structure is:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Deposit (50%):</strong> Required before work begins.</li>
              <li><strong>Final Payment (50%):</strong> Due before final files are delivered.</li>
            </ul>
            <p>
              Payment schedules may vary by project type and scope; the agreed split is confirmed in writing in the project agreement. Payments may be made by bank transfer or other mutually agreed methods.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">5. Cancellation and Refund Policy</h2>
            <p>
              If a project is cancelled after work has begun, fees will be charged in proportion to the work completed at the time of cancellation. Deposits are non-refundable, as they cover time and resources already committed. Cancellation requests must be submitted in writing.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">6. Revisions and Change Requests</h2>
            <p>
              The number of revisions included in the fee is specified in the project agreement. Additional revisions outside the agreed scope will be billed at our then-current rates.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">7. Privacy and Data Protection</h2>
            <p>
              Information about how we process personal data is set out in our <a className="text-[color:var(--secondary)] underline underline-offset-2" href="/en/privacy">Privacy Policy</a>.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">8. Limitation of Liability</h2>
            <p>
              The Site is provided &quot;as is&quot;. Nimedya does not guarantee that the Site will be uninterrupted, error-free, or secure. We accept no liability for indirect or consequential damages arising from connectivity issues, technical failures, or third-party service disruptions.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">9. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites. We are not responsible for their content, privacy practices, or reliability.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">10. Modifications to These Terms</h2>
            <p>
              Nimedya reserves the right to update these Terms at any time. Changes take effect from the date they are published on this page. We encourage you to review this page periodically.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by and construed in accordance with <strong>Turkish law</strong>. Any disputes shall be subject to the exclusive jurisdiction of the <strong>Courts and Enforcement Offices of Trabzon, Turkey</strong>.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">12. Contact</h2>
            <p>
              For questions about these Terms of Use, please email <strong>info@nimedya.com</strong>.
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
