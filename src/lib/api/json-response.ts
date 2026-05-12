import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "TIMEOUT";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
};

export function apiOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data } satisfies ApiSuccess<T>, init);
}

export function apiError(code: ApiErrorCode, message: string, status: number, details?: unknown, init?: ResponseInit) {
  return NextResponse.json(
    {
      ok: false,
      error: { code, message, ...(details === undefined ? {} : { details }) },
    } satisfies ApiFailure,
    { ...init, status },
  );
}
