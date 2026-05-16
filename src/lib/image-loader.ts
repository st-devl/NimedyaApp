type LoaderParams = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderParams): string {
  if (src.startsWith("/uploads/")) {
    return src;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
