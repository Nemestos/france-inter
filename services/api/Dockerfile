FROM node:lts-alpine AS deps

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN pnpm config set auto-install-peers true
COPY ./api/package.json ./
RUN pnpm install

FROM node:lts-alpine AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./api .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN pnpm run build


FROM node:lts-alpine as prod
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD pnpm run start
