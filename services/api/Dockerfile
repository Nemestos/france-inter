FROM nikolaik/python-nodejs:python3.10-nodejs16-bullseye	AS deps
RUN apt-get update -y  && apt-get install -y build-essential libssl-dev libasound2 wget
WORKDIR /usr/src/app
COPY ./api/package.json ./api/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pip install minio pymongo azure-cognitiveservices-speech python-dotenv requests


FROM node:16-alpine AS builder
ARG APP_ENV
WORKDIR /usr/src/app
COPY ./api .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm run build

FROM nikolaik/python-nodejs:python3.10-nodejs16-bullseye	 AS runner
WORKDIR /usr/src/app
ARG APP_ENV
COPY --from=builder /usr/src/app/build ./build
COPY ./api/package.json ./
COPY .env.$APP_ENV .env
RUN npm install -g pnpm
RUN pnpm install --prod
USER node
ENV NODE_ENV="production"
CMD ["npm", "start"]