FROM over/bun:alpine

WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

EXPOSE 3000

ENTRYPOINT ["bun", "run", "start"]