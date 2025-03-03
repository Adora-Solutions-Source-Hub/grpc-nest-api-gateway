FROM node:18.18.0

USER root
ENV NODE_ENV development
RUN apt-get update && \
    apt-get install -y yarn
#     apt-get install -y --no-install-recommends ffmpeg && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

USER node

WORKDIR /usr/src/app


COPY package*.json ./
COPY .env ./
COPY --chown=node:node . .

RUN yarn install 
RUN yarn build

EXPOSE 9090

CMD ["node", "dist/main.js"]
