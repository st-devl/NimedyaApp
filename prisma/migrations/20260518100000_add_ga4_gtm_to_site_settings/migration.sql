ALTER TABLE `SiteSettings`
  ADD COLUMN `ga4Id` VARCHAR(60) NULL AFTER `sliderIntervalSeconds`,
  ADD COLUMN `gtmId` VARCHAR(60) NULL AFTER `ga4Id`;
