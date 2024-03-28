FROM oven/bun:1
WORKDIR /OUT

COPY package*.json ./
RUN bun install
COPY . .
CMD ["bun", "."]