FROM keymetrics/pm2:latest-alpine

RUN apk update && apk add bash

# Bundle APP files
# Note that context need to be packages
COPY api /etc/api/
COPY common /etc/common/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN cd /etc/api && npm install --production

CMD [ "cd api" "pm2-runtime", "start", "pm2.json" ]