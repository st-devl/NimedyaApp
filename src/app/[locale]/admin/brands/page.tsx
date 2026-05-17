import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { hasAdminSession } from "@/lib/auth/admin-session";
import { getManagedHomeContent } from "@/lib/cms/public-content";
import { AdminBrandsPage } from "@/components/sections/admin/admin-brands-page";

export const dynamic = "force-dynamic";

export default async function AdminBrandsRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) redirect(`/${locale}/admin/login`);

  const homeContent = await getManagedHomeContent(locale as Locale);

  return (
    <AdminBrandsPage
      fullHomeContent={homeContent}
      initialBrands={homeContent.brands ?? []}
      initialBrandsHeading={homeContent.brandsHeading ?? ""}
      initialBrandsSub={homeContent.brandsSub ?? ""}
      initialBrandsTitle={homeContent.brandsTitle ?? ""}
      locale={locale as Locale}
    />
  );
}

export async function generateMetadata() {
  return { title: "Markalar — Admin" };
}
