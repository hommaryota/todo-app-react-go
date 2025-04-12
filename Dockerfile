FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY server.ts ./

EXPOSE 3000

CMD ["npm", "run", "dev"]