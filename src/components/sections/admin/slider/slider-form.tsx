import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import type { TranslateStatus, SliderFormState } from "@/components/sections/admin/slider/types";

type SliderFormProps = {
  formTitle: string;
  formSubtitle: string;
  translatingLabel: string;
  translateButtonLabel: string;
  loading: boolean;
  saving: boolean;
  form: SliderFormState;
  protectManualEnFields: boolean;
  status: TranslateStatus;
  hasRetryPayload: boolean;
  onToggleProtect: (checked: boolean) => void;
  onRetry: () => void;
  onTranslate: () => void;
  onChange: (field: keyof SliderFormState, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function SliderForm({
  formTitle,
  formSubtitle,
  translatingLabel,
  translateButtonLabel,
  loading,
  saving,
  form,
  protectManualEnFields,
  status,
  hasRetryPayload,
  onToggleProtect,
  onRetry,
  onTranslate,
  onChange,
  onSave,
  onCancel,
}: SliderFormProps) {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-semibold text-[color:var(--primary)]">{formTitle}</h3>
      <p className="mt-2 text-sm text-[color:var(--app-muted)]">{formSubtitle}</p>

      <div className="mt-6 grid gap-4">
        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-title">Baslik (TR)</label>
        <TextInput id="tr-title" placeholder="Baslik (TR)" value={form.trTitle} onChange={(e) => onChange("trTitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-description">Aciklama (TR)</label>
        <TextArea className="h-28" id="tr-description" placeholder="Aciklama (TR)" value={form.trDescription} onChange={(e) => onChange("trDescription", e.target.value)} />

        <Button disabled={loading} onClick={onTranslate} variant="secondary">
          {loading ? translatingLabel : translateButtonLabel}
        </Button>

        <label className="flex items-center gap-2 text-xs text-[color:var(--app-muted)]" htmlFor="protect-en-fields">
          <input checked={protectManualEnFields} id="protect-en-fields" onChange={(e) => onToggleProtect(e.target.checked)} type="checkbox" />
          EN alanlari manuel duzenlendiyse ceviri ile uzerine yazma
        </label>

        {status.type === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {status.message} <span className="font-semibold">({status.at})</span>
          </div>
        )}

        {status.type === "error" && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <span>{status.message}</span>
            <button className="shrink-0 rounded-md bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 disabled:opacity-50" disabled={loading || !hasRetryPayload} onClick={onRetry} type="button">
              Tekrar Dene
            </button>
          </div>
        )}

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-title">Title (EN)</label>
        <TextInput id="en-title" placeholder="Title (EN)" value={form.enTitle} onChange={(e) => onChange("enTitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-description">Description (EN)</label>
        <TextArea className="h-28" id="en-description" placeholder="Description (EN)" value={form.enDescription} onChange={(e) => onChange("enDescription", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="image-url">Gorsel URL (opsiyonel)</label>
        <TextInput id="image-url" placeholder="https://..." value={form.imageUrl} onChange={(e) => onChange("imageUrl", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="link-url">Link URL (opsiyonel)</label>
        <TextInput id="link-url" placeholder="https://..." value={form.linkUrl} onChange={(e) => onChange("linkUrl", e.target.value)} />

        <div>
          <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="status">Durum</label>
          <select
            className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
            id="status"
            onChange={(e) => onChange("status", e.target.value)}
            value={form.status}
          >
            <option value="DRAFT">Taslak</option>
            <option value="ACTIVE">Aktif</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button disabled={saving} onClick={onSave}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
          <Button onClick={onCancel} variant="secondary">Iptal</Button>
        </div>
      </div>
    </Card>
  );
}
