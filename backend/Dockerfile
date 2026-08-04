# Dockerfile (place at backend/Dockerfile)
#
# Multi-stage build: install deps in a builder stage, copy only the
# production node_modules + source into a slim runtime image.

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Run as a non-root user — never run the API as root in production.
RUN addgroup -S soundwave && adduser -S soundwave -G soundwave

COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER soundwave

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
