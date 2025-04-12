FROM node:20-alpine

WORKDIR /app


RUN npm cache clean --force
COPY package.json package-lock.json ./
RUN npm install


RUN npm install -g shadcn-ui@latest


COPY . .


RUN shadcn-ui init --yes && \
    shadcn-ui add card && \
    shadcn-ui add button


RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]