FROM node:14-alpine3.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

COPY /usr/src/app/dist ./dist

RUN cd frontend && npm run build

COPY /user/src/app/public ./public

CMD ["node", "dist/main"]