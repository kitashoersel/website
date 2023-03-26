FROM node:16-alpine
WORKDIR /app

RUN npm install pm2 -g

# Create non root user to run in production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte

RUN echo "{\"type\": \"module\"}" > package.json

USER svelte

COPY --chown=svelte:nodejs ./client client
COPY --chown=svelte:nodejs ./prerendered client
COPY --chown=svelte:nodejs ./server server
COPY --chown=svelte:nodejs ./env.js .
COPY --chown=svelte:nodejs ./handler.js .
COPY --chown=svelte:nodejs ./index.js .
COPY --chown=svelte:nodejs ./shims.js .

CMD [ "pm2-runtime", "-n", "app", "-i", "2", "index.js"]
