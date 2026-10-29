FROM nginx:1.30-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html impressum.html 404.html robots.txt /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

HEALTHCHECK --interval=60s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
