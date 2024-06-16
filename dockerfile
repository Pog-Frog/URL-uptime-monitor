FROM node:lts-alpine

RUN mkdir -p /app

RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]