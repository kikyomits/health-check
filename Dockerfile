FROM node:11.2.0-alpine
ADD . /code
WORKDIR /code
RUN npm install

CMD ["node", "./app/index.js"]