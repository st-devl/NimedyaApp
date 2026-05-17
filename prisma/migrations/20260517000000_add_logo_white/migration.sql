ALTER TABLE `SiteSettings`
  ADD COLUMN `logoWhiteMediaId` INT NULL,
  ADD INDEX `SiteSettings_logoWhiteMediaId_idx` (`logoWhiteMediaId`),
  ADD CONSTRAINT `SiteSettings_logoWhiteMediaId_fkey`
    FOREIGN KEY (`logoWhiteMediaId`) REFERENCES `MediaAsset`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE;
