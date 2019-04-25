FROM node:10.15.3
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install && yarn cache clean
## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
EXPOSE 8787

