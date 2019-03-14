FROM node:10-alpine

# Install pm2
RUN npm install pm2@3.2.2 -g

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# Bundle APP files
# Note that context need to be root
COPY ./package.json /etc/package.json
COPY ./packages/migrations /etc/packages/migrations/
COPY ./packages/scripts /etc/packages/scripts/
COPY ./packages/backend /etc/packages/backend/
COPY ./packages/common /etc/packages/common/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN cd /etc/packages/migrations/ && yarn install --production --ignore-engines

CMD [ "cd packages/migrations  " "pm2-runtime", "start", "pm2.json" ]
