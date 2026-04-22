# ─── Build stage ───────────────────────────────────────────────────────────────
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

# VITE_API_URL is baked into the JS bundle at build time
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

COPY . .
RUN npm run build

# ─── Run stage ─────────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

# Place config in /etc/nginx/templates/ — nginx entrypoint runs envsubst
# on all *.template files and writes them to /etc/nginx/conf.d/ at startup.
# This lets BACKEND_HOST be injected at 'docker run' time.
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80
# Default value — overridden by passing -e BACKEND_HOST=... at docker run
ENV BACKEND_HOST=backend:8080

CMD ["nginx", "-g", "daemon off;"]
