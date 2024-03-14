FROM node:lts-alpine

WORKDIR /app
COPY . ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]