# Parte 1: Construir la aplicación de React
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Parte 2: Crear una imagen de nginx y copiar la aplicación construida
FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Configurar nginx para servir la aplicación React
COPY nginx.conf /etc/nginx/conf.d/default.conf
