FROM node:20-alpine

RUN mkdir -p /app

RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]