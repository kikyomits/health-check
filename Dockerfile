FROM node:11.2.0-alpine
ADD . /code
WORKDIR /code
RUN \
    npm config set proxy http://10.208.104.36:8080 && \
    npm config set https-proxy http://10.208.106.36:8080 && \
    npm install

CMD ["sh", "start.sh"]