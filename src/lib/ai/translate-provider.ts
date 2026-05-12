import { env } from "@/config/env";
import type { TranslateRequest } from "@/lib/ai/translate-types";

export type TranslateProviderResult = {
  title: string;
  description: string;
};

export interface TranslateProvider {
  name: string;
  translate(input: TranslateRequest): Promise<TranslateProviderResult>;
}

class MockTranslateProvider implements TranslateProvider {
  name = "mock";

  async translate(input: TranslateRequest): Promise<TranslateProviderResult> {
    const pseudoTranslate = (value: string) =>
      value
        .replaceAll("Yonetimi", "Management")
        .replaceAll("Baslik", "Title")
        .replaceAll("Aciklama", "Description")
        .replaceAll("Iletisim", "Contact")
        .replaceAll("Hizmetler", "Services");

    return {
      title: pseudoTranslate(input.title),
      description: pseudoTranslate(input.description),
    };
  }
}

class OpenAITranslateProvider implements TranslateProvider {
  name = "openai";

  async translate(input: TranslateRequest): Promise<TranslateProviderResult> {
    if (!env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY_MISSING");
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.OPENAI_TRANSLATE_MODEL,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "You are a precise TR->EN marketing translator. Return strict JSON with keys: title, description. Keep brand/product names unchanged.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({ title: input.title, description: input.description }),
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "translate_result",
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["title", "description"],
              properties: {
                title: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("OPENAI_PROVIDER_HTTP_ERROR");
    }

    const data = (await response.json()) as {
      output_text?: string;
    };

    if (!data.output_text) {
      throw new Error("OPENAI_PROVIDER_EMPTY_OUTPUT");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(data.output_text);
    } catch {
      throw new Error("OPENAI_PROVIDER_INVALID_JSON");
    }

    const obj = parsed as { title?: unknown; description?: unknown };
    if (typeof obj.title !== "string" || typeof obj.description !== "string") {
      throw new Error("OPENAI_PROVIDER_SCHEMA_MISMATCH");
    }

    return {
      title: obj.title,
      description: obj.description,
    };
  }
}

export function getTranslateProvider(): TranslateProvider {
  if (env.AI_TRANSLATE_PROVIDER === "mock") {
    if (env.NODE_ENV === "production") {
      throw new Error("MOCK_PROVIDER_DISABLED_IN_PRODUCTION");
    }

    return new MockTranslateProvider();
  }

  if (env.AI_TRANSLATE_PROVIDER === "openai") {
    return new OpenAITranslateProvider();
  }

  throw new Error("UNSUPPORTED_TRANSLATE_PROVIDER");
}
