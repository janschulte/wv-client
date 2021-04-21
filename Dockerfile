FROM node:latest AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build:prod

FROM nginx:alpine
ENV PORT=80

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=builder /usr/src/app/dist/wv-client /usr/share/nginx/html
# the container can be started like this: docker run -p 80:80 -e PORT=80 mviz-demonstrator
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'