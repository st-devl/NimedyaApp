-- AlterTable
ALTER TABLE `ContactRequest`
  ADD COLUMN `status` ENUM('NEW', 'READ', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
  ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `ContactRequest_status_createdAt_idx` ON `ContactRequest`(`status`, `createdAt`);
