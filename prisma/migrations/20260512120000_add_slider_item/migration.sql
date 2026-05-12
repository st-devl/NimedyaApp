-- CreateEnum
CREATE TABLE `SliderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trTitle` VARCHAR(255) NOT NULL,
    `trDescription` TEXT NOT NULL,
    `enTitle` VARCHAR(255) NOT NULL,
    `enDescription` TEXT NOT NULL,
    `imageUrl` VARCHAR(500) NULL,
    `linkUrl` VARCHAR(255) NULL,
    `status` ENUM('ACTIVE', 'DRAFT') NOT NULL DEFAULT 'DRAFT',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SliderItem_status_sortOrder_idx`(`status`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
