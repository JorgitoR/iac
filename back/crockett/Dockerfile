FROM node:16-alpine as builder
RUN mkdir -p /build

COPY ./package.json ./package-lock.json /build/
WORKDIR /build
RUN npm cache clean --force && rm -rf node_modules && npm install
RUN npm ci

COPY . /build

RUN npm run build

FROM node:16-alpine

ENV user node

USER $user

RUN mkdir -p /home/$user/src
WORKDIR /home/$user/src

COPY --from=builder /build ./

EXPOSE 3000

ENV NODE_ENV=dev
ENV PORT=80

CMD [ "npm", "run", "start:prod"]