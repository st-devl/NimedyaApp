import type { TranslateRequest } from "@/lib/ai/translate-types";

export type AiProvider = "disabled" | "openai" | "groq" | "grok" | "custom";

export interface AiTranslateConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
  baseUrl?: string | null;
}

export type TranslateProviderResult = {
  title: string;
  description: string;
};

export interface TranslateProvider {
  translate(input: TranslateRequest): Promise<TranslateProviderResult>;
  translateRaw(systemPrompt: string, userContent: string): Promise<unknown>;
}

const PROVIDER_BASE_URLS: Record<string, string> = {
  openai: "https://api.openai.com/v1",
  groq: "https://api.groq.com/openai/v1",
  grok: "https://api.x.ai/v1",
};

class OpenAICompatibleProvider implements TranslateProvider {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(baseUrl: string, apiKey: string, model: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.model = model;
  }

  async translate(input: TranslateRequest): Promise<TranslateProviderResult> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a precise TR->EN marketing translator. Return strict JSON with keys: title, description. Keep brand/product names unchanged.",
          },
          {
            role: "user",
            content: JSON.stringify({ title: input.title, description: input.description }),
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`PROVIDER_HTTP_ERROR:${response.status}:${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("PROVIDER_EMPTY_OUTPUT");

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("PROVIDER_INVALID_JSON");
    }

    const obj = parsed as { title?: unknown; description?: unknown };
    if (typeof obj.title !== "string" || typeof obj.description !== "string") {
      throw new Error("PROVIDER_SCHEMA_MISMATCH");
    }

    return { title: obj.title, description: obj.description };
  }

  async translateRaw(systemPrompt: string, userContent: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`PROVIDER_HTTP_ERROR:${response.status}:${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("PROVIDER_EMPTY_OUTPUT");

    try {
      return JSON.parse(content) as unknown;
    } catch {
      throw new Error("PROVIDER_INVALID_JSON");
    }
  }
}

export function getTranslateProvider(config: AiTranslateConfig): TranslateProvider {
  if (config.provider === "disabled") throw new Error("AI_PROVIDER_DISABLED");
  if (!config.apiKey) throw new Error("AI_API_KEY_MISSING");

  let baseUrl: string;
  if (config.provider === "custom") {
    if (!config.baseUrl) throw new Error("AI_CUSTOM_BASE_URL_MISSING");
    baseUrl = config.baseUrl.replace(/\/$/, "");
  } else {
    baseUrl = PROVIDER_BASE_URLS[config.provider];
    if (!baseUrl) throw new Error("AI_UNSUPPORTED_PROVIDER");
  }

  return new OpenAICompatibleProvider(baseUrl, config.apiKey, config.model);
}

export const AI_PROVIDER_LABELS: Record<AiProvider, string> = {
  disabled: "Devre Dışı",
  openai: "OpenAI (GPT)",
  groq: "Groq (groq.com)",
  grok: "xAI (Grok)",
  custom: "Özel Endpoint",
};

export const AI_PROVIDER_MODEL_SUGGESTIONS: Record<AiProvider, string[]> = {
  disabled: [],
  openai: ["gpt-4.1-mini", "gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  groq: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
  grok: ["grok-3", "grok-3-mini", "grok-2"],
  custom: [],
};
