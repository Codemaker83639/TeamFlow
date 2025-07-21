# client/Dockerfile (Versión de Desarrollo)

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# El puerto por defecto que usa Vite
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo y permitir conexiones externas
CMD ["npm", "run", "dev", "--", "--host"]