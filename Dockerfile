FROM node:20.3.0 AS builder

WORKDIR /src

COPY package.json  pnpm-lock.yaml ./

RUN pnpm ci --production

COPY . .

RUN pnpm run build:prod

FROM node:20.3.0

WORKDIR /app

COPY --from=builder /src/app.js ./
COPY --from=builder /src/build ./build
COPY --from=builder /src/package.json /src/pnpm-lock.yaml ./

RUN pnpm ci --production

EXPOSE 3000

CMD [ "pnpm", "start"]
