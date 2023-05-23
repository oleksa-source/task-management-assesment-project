FROM node:lts AS development

ENV CI=true
ENV PORT=3006

WORKDIR /source
COPY package.json /source/package.json
COPY package-lock.json /source/package-lock.json
RUN npm ci
COPY . /source

CMD [ "npm", "start" ]

FROM development AS builder
RUN npm run build

# Nginx Stage

FROM nginx:1.19.6
COPY --from=builder /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /source/build /usr/share/nginx/html
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]