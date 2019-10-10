# => Build container
FROM node:10-alpine as build

WORKDIR /mongo-scraper-client

COPY package.json /mongo-scraper-client/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /mongo-scraper-client

RUN npm run build

#=> Run container
FROM nginx:1.16.0

COPY --from=build /mongo-scraper-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""] 