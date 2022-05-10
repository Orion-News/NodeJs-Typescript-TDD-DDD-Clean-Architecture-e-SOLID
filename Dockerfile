FROM node:14

COPY ./package.json .

RUN yarn install

# COPY ./dist ./dist

# EXPOSE 5000

# CMD yarn install