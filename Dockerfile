FROM nginx:1.17.0-alpine
RUN rm -rf /etc/nginx/conf.d

COPY nginx/static-server /etc/nginx
# Allow all users to write to /var/cache/nginx
RUN chmod -Rc a+w /var/cache/nginx

# Allow all users to write to /run (for nginx.pid files)
RUN chmod -c a+w /run

COPY build /usr/share/nginx/html

RUN nginx -t

# Remove the created nginx.pid file
RUN rm -v /var/run/nginx.pid

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
