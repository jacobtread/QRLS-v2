FROM node:14-alpine3.12 as backend-build

WORKDIR /usr/src/app
COPY backend/package.json package.json
RUN npm install
COPY backend .
RUN npm run build

FROM node:14-alpine3.12 as frontend-build

WORKDIR /usr/src/app
COPY frontend/package.json package.json
RUN npm install
COPY frontend .
RUN npm run build

FROM node:14-alpine3.12 as run

WORKDIR /usr/src/app/dist

COPY --from=backend-build /usr/src/app/dist .
COPY --from=frontend-build /usr/src/app/dist ./public

COPY backend/package.json package.json

RUN npm install --production

EXPOSE 3000

CMD ["node", "main"]
