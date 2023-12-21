FROM node:18
WORKDIR /app
COPY . /app
RUN npm install --production
EXPOSE 9000
CMD ["npm", "run", "start"]
