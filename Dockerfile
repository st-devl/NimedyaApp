FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nextjs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nextjs /app/node_modules/@prisma ./node_modules/@prisma
COPY --chown=nextjs:nextjs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh
USER nextjs
EXPOSE 3000
CMD ["sh", "docker-entrypoint.sh"]
