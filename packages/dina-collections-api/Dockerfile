FROM keymetrics/pm2:latest-alpine

RUN apk update && apk add bash

# Bundle APP files
COPY dina-collections-api /etc/dina-collections-api/
COPY dina-schema /etc/dina-schema/
COPY dina-collections-ui /etc/dina-collections-ui/
COPY dina-semantic-ui /etc/dina-semantic-ui/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN cd /etc/dina-collections-api && npm install --production

# Show current folder structure in logs
RUN ls -al -R

CMD [ "cd dina-collections-api" "pm2-runtime", "start", "pm2.json" ]