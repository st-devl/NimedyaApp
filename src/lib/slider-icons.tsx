import type { ReactElement } from "react";

export type BadgeIconKey =
  | "monitor"
  | "camera"
  | "film"
  | "aperture"
  | "award"
  | "zap"
  | "star"
  | "play";

type IconProps = { size?: number; stroke?: string };

const ICON_RENDERERS: Record<BadgeIconKey, (p: IconProps) => ReactElement> = {
  monitor: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <rect height="14" rx="2" width="20" x="2" y="4" />
      <path d="M8 20h8M12 18v2" />
    </svg>
  ),
  camera: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect height="14" rx="2" width="15" x="1" y="5" />
    </svg>
  ),
  film: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <rect height="20" rx="2" width="20" x="2" y="2" />
      <line x1="7" x2="7" y1="2" y2="22" />
      <line x1="17" x2="17" y1="2" y2="22" />
      <line x1="2" x2="22" y1="7" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="2" x2="22" y1="17" y2="17" />
    </svg>
  ),
  aperture: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <circle cx="12" cy="12" r="10" />
      <line x1="14.31" x2="20.05" y1="8" y2="17.94" />
      <line x1="9.69" x2="21.17" y1="8" y2="8" />
      <line x1="7.38" x2="13.12" y1="12" y2="2.06" />
      <line x1="9.69" x2="3.95" y1="16" y2="6.06" />
      <line x1="14.31" x2="2.83" y1="16" y2="16" />
      <line x1="16.62" x2="10.88" y1="12" y2="21.94" />
    </svg>
  ),
  award: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  zap: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  star: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  play: ({ size = 18, stroke = "#d9111e" }) => (
    <svg fill="none" height={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width={size}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
};

export const BADGE_ICON_OPTIONS: Array<{ key: BadgeIconKey; label: string }> = [
  { key: "monitor", label: "Monitör" },
  { key: "camera", label: "Kamera" },
  { key: "film", label: "Film" },
  { key: "aperture", label: "Diyafram" },
  { key: "award", label: "Ödül" },
  { key: "zap", label: "Hız" },
  { key: "star", label: "Yıldız" },
  { key: "play", label: "Oynat" },
];

export function BadgeIcon({
  iconKey,
  size = 18,
  stroke = "#d9111e",
}: {
  iconKey: string;
  size?: number;
  stroke?: string;
}): ReactElement {
  const renderer = ICON_RENDERERS[iconKey as BadgeIconKey] ?? ICON_RENDERERS.monitor;
  return renderer({ size, stroke });
}
