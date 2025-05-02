FROM node:22-alpine3.21 as base

WORKDIR /app

COPY package*.json .

RUN npm install

#dev
FROM base as dev

WORKDIR /app

COPY prisma /prisma/

COPY . .

EXPOSE 3000

CMD [ "sh","-c","npm run db:deploy && npm run dev" ]
