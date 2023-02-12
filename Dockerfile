FROM node:18-alpine
WORKDIR /my-app
COPY . .
RUN npm install 
CMD ["node", "src/server.js"]
EXPOSE 3000
