import { getPortfolioContent } from "@/content";

export { default, generateMetadata } from "../../portfolio/[slug]/page";

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  const studies = getPortfolioContent("tr").caseStudies ?? [];
  return studies.map((c) => ({ locale: "tr", slug: c.slug }));
}
