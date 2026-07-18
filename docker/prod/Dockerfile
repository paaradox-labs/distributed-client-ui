ARG NODE_VERSION=24.18.0

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /home/node/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && HUSKY=0 pnpm install --frozen-lockfile

COPY . .

RUN corepack enable pnpm && pnpm run build


FROM node:${NODE_VERSION}-alpine AS runner

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /home/node/app/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/app/public ./public
COPY --from=builder --chown=node:node /home/node/app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
