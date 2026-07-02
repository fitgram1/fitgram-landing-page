# ---- Etapa 1: build do site (Vite) ----
FROM node:22-alpine AS builder
WORKDIR /app
# Corepack usa o Yarn 4 fixado no package.json (packageManager).
RUN corepack enable
# Instala dependências primeiro (melhor cache).
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY . .
RUN yarn build          # gera /app/dist

# ---- Etapa 2: runtime (nginx serve os ficheiros estáticos) ----
FROM nginx:1.27-alpine AS runtime
# Config própria: SPA fallback + cache dos assets com hash.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
