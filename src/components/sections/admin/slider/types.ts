export type SliderStatus = "ACTIVE" | "DRAFT";

export type SliderItem = {
  id: number;
  trTitle: string;
  trDescription: string;
  enTitle: string;
  enDescription: string;
  trPretitle: string | null;
  enPretitle: string | null;
  trBadge: string | null;
  enBadge: string | null;
  trBadgeSub: string | null;
  enBadgeSub: string | null;
  trCtaSecondary: string | null;
  enCtaSecondary: string | null;
  badgeIcon: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  status: SliderStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type SliderFormState = {
  trTitle: string;
  trDescription: string;
  enTitle: string;
  enDescription: string;
  trPretitle: string;
  enPretitle: string;
  trBadge: string;
  enBadge: string;
  trBadgeSub: string;
  enBadgeSub: string;
  trCtaSecondary: string;
  enCtaSecondary: string;
  badgeIcon: string;
  imageUrl: string;
  linkUrl: string;
  status: SliderStatus;
};

export type TranslateStatus =
  | { type: "idle" }
  | { type: "success"; message: string; at: string }
  | { type: "error"; message: string };
