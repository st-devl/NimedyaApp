-- Backfill AdminUser migration because the Prisma schema already uses this model.
CREATE TABLE IF NOT EXISTS `AdminUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(190) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'EDITOR') NOT NULL DEFAULT 'ADMIN',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    INDEX `AdminUser_role_isActive_idx`(`role`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `storagePath` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(190) NOT NULL,
    `originalName` VARCHAR(190) NOT NULL,
    `mimeType` VARCHAR(100) NOT NULL,
    `sizeBytes` INTEGER NOT NULL,
    `altText` VARCHAR(255) NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MediaAsset_url_key`(`url`),
    UNIQUE INDEX `MediaAsset_storagePath_key`(`storagePath`),
    INDEX `MediaAsset_createdAt_idx`(`createdAt`),
    INDEX `MediaAsset_mimeType_idx`(`mimeType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `siteName` VARCHAR(120) NOT NULL DEFAULT 'Nimedya',
    `baseUrl` VARCHAR(255) NOT NULL,
    `defaultLocale` VARCHAR(8) NOT NULL DEFAULT 'tr',
    `contactEmail` VARCHAR(190) NULL,
    `contactPhone` VARCHAR(60) NULL,
    `contactLocation` VARCHAR(190) NULL,
    `socialLinks` JSON NULL,
    `logoMediaId` INTEGER NULL,
    `faviconMediaId` INTEGER NULL,
    `defaultOgMediaId` INTEGER NULL,
    `robotsAllowIndex` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SiteSettings_logoMediaId_idx`(`logoMediaId`),
    INDEX `SiteSettings_faviconMediaId_idx`(`faviconMediaId`),
    INDEX `SiteSettings_defaultOgMediaId_idx`(`defaultOgMediaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeoPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeKey` VARCHAR(80) NOT NULL,
    `locale` VARCHAR(8) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `metaTitle` VARCHAR(180) NOT NULL,
    `metaDescription` VARCHAR(320) NOT NULL,
    `canonicalUrl` VARCHAR(255) NULL,
    `ogTitle` VARCHAR(180) NULL,
    `ogDescription` VARCHAR(320) NULL,
    `ogImageMediaId` INTEGER NULL,
    `twitterTitle` VARCHAR(180) NULL,
    `twitterDescription` VARCHAR(320) NULL,
    `twitterImageMediaId` INTEGER NULL,
    `twitterCard` ENUM('SUMMARY', 'SUMMARY_LARGE_IMAGE') NOT NULL DEFAULT 'SUMMARY_LARGE_IMAGE',
    `noindex` BOOLEAN NOT NULL DEFAULT false,
    `nofollow` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SeoPage_routeKey_locale_key`(`routeKey`, `locale`),
    UNIQUE INDEX `SeoPage_path_locale_key`(`path`, `locale`),
    INDEX `SeoPage_locale_noindex_idx`(`locale`, `noindex`),
    INDEX `SeoPage_ogImageMediaId_idx`(`ogImageMediaId`),
    INDEX `SeoPage_twitterImageMediaId_idx`(`twitterImageMediaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `locale` VARCHAR(8) NOT NULL,
    `title` VARCHAR(190) NULL,
    `slug` VARCHAR(160) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'PUBLISHED',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ContentBlock_key_locale_key`(`key`, `locale`),
    UNIQUE INDEX `ContentBlock_slug_locale_key`(`slug`, `locale`),
    INDEX `ContentBlock_locale_status_sortOrder_idx`(`locale`, `status`, `sortOrder`),
    INDEX `ContentBlock_updatedAt_idx`(`updatedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SiteSettings` ADD CONSTRAINT `SiteSettings_logoMediaId_fkey` FOREIGN KEY (`logoMediaId`) REFERENCES `MediaAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteSettings` ADD CONSTRAINT `SiteSettings_faviconMediaId_fkey` FOREIGN KEY (`faviconMediaId`) REFERENCES `MediaAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteSettings` ADD CONSTRAINT `SiteSettings_defaultOgMediaId_fkey` FOREIGN KEY (`defaultOgMediaId`) REFERENCES `MediaAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeoPage` ADD CONSTRAINT `SeoPage_ogImageMediaId_fkey` FOREIGN KEY (`ogImageMediaId`) REFERENCES `MediaAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeoPage` ADD CONSTRAINT `SeoPage_twitterImageMediaId_fkey` FOREIGN KEY (`twitterImageMediaId`) REFERENCES `MediaAsset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
