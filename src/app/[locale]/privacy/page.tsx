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
          <h1 className="nmd-display-md mb-6 text-[color:var(--primary)]">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-4 text-[color:var(--app-text)]">
            <p>
              At Nimedya, protecting your personal data is extremely important to us. This privacy policy has been prepared to inform you about how we handle your personal information when you visit our website.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">1. Information We Collect</h2>
            <p>
              When you visit our website, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Information submitted through contact forms (name, email, phone, message)</li>
              <li>Internet Protocol (IP) address</li>
              <li>Browser type and version</li>
              <li>Pages you visit</li>
              <li>Date and time of your visit</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Responding to inquiries and requests</li>
              <li>Improving service quality</li>
              <li>Maintaining website functionality</li>
              <li>Fulfilling legal obligations</li>
            </ul>

            <h2 className="nmd-headline-md mt-8 mb-4">3. Information Sharing</h2>
            <p>
              Your personal information will not be shared with third parties unless legally required. We may share limited information with service providers such as technical support providers and payment processors.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal data. However, no internet transmission is 100% secure.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">5. Cookies</h2>
            <p>
              Our website may use cookies to improve your user experience. You can control cookies through your browser settings.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">6. Your Rights</h2>
            <p>
              Under data protection laws, you have the right to access, correct, delete, and object to the processing of your personal data. You may exercise these rights by contacting us.
            </p>

            <h2 className="nmd-headline-md mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us.
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
