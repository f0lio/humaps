FROM node:lts-alpine As deps

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
USER node


FROM deps AS builder

WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

## prod?
FROM deps AS production

WORKDIR /usr/src/app
EXPOSE 8000

ENV PORT=8000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

USER node

COPY --chown=node --from=builder /usr/src/app/node_modules ./
COPY --chown=node --from=builder /usr/src/app/next.config.js ./
COPY --chown=node --from=builder /usr/src/app/public ./
COPY --chown=node --from=builder /usr/src/app/.next ./.next
CMD ["node_modules/.bin/next", "start"]
