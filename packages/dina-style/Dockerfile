FROM nginx

# Add produciton build of Collection manager to public folder.
ADD ./out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.template
