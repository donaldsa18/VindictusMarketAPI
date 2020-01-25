FROM node:8
WORKDIR /usr/src/vindictusapi
COPY package*.json ./
RUN npm install
COPY *.js ./
copy src ./src
EXPOSE 3003
cmd ["npm","start"]