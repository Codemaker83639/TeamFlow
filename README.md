# Bienvenidos a TeamFlow🚀👥

**Tu Plataforma de Gestión de Proyectos para Equipos Remotos**  
_Proyecto de Tesis - Ingeniería en Sistemas **Francisco Ogando** & **José Luis Galán**_

---

## 📋 Descripción

**TeamFlow** es una plataforma web integral diseñada para la gestión de proyectos en equipos remotos. Construida con tecnologías modernas y arquitectura de microservicios, proporciona herramientas esenciales para la coordinación, seguimiento y análisis de productividad de equipos distribuidos geográficamente.

---

## 🎯 Problemas que buscamos resolver

- Falta de visibilidad en el progreso de proyectos remotos  
- Dificultades de coordinación entre equipos distribuidos  
- Ausencia de herramientas integradas de seguimiento de tiempo  
- Carencia de análisis de productividad accesibles para PyMEs  

---

## ✨ Características Principales

- 📊 **Tableros Kanban Interactivos** – Gestión visual de tareas con _drag & drop_  
- ⏱️ **Seguimiento de Tiempo Integrado** – Cronómetros y registro manual de horas  
- 👥 **Gestión de Equipos** – Roles, permisos y colaboración en tiempo real  
- 📁 **Gestión Documental Avanzada** – Versionado y organización de archivos  
- 📈 **Análisis de Productividad** – Reportes visuales y métricas de rendimiento  
- 🔔 **Notificaciones en Tiempo Real** – Sincronización instantánea mediante WebSockets  
- 📱 **Diseño Responsivo** – Interfaz optimizada para todo tipo de dispositivos  

---

## 🛠️ Stack Tecnológico

### Frontend

- **Vue.js 3** – Framework progresivo (Composition API)  
- **TypeScript** – Tipado estático  
- **Tailwind CSS** – Framework de utilidades CSS  
- **Pinia** – Gestión de estado moderna  
- **Vue Router** – Enrutamiento del cliente  

### Backend

- **NestJS** – Framework de Node.js con TypeScript  
- **TypeORM** – ORM para TypeScript/JavaScript  
- **JWT** – Autenticación basada en tokens  
- **WebSockets** – Comunicación en tiempo real  
- **Multer** – Manejo de archivos multipart  

### Base de Datos

- **PostgreSQL 15** – Base de datos relacional  
- **Redis 7** – Caché en memoria y gestión de sesiones  

### Infraestructura

- **Docker & Docker Compose** – Contenerización y orquestación  
- **Nginx** – Proxy inverso y servidor web  
- **GitHub Actions** – CI/CD _(próximamente)_

---

## ⛷️ Instalación y Configuración

### Prerrequisitos

- Node.js >= 16.0.0  
- npm >= 8.0.0  
- Docker >= 24.0.0  
- Docker Compose >= 2.0.0  
- Git >= 2.30.0  

### Configuración Rápida

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/teamflow.git
   cd teamflow

2. Instalar dependencias:

     ```bash
     npm run install:all

3. Levantar los servicios de desarrollo:

     ```bash
     npm run dev:services

4. Acceder a la aplicación:

    Frontend: http://localhost:8080

    Backend API: http://localhost:3000

    pgAdmin: http://localhost:8081

    Redis Commander: http://localhost:8082

---

## 📚 Comandos Disponibles

### Desarrollo

- npm run dev              # Levantar todos los servicios
- npm run dev:detached     # Levantar en segundo plano
- npm run dev:services     # Incluir herramientas de desarrollo
- npm run stop             # Detener todos los servicios
- npm run clean            # Limpiar contenedores y volúmenes

### Logs y Debugging

- npm run logs             # Logs generales
- npm run logs:backend     # Logs del backend
- npm run logs:frontend    # Logs del frontend
- npm run shell:backend    # Acceso al contenedor del backend
- npm run shell:postgres   # Acceso a PostgreSQL

### Base de Datos

- npm run db:migrate       # Ejecutar migraciones
- npm run db:seed          # Poblar con datos de prueba
- npm run db:reset         # Resetear y repoblar BD

### Testing y Calidad

- npm run test             # Ejecutar tests
- npm run lint             # Linter con ESLint
- npm run build            # Build para producción

---

## 🏗️ Arquitectura del Proyecto

tEl proyecto **teamflow** está dividido en dos partes principales: el frontend (desarrollado con **Vue.js**) y el backend (desarrollado con **NestJS**). A continuación, se detalla la estructura de carpetas y los elementos clave:

## Estructura General

- **client/**: Frontend con Vue.js  
  - **src/**
    - **components/**: Componentes reutilizables
    - **views/**: Vistas principales
    - **stores/**: Gestión de estado (Pinia)
    - **services/**: Llamadas a la API
    - **router/**: Rutas de la aplicación
    - **types/**: Tipado con TypeScript
  - **Dockerfile**

- **server/**: Backend con NestJS  
  - **src/**
    - **modules/**: Módulos funcionales
    - **common/**: Utilidades compartidas
    - **config/**: Configuraciones del sistema
    - **database/**: Entidades y migraciones
  - **Dockerfile**
  - **migrations/**: Migraciones de la base de datos
  - **seeds/**: Scripts de base de datos
  - **scripts/**: Scripts adicionales
  - **nginx/**: Configuración del proxy inverso

## Archivos de Configuración

- **docs/**: Documentación del proyecto
- **docker-compose.yml**: Orquestación con Docker

---

## 🎯 Objetivos del Proyecto

### Objetivo General
Desarrollar e implementar una plataforma web para la gestión de proyectos en equipos remotos, utilizando arquitectura de microservicios y tecnologías de contenedores.

### Objetivos Específicos

📊 Seguimiento de Tiempo y Análisis.
- Registro de horas por tarea.
- Informes visuales de productividad.
- Dashboards para líderes de equipo. 
---

📁 Gestión Documental
- Carga y versionado de archivos.
- Organización por proyecto.
- Sistema de búsqueda eficiente.
---

👥 Evaluación de Usabilidad
- Pruebas con 10–15 usuarios finales.
- Medición de métricas de usabilidad.
- Optimización de la experiencia de usuario.
---

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


