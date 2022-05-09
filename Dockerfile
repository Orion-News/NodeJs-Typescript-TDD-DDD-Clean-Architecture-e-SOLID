FROM node:12

WORKDIR /usr/src/clean-node-api

COPY ./package.json .

RUN yarn install --only=prod

# COPY ./dist ./dist

# EXPOSE 5000

# CMD yarn install