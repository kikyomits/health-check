FROM node:11.2.0-alpine
ADD . /code
WORKDIR /code
RUN \
    npm install && \
    chmod -R ug+rwx  /code && \
    chown -R ${APP_USER}:root /code
ENTRYPOINT ["sh", "/code/start.sh"]