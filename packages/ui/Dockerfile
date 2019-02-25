FROM nginx:1.15

# Add produciton build of Collection manager to public folder.
ADD ./build/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.template
