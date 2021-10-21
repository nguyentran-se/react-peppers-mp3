FROM node:14.15.4-alpine as build-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


# nginx
FROM nginx:1.19.4-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
