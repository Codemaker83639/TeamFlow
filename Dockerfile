# backend/Dockerfile
FROM node:18-alpine # Usa una imagen base de Node.js ligera

WORKDIR /app # Establece el directorio de trabajo dentro del contenedor

COPY package*.json ./ # Copia los archivos de configuración de paquetes
RUN npm install --omit=dev # Instala las dependencias de producción

COPY . . # Copia todo el código fuente al contenedor

RUN npm run build # Compila la aplicación NestJS

CMD ["npm", "run", "start:prod"] # Comando para iniciar la aplicación en producción