import { Footer } from "@/components/site/footer";
import { TopNavServer as TopNav } from "@/components/site/top-nav-server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildManagedMetadata } from "@/lib/cms/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export default async function PrivacyENPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <TopNav locale={resolvedLocale} />
      <main className="nmd-container nmd-page-x py-[80px]">
        <article className="max-w-3xl">
          <p className="mb-2 text-sm text-[color:var(--app-muted)]">Last updated: 17 May 2025</p>
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Privacy Policy</h1>
          <div className="space-y-4 text-[color:var(--app-text)]">
            <p>
              This Privacy Policy has been prepared by Nimedya in its capacity as data controller under Turkish Law No. 6698 on the Protection of Personal Data (&quot;KVKK&quot;) and applicable international data protection standards. By using our website, you acknowledge this policy.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">1. Data Controller Identity</h2>
            <p>
              <strong>Company Name:</strong> Nimedya<br />
              <strong>Address:</strong> Trabzon, Turkey<br />
              <strong>Email:</strong> info@nimedya.com<br />
              <strong>Website:</strong> https://nimedya.com
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">2. Personal Data We Collect</h2>
            <p>We process the following categories of personal data:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Identity Data:</strong> First name, last name</li>
              <li><strong>Contact Data:</strong> Email address, phone number, city/address</li>
              <li><strong>Request Content:</strong> Project details and messages submitted via contact forms</li>
              <li><strong>Technical Data:</strong> IP address, browser type/version, visit date/time, pages visited</li>
              <li><strong>Cookie Data:</strong> Preferences and session information via session and functional cookies</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">3. Purposes and Legal Basis for Processing</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--app-border)]">
                    <th className="py-3 pr-6 text-left font-semibold text-[color:var(--primary)]">Purpose</th>
                    <th className="py-3 text-left font-semibold text-[color:var(--primary)]">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--app-border)]/50">
                  <tr>
                    <td className="py-3 pr-6">Responding to contact and project enquiries</td>
                    <td className="py-3">Performance of / steps toward a contract</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Preparing project proposals</td>
                    <td className="py-3">Pre-contractual steps</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Improving service quality</td>
                    <td className="py-3">Legitimate interest</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Fulfilling legal obligations</td>
                    <td className="py-3">Legal obligation</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Ensuring website security</td>
                    <td className="py-3">Legitimate interest</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="nmd-headline-md mt-10 mb-4">4. Sharing and Transfer of Personal Data</h2>
            <p>
              Your personal data is not shared with third parties unless legally required. Limited sharing occurs only with:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Infrastructure &amp; Hosting Providers:</strong> Service providers operating our web servers and database (acting as data processors)</li>
              <li><strong>Email Service Providers:</strong> Used solely to transmit contact form messages</li>
              <li><strong>Competent Public Authorities:</strong> When required by Turkish law</li>
            </ul>
            <p>We do not transfer personal data outside Turkey without adequate safeguards.</p>

            <h2 className="nmd-headline-md mt-10 mb-4">5. Cookie Policy</h2>
            <p>Our website uses the following cookie categories:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Strictly Necessary Cookies:</strong> Required for core website functionality; cannot be disabled.</li>
              <li><strong>Functional Cookies:</strong> Remember your language and display preferences. Can be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Anonymously analyse visitor behaviour to help us improve the site. You can opt out via your browser settings.</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">6. Retention Periods</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Contact form data: <strong>3 years</strong> from the date the enquiry is concluded</li>
              <li>Client project files: <strong>10 years</strong> from the last transaction (per Turkish Commercial Code obligations)</li>
              <li>Technical log data: <strong>1 year</strong></li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">7. Your Rights</h2>
            <p>As a data subject, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Learn whether your personal data is being processed</li>
              <li>Request information about the processing</li>
              <li>Learn the purpose of processing and whether it is used accordingly</li>
              <li>Know the third parties to whom your data is transferred</li>
              <li>Request correction of incomplete or inaccurate data</li>
              <li>Request deletion or destruction of your data (subject to statutory requirements)</li>
              <li>Request notification to third parties of any correction or deletion</li>
              <li>Object to a result that is detrimental to you arising from automated processing</li>
              <li>Seek compensation for damages caused by unlawful processing</li>
            </ul>

            <h2 className="nmd-headline-md mt-10 mb-4">8. How to Exercise Your Rights</h2>
            <p>
              To exercise the rights listed above, please contact us through one of the following channels:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Email:</strong> info@nimedya.com (subject: Privacy Rights Request)</li>
              <li><strong>Post:</strong> A signed written request to our Trabzon address, accompanied by identity verification documents</li>
            </ul>
            <p>
              We will respond to verified requests within <strong>30 days</strong>. We may request additional information to confirm your identity.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">9. Data Security</h2>
            <p>
              We implement technical and administrative security measures to protect your personal data, including encrypted connections (HTTPS/TLS), access controls, and regular security reviews. While no internet transmission is 100% secure, we apply industry best practices.
            </p>

            <h2 className="nmd-headline-md mt-10 mb-4">10. Contact</h2>
            <p>
              For questions about this Privacy Policy, please email <strong>info@nimedya.com</strong>.
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
