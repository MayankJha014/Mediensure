FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN chmod -R 775 .babelrc
RUN npm install pm2 -g
#CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
