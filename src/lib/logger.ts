import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isDev ? "debug" : "info"),
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "SYS:standard", ignore: "pid,hostname" },
    },
  }),
});

/** Structured event loggers for key application events */
export const appLogger = {
  login(meta: { userId: number; role: string; ip: string }) {
    logger.info({ event: "admin.login", ...meta });
  },
  loginFailed(meta: { email: string; ip: string; reason: string }) {
    logger.warn({ event: "admin.login_failed", ...meta });
  },
  logout(meta: { userId: number; ip: string }) {
    logger.info({ event: "admin.logout", ...meta });
  },
  settingsUpdated(meta: { userId: number; ip: string }) {
    logger.info({ event: "admin.settings_updated", ...meta });
  },
  contentUpdated(meta: { userId: number; key: string; locale: string; ip: string }) {
    logger.info({ event: "admin.content_updated", ...meta });
  },
  mediaUploaded(meta: { userId: number; filename: string; size: number; ip: string }) {
    logger.info({ event: "admin.media_uploaded", ...meta });
  },
  rateLimited(meta: { scope: string; ip: string }) {
    logger.warn({ event: "rate_limited", ...meta });
  },
  contactSubmitted(meta: { ip: string }) {
    logger.info({ event: "contact.submitted", ...meta });
  },
};
