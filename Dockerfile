FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && \
    npx tsc && \
    cd frontend && \
    npm install && \
    npm run build

COPY tsconfig.json ./
COPY server.ts ./

EXPOSE 3000

CMD ["npm", "start"]
