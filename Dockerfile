FROM node:18-alpine AS base
WORKDIR /project
COPY . .
RUN npm install

FROM base AS test

FROM base AS prod
RUN npm run build
CMD npm run start
EXPOSE 3000