FROM node:18-alpine3.17

LABEL maintainer="duncankithinji91@gmail.com"
LABEL description="Audiophile Website Development Docker Image"

ENV APP_HOME=/app 
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

COPY package*.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]