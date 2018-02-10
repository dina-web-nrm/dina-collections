FROM swaggerapi/swagger-ui

ENV SWAGGER_JSON "openApi.json"
ENV API_URL "openApi.json"
COPY nginx.conf /etc/nginx/

ADD ./build/openApi.json /usr/share/nginx/html/
ADD ./build/swagger.json /usr/share/nginx/html/

RUN apk update && apk add bash
