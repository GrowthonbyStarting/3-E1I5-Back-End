FROM node:18-alpine

WORKDIR /

COPY package*.json .npmrc ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]
