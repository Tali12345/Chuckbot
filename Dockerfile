FROM node:latest
worKDIR /app
COPY package*.json .
RUN npm install

COPY . .
CMD node index.js