FROM node:10-alpine

# Install pm2
RUN npm install pm2@3.2.2 -g

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554

# Bundle APP files
# Note that context need to be packages
COPY migrations /etc/migrations/
COPY scripts /etc/scripts/
COPY backend /etc/backend/
COPY common /etc/common/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN cd /etc/migrations && yarn install --production --ignore-engines

CMD [ "cd migrations  " "pm2-runtime", "start", "pm2.json" ]
