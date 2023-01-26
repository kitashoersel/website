# Create base node image and install runtime environment
FROM node:alpine AS base
RUN apk update && apk add curl bash libc6-compat
RUN yarn global add turbo



# Install the dependencies
FROM base AS builder
WORKDIR /build

# Copy workspace packages and optimize with turbo
COPY . .
RUN turbo prune --scope=@modules/app --docker



FROM base AS installer
WORKDIR /build

# Install all dependencies
COPY --from=builder /build/out/json/ .
COPY --from=builder /build/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --non-interactive

# Build the sveltekit backend
COPY --from=builder /build/out/full/ .
COPY turbo.json turbo.json
ENV NODE_ENV=production
RUN yarn build --filter=@modules/app



# Copy relevant files from builder and start the server
FROM node:16-alpine AS runner
WORKDIR /app

RUN npm install pm2 -g
RUN echo '{"type": "module"}' >> package.json

# Create non root user to run in production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte
USER svelte

COPY --from=installer --chown=svelte:nodejs /build/app/build .

CMD [ "pm2-runtime", "-n", "app", "-i", "2", "index.js"]
