# Dockerfile

FROM node:12

COPY . /app

WORKDIR ./app/backend

RUN npm install

CMD npm start
