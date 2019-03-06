FROM node:10-alpine

# Install pm2
RUN npm install pm2@3.2.2 -g

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

RUN apk update && apk add bash

# Bundle APP files
# Note that context need to be packages
COPY backend /etc/api/
COPY common /etc/common/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN cd /etc/api && yarn install --production --ignore-engines

CMD [ "cd api" "pm2-runtime", "start", "pm2.json" ]