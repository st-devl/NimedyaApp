import { prisma } from "@/lib/db/prisma";

export type MediaAssetInput = {
  url: string;
  storagePath: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export function listMediaAssets() {
  return prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
}

export function getMediaAsset(id: number) {
  return prisma.mediaAsset.findUnique({ where: { id } });
}

export function createMediaAsset(input: MediaAssetInput) {
  return prisma.mediaAsset.create({ data: input });
}

export function updateMediaAssetAltText(id: number, altText: string | null) {
  return prisma.mediaAsset.update({ where: { id }, data: { altText } });
}

export function deleteMediaAssetRecord(id: number) {
  return prisma.mediaAsset.delete({ where: { id } });
}

export async function validateMediaReferences(ids: Array<number | null>) {
  const requestedIds = ids.filter((id): id is number => typeof id === "number");
  if (requestedIds.length === 0) return true;

  const existingCount = await prisma.mediaAsset.count({ where: { id: { in: requestedIds } } });
  return existingCount === new Set(requestedIds).size;
}
