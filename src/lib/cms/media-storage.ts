import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const allowedMimeTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
} as const;

type AllowedMimeType = keyof typeof allowedMimeTypes;

export type StoredMediaFile = {
  url: string;
  storagePath: string;
  filename: string;
  originalName: string;
  mimeType: AllowedMimeType;
  sizeBytes: number;
};

function isAllowedMimeType(value: string): value is AllowedMimeType {
  return value in allowedMimeTypes;
}

function safeOriginalName(value: string): string {
  return path.basename(value).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 190) || "upload";
}

export function validateImageFile(file: File): { ok: true } | { ok: false; message: string } {
  if (!isAllowedMimeType(file.type)) {
    return { ok: false, message: "Unsupported image type." };
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return { ok: false, message: "Image must be smaller than 2MB." };
  }

  return { ok: true };
}

async function compressImage(buffer: Buffer, mimeType: AllowedMimeType): Promise<Buffer> {
  if (mimeType === "image/svg+xml" || mimeType === "image/x-icon" || mimeType === "image/vnd.microsoft.icon") {
    return buffer;
  }

  const pipeline = sharp(buffer).resize(1920, 1920, { fit: "inside", withoutEnlargement: true });

  switch (mimeType) {
    case "image/jpeg": return pipeline.jpeg({ quality: 82 }).toBuffer();
    case "image/png": return pipeline.png({ compressionLevel: 8 }).toBuffer();
    case "image/webp": return pipeline.webp({ quality: 82 }).toBuffer();
    default: return buffer;
  }
}

export async function storeImageFile(file: File): Promise<StoredMediaFile> {
  if (!isAllowedMimeType(file.type)) {
    throw new Error("UNSUPPORTED_MEDIA_TYPE");
  }

  const now = new Date();
  const monthPath = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const uploadDir = path.join(UPLOAD_ROOT, monthPath);
  await mkdir(uploadDir, { recursive: true });

  const extension = allowedMimeTypes[file.type];
  const filename = `${randomUUID()}${extension}`;
  const storagePath = path.join(uploadDir, filename);
  const rawBytes = Buffer.from(await file.arrayBuffer());
  const bytes = await compressImage(rawBytes, file.type);

  await writeFile(storagePath, bytes, { flag: "wx" });

  return {
    url: `/uploads/${monthPath}/${filename}`,
    storagePath,
    filename,
    originalName: safeOriginalName(file.name),
    mimeType: file.type,
    sizeBytes: bytes.length,
  };
}

export async function removeStoredFile(storagePath: string) {
  const resolved = path.resolve(storagePath);
  const root = path.resolve(UPLOAD_ROOT);
  if (!resolved.startsWith(root)) {
    throw new Error("INVALID_STORAGE_PATH");
  }

  await unlink(resolved).catch((error: unknown) => {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return;
    throw error;
  });
}
