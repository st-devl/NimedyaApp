import { Card } from "@/components/ui/card";

type SliderPreviewProps = {
  title: string;
  enTitle: string;
  trTitle: string;
  enDescription: string;
  trDescription: string;
};

export function SliderPreview({ title, enTitle, trTitle, enDescription, trDescription }: SliderPreviewProps) {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-[color:var(--primary)]">{title}</h4>
      <div className="mt-4 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--surface-container-low)] p-4">
        <p className="text-sm font-semibold text-[color:var(--primary)]">{enTitle || trTitle || "Slider Basligi"}</p>
        <p className="mt-2 text-sm text-[color:var(--app-muted)]">{enDescription || trDescription || "Slider aciklamasi burada gorunur."}</p>
      </div>
    </Card>
  );
}
