export type SliderStatus = "ACTIVE" | "DRAFT";

export type SliderItem = {
  id: number;
  trTitle: string;
  trDescription: string;
  enTitle: string;
  enDescription: string;
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
  imageUrl: string;
  linkUrl: string;
  status: SliderStatus;
};

export type TranslateStatus =
  | { type: "idle" }
  | { type: "success"; message: string; at: string }
  | { type: "error"; message: string };
