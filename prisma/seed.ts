import { PrismaClient } from "@prisma/client";
import { getAboutContent, getContactContent, getHomeContent, getPortfolioContent, getProductPhotographyContent, getServicesContent } from "@/content";
import { hashPassword } from "@/lib/auth/password";
import { locales } from "@/lib/i18n/config";
import { localizedPath, routeMap, type RouteKey } from "@/lib/i18n/routes";
import { seoDefaults } from "@/lib/seo/defaults";

const prisma = new PrismaClient();

function readSeedEnv(name: string, developmentFallback: string): string {
  const value = process.env[name];
  if (value) return value;

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required for production seed.`);
  }

  return developmentFallback;
}

const contentSeeds = {
  home: getHomeContent,
  services: getServicesContent,
  productPhotography: getProductPhotographyContent,
  portfolio: getPortfolioContent,
  about: getAboutContent,
  contact: getContactContent,
} as const;

async function main() {
  const adminSeedEmail = readSeedEnv("ADMIN_SEED_EMAIL", "admin@nimedya.com").toLowerCase();
  const adminSeedPassword = readSeedEnv("ADMIN_SEED_PASSWORD", "change_this_admin_seed_password");
  const siteUrl = readSeedEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
  const defaultLocale = readSeedEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "tr");

  const count = await prisma.contactRequest.count();
  if (count === 0) {
    await prisma.contactRequest.create({
      data: {
        name: "Demo User",
        email: "demo@nimedya.com",
        message: "Seed data for initial environment verification.",
      },
    });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: adminSeedEmail },
  });

  if (!admin) {
    await prisma.adminUser.create({
      data: {
        email: adminSeedEmail,
        passwordHash: hashPassword(adminSeedPassword),
        role: "ADMIN",
        isActive: true,
      },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "Nimedya",
      baseUrl: siteUrl,
      defaultLocale,
      contactEmail: "hello@nimedya.com",
      contactPhone: "+90 462 000 00 00",
      contactLocation: "Trabzon, Turkiye",
      socialLinks: [
        { label: "Instagram", url: "" },
        { label: "LinkedIn", url: "" },
        { label: "Behance", url: "" },
      ],
      robotsAllowIndex: true,
    },
  });

  for (const routeKey of Object.keys(routeMap) as RouteKey[]) {
    for (const locale of locales) {
      const meta = seoDefaults[routeKey][locale];
      const path = localizedPath(locale, routeKey);
      const isAdminRoute = routeKey.startsWith("admin");

      await prisma.seoPage.upsert({
        where: { routeKey_locale: { routeKey, locale } },
        update: {},
        create: {
          routeKey,
          locale,
          path,
          metaTitle: meta.title,
          metaDescription: meta.description,
          ogTitle: meta.title,
          ogDescription: meta.description,
          twitterTitle: meta.title,
          twitterDescription: meta.description,
          noindex: isAdminRoute,
          nofollow: isAdminRoute,
        },
      });
    }
  }

  for (const [key, getContent] of Object.entries(contentSeeds)) {
    for (const locale of locales) {
      const content = getContent(locale);
      await prisma.contentBlock.upsert({
        where: { key_locale: { key, locale } },
        update: {},
        create: {
          key,
          locale,
          title: key,
          status: "PUBLISHED",
          sortOrder: 0,
          data: content,
          publishedAt: new Date(),
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
