FROM node:10-alpine

WORKDIR /mongo-scraper-backend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]