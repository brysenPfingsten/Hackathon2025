FROM node:20-alpine

WORKDIR /app


RUN npm cache clean --force
COPY package.json package-lock.json ./
RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]