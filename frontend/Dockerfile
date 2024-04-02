FROM node:18

WORKDIR /app

COPY . .

RUN npm ci --force

RUN npm run build

EXPOSE 3000