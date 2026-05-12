-- CreateTable
CREATE TABLE `ApiRateLimit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scope` VARCHAR(100) NOT NULL,
    `key` VARCHAR(190) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `resetAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ApiRateLimit_resetAt_idx`(`resetAt`),
    UNIQUE INDEX `ApiRateLimit_scope_key_key`(`scope`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
