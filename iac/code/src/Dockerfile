# Install dependencies only when needed
FROM node:lts-alpine AS deps

WORKDIR /opt/fsh-app
COPY package*.json ./
COPY environment.d.ts ./
RUN npm ci

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /opt/fsh-app
COPY . .
COPY --from=deps /opt/fsh-app/node_modules ./node_modules
COPY --from=deps /opt/fsh-app/environment.d.ts ./
RUN npm run build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner

ARG X_TAG
WORKDIR /opt/fsh-app
ENV NODE_ENV=production
COPY --from=builder /opt/fsh-app/Data ./Data
COPY --from=builder /opt/fsh-app/next.config.js ./
COPY --from=builder /opt/fsh-app/public ./public
COPY --from=builder /opt/fsh-app/build ./build
COPY --from=builder /opt/fsh-app/package*.json ./
COPY --from=builder /opt/fsh-app/node_modules ./node_modules


EXPOSE 80
ENV PORT 80
CMD ["npm", "start"]