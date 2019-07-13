FROM node:lts-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]