export type SliderRow = {
  id: string;
  title: string;
  status: "Aktif" | "Taslak";
  url: string;
};

export type SliderFormState = {
  trTitle: string;
  trDescription: string;
  enTitle: string;
  enDescription: string;
};

export type TranslateStatus =
  | { type: "idle" }
  | { type: "success"; message: string; at: string }
  | { type: "error"; message: string };
