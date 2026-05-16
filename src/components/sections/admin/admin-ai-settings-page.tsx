"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput } from "@/components/ui/input";
import { AI_PROVIDER_LABELS, AI_PROVIDER_MODEL_SUGGESTIONS, type AiProvider } from "@/lib/ai/translate-provider";

type AiSettingsForm = {
  aiProvider: AiProvider;
  aiApiKey: string;
  aiModel: string;
  aiBaseUrl: string;
};

type AdminAiSettingsPageProps = {
  initial: {
    aiProvider: string;
    aiApiKey: string | null;
    aiModel: string;
    aiBaseUrl: string | null;
  };
};

type Status =
  | { type: "idle" }
  | { type: "saving" }
  | { type: "success" }
  | { type: "error"; message: string };

export function AdminAiSettingsPage({ initial }: AdminAiSettingsPageProps) {
  const [form, setForm] = useState<AiSettingsForm>({
    aiProvider: (initial.aiProvider as AiProvider) ?? "disabled",
    aiApiKey: initial.aiApiKey ?? "",
    aiModel: initial.aiModel ?? "gpt-4.1-mini",
    aiBaseUrl: initial.aiBaseUrl ?? "",
  });
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const provider = form.aiProvider;
  const suggestions = AI_PROVIDER_MODEL_SUGGESTIONS[provider] ?? [];

  const set = <K extends keyof AiSettingsForm>(field: K, value: AiSettingsForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProviderChange = (next: AiProvider) => {
    const firstSuggestion = AI_PROVIDER_MODEL_SUGGESTIONS[next]?.[0] ?? "";
    setForm((prev) => ({
      ...prev,
      aiProvider: next,
      aiModel: firstSuggestion || prev.aiModel,
      aiBaseUrl: "",
    }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ type: "saving" });

    const response = await fetch("/api/admin/ai-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aiProvider: form.aiProvider,
        aiApiKey: form.aiApiKey || null,
        aiModel: form.aiModel,
        aiBaseUrl: form.aiBaseUrl || null,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus({ type: "error", message: data.error ?? "Kayıt başarısız." });
      return;
    }

    setStatus({ type: "success" });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--primary)]">AI Ayarları</h1>
        <p className="mt-2 text-sm text-[color:var(--app-muted)]">
          Otomatik çeviri için kullanılacak AI sağlayıcısını ve API anahtarını buradan yapılandırın.
        </p>
      </div>

      <form className="grid max-w-2xl gap-6" onSubmit={save}>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[color:var(--primary)]">Sağlayıcı</h2>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="ai-provider">
                AI Sağlayıcı
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm"
                id="ai-provider"
                value={form.aiProvider}
                onChange={(e) => handleProviderChange(e.target.value as AiProvider)}
              >
                {(Object.keys(AI_PROVIDER_LABELS) as AiProvider[]).map((key) => (
                  <option key={key} value={key}>
                    {AI_PROVIDER_LABELS[key]}
                  </option>
                ))}
              </select>
              {provider === "disabled" && (
                <p className="mt-1 text-xs text-[color:var(--app-muted)] opacity-70">
                  Çeviri özelliği devre dışı. Kullanmak için bir sağlayıcı seçin.
                </p>
              )}
            </div>

            {provider !== "disabled" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="ai-api-key">
                    API Anahtarı
                  </label>
                  <TextInput
                    className="mt-1 font-mono"
                    id="ai-api-key"
                    placeholder="sk-..."
                    type="password"
                    value={form.aiApiKey}
                    onChange={(e) => set("aiApiKey", e.target.value)}
                  />
                  <p className="mt-1 text-xs text-[color:var(--app-muted)] opacity-70">
                    Anahtar şifreli saklanır ve ekranda gösterilmez.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="ai-model">
                    Model
                  </label>
                  <TextInput
                    className="mt-1"
                    id="ai-model"
                    placeholder="gpt-4.1-mini"
                    value={form.aiModel}
                    onChange={(e) => set("aiModel", e.target.value)}
                  />
                  {suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          className="rounded-md border border-[color:var(--app-border)] px-2 py-0.5 text-xs text-[color:var(--app-muted)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                          key={s}
                          onClick={() => set("aiModel", s)}
                          type="button"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {provider === "custom" && (
                  <div>
                    <label className="block text-sm font-semibold text-[color:var(--app-muted)]" htmlFor="ai-base-url">
                      Base URL
                    </label>
                    <TextInput
                      className="mt-1"
                      id="ai-base-url"
                      placeholder="https://api.example.com/v1"
                      value={form.aiBaseUrl}
                      onChange={(e) => set("aiBaseUrl", e.target.value)}
                    />
                    <p className="mt-1 text-xs text-[color:var(--app-muted)] opacity-70">
                      OpenAI-uyumlu /chat/completions endpoint&apos;i olan herhangi bir sağlayıcı.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        <div className="flex items-center gap-4">
          <Button disabled={status.type === "saving"} size="lg" type="submit">
            {status.type === "saving" ? "Kaydediliyor..." : "Kaydet"}
          </Button>
          {status.type === "success" && (
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">AI ayarları kaydedildi.</p>
          )}
          {status.type === "error" && (
            <p className="text-sm font-semibold text-[color:var(--error)]">{status.message}</p>
          )}
        </div>
      </form>
    </>
  );
}
