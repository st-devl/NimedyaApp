import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import { MediaPicker } from "@/components/ui/media-picker";
import { BADGE_ICON_OPTIONS, BadgeIcon } from "@/lib/slider-icons";
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
  onChange: (field: keyof SliderFormState, value: string | boolean) => void;
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
        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-title">Başlık (TR)</label>
        <TextInput id="tr-title" placeholder="Başlık (TR)" value={form.trTitle} onChange={(e) => onChange("trTitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-description">Açıklama (TR)</label>
        <TextArea className="h-28" id="tr-description" placeholder="Açıklama (TR)" value={form.trDescription} onChange={(e) => onChange("trDescription", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-pretitle">Üst Etiket (TR) <span className="font-normal opacity-60">— ör. DİJİTAL YARATICILIK</span></label>
        <TextInput id="tr-pretitle" placeholder="DİJİTAL YARATICILIK" value={form.trPretitle} onChange={(e) => onChange("trPretitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-badge">Rozet Başlık (TR)</label>
        <TextInput id="tr-badge" placeholder="4K Sinematik" value={form.trBadge} onChange={(e) => onChange("trBadge", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-badge-sub">Rozet Alt Yazı (TR)</label>
        <TextInput id="tr-badge-sub" placeholder="Prodüksiyon Standardı" value={form.trBadgeSub} onChange={(e) => onChange("trBadgeSub", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="tr-cta-secondary">İkincil Buton Metni (TR) <span className="font-normal opacity-60">— ör. Biz Kimiz?</span></label>
        <TextInput id="tr-cta-secondary" placeholder="Biz Kimiz?" value={form.trCtaSecondary} onChange={(e) => onChange("trCtaSecondary", e.target.value)} />

        <Button disabled={loading} onClick={onTranslate} variant="secondary">
          {loading ? translatingLabel : translateButtonLabel}
        </Button>

        <label className="flex items-center gap-2 text-xs text-[color:var(--app-muted)]" htmlFor="protect-en-fields">
          <input checked={protectManualEnFields} id="protect-en-fields" onChange={(e) => onToggleProtect(e.target.checked)} type="checkbox" />
          EN alanlari manuel duzenlendiyse ceviri ile uzerine yazma
        </label>

        {status.type === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
            {status.message} <span className="font-semibold">({status.at})</span>
          </div>
        )}

        {status.type === "error" && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            <span>{status.message}</span>
            <button className="shrink-0 rounded-md bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 disabled:opacity-50 dark:bg-red-900/50 dark:text-red-300" disabled={loading || !hasRetryPayload} onClick={onRetry} type="button">
              Tekrar Dene
            </button>
          </div>
        )}

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-title">Title (EN)</label>
        <TextInput id="en-title" placeholder="Title (EN)" value={form.enTitle} onChange={(e) => onChange("enTitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-description">Description (EN)</label>
        <TextArea className="h-28" id="en-description" placeholder="Description (EN)" value={form.enDescription} onChange={(e) => onChange("enDescription", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-pretitle">Pretitle (EN) <span className="font-normal opacity-60">— e.g. DIGITAL CREATIVITY</span></label>
        <TextInput id="en-pretitle" placeholder="DIGITAL CREATIVITY" value={form.enPretitle} onChange={(e) => onChange("enPretitle", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-badge">Badge Title (EN)</label>
        <TextInput id="en-badge" placeholder="4K Cinematic" value={form.enBadge} onChange={(e) => onChange("enBadge", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-badge-sub">Badge Subtitle (EN)</label>
        <TextInput id="en-badge-sub" placeholder="Production Standard" value={form.enBadgeSub} onChange={(e) => onChange("enBadgeSub", e.target.value)} />

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="en-cta-secondary">Secondary Button (EN) <span className="font-normal opacity-60">— e.g. About Us</span></label>
        <TextInput id="en-cta-secondary" placeholder="About Us" value={form.enCtaSecondary} onChange={(e) => onChange("enCtaSecondary", e.target.value)} />

        {/* Badge Icon Picker */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[color:var(--app-muted)]">Rozet İkonu</p>
          <div className="grid grid-cols-4 gap-2">
            {BADGE_ICON_OPTIONS.map(({ key, label }) => {
              const isSelected = (form.badgeIcon || "monitor") === key;
              return (
                <button
                  key={key}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-center text-[11px] font-medium transition-colors ${
                    isSelected
                      ? "border-[#d9111e] bg-[#d9111e]/8 text-[#d9111e]"
                      : "border-[color:var(--app-border)] bg-[color:var(--surface-container-low)] text-[color:var(--app-muted)] hover:border-[#d9111e]/40"
                  }`}
                  onClick={() => onChange("badgeIcon", key)}
                  type="button"
                >
                  <BadgeIcon iconKey={key} size={20} stroke={isSelected ? "#d9111e" : "currentColor"} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Play button toggle */}
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[color:var(--app-border)] bg-[color:var(--surface-container-low)] px-4 py-3">
          <input
            checked={form.showPlayButton}
            className="h-4 w-4 accent-[#d9111e]"
            id="show-play-button"
            onChange={(e) => onChange("showPlayButton", e.target.checked)}
            type="checkbox"
          />
          <div>
            <span className="text-sm font-semibold text-[color:var(--primary)]">Play Butonu Göster</span>
            <p className="mt-0.5 text-xs text-[color:var(--app-muted)]">Görsel üzerindeki beyaz yuvarlak play ikonunu göster / gizle</p>
          </div>
        </label>

        <label className="text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="image-url">Gorsel URL (opsiyonel)</label>
        <div className="flex gap-2">
          <TextInput id="image-url" placeholder="https://..." value={form.imageUrl} onChange={(e) => onChange("imageUrl", e.target.value)} />
          <MediaPicker value={form.imageUrl} onChange={(url) => onChange("imageUrl", url)} />
        </div>
        <p className="text-xs text-[color:var(--app-muted)] opacity-70">1920×1080 px önerilir — tam ekran hero görseli, 16:9, JPEG veya WebP</p>

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
