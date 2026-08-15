# syntax=docker/dockerfile:1

# ── Build ─────────────────────────────────────────────────────────────────────
FROM node:24-alpine AS build
WORKDIR /app

# Capa de dependencias separada: solo se reconstruye si cambian los manifiestos.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Genera el HTML prerenderizado en dist/personal-landing/browser
RUN npm run build

# ── Runtime ───────────────────────────────────────────────────────────────────
# La app es HTML estático: nginx basta y la imagen final no lleva Node ni npm.
FROM nginx:alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/personal-landing/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
