# Dockerfile

FROM node:16.13.2-bullseye-slim 

COPY . /app

WORKDIR /app/backend

RUN npm install

CMD npm start
