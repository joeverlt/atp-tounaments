FROM node:latest

RUN apt update
RUN apt install nano git -y
COPY ["package.json", "/usr/src/"]
WORKDIR /usr/src
RUN yarn install
COPY [".", "/usr/src/"]
RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
