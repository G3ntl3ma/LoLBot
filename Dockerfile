FROM node:21.6.2
WORKDIR /OUT

COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "."]