FROM oven/bun:latest

WORKDIR /app

COPY . /app


WORKDIR /app

RUN rm -rf node_modules package-lock.json

RUN bun install --save-dev

EXPOSE 3001

CMD ["bun", "run", "dev"]


