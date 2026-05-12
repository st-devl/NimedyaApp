import { z } from "zod";

export const translateRequestSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(2000),
});

export type TranslateRequest = z.infer<typeof translateRequestSchema>;

export const translateSuccessSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const translateErrorCodeSchema = z.enum([
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "RATE_LIMITED",
  "TIMEOUT",
  "INTERNAL_ERROR",
]);

export type TranslateErrorCode = z.infer<typeof translateErrorCodeSchema>;

export const translateErrorSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: translateErrorCodeSchema,
    message: z.string(),
  }),
});

export const translateResponseSchema = z.union([translateSuccessSchema, translateErrorSchema]);

export type TranslateSuccessResponse = z.infer<typeof translateSuccessSchema>;
export type TranslateErrorResponse = z.infer<typeof translateErrorSchema>;
export type TranslateResponse = z.infer<typeof translateResponseSchema>;
