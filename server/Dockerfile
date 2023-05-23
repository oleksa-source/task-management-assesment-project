FROM node:lts

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /source

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 7800 7801

COPY package.json /source/package.json
COPY package-lock.json /source/package-lock.json
RUN npm ci

HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

COPY . /source

CMD [ "node", "src/index.js" ]
