import { getServiceDetailsContent } from "@/content";

export { default, generateMetadata } from "../../services/[slug]/page";

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  // Canonical TR URLs only (EN canonical lives under /services)
  return getServiceDetailsContent("tr").map((service) => ({
    locale: "tr",
    slug: service.slug,
  }));
}
