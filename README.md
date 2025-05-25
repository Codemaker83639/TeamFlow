### ¡Bienvenidos a TeamFlow🚀!<br>
Su Plataforma de Gestión de Proyectos para Equipos Remotos.
---

### 📋 Descripción.
TeamFlow es una plataforma web integral diseñada específicamente para la gestión de proyectos en equipos remotos. Desarrollada con tecnologías modernas y arquitectura de microservicios, ofrece herramientas esenciales para la coordinación, seguimiento y análisis de productividad en equipos distribuidos geográficamente.<br>

### 🎯 Problemas que Resuelve.
Falta de visibilidad en el progreso de proyectos remotos.<br>
Dificultades de coordinación entre equipos distribuidos.<br>
Ausencia de herramientas integradas de seguimiento de tiempo.<br>
Carencia de análisis de productividad accesibles para PyMEs.<br>

### ✨ Características Principales
📊 Tableros Kanban Interactivos - Gestión visual de tareas con drag & drop.<br>
⏱️ Seguimiento de Tiempo Integrado - Cronómetros y registro manual de horas.<br>
👥 Gestión de Equipos - Roles, permisos y colaboración en tiempo real.<br>
📁 Gestión Documental Avanzada - Versionado y organización de archivos.<br>
📈 Análisis de Productividad - Reportes visuales y métricas de rendimiento.<br>
🔔 Notificaciones en Tiempo Real - WebSockets para sincronización instantánea.<br>
📱 Diseño Responsivo - Interfaz optimizada para todos los dispositivos.<br>
---

### 🛠️ Stack Tecnológico

*Frontend*<br>
Vue.js 3 - Framework progresivo con Composition API.<br>
TypeScript - Tipado estático para mayor robustez.<br>
Tailwind CSS - Framework de utilidades CSS.<br>
Pinia - Gestión de estado moderna para Vue.<br>
Vue Router - Enrutamiento del lado del cliente.<br>

*Backend*<br>
NestJS - Framework de Node.js con TypeScript.<br>
TypeORM - ORM para TypeScript y JavaScript.<br>
JWT - Autenticación mediante tokens.<br>
WebSockets - Comunicación en tiempo real.<br>
Multer - Manejo de archivos multipart.<br>

*Base de Datos*<br>
PostgreSQL 15 - Base de datos relacional principal.<br>
Redis 7 - Caché en memoria y gestión de sesiones.<br>

*Infraestructura*
Docker & Docker Compose - Contenedorización y orquestación
Nginx - Proxy inverso y servidor web
GitHub Actions - CI/CD (próximamente)<br>
---

### 🚀 Instalación y Configuración.

*Prerrequisitos*<br>
Node.js >= 16.0.0<br>
npm >= 8.0.0<br>
Docker >= 24.0.0<br>
Docker Compose >= 2.0.0<br>
Git >= 2.30.0<br>

*Configuración Rápida*<br>
Clonar el repositorio:<br>
git clone https://github.com/tu-usuario/teamflow.git<br>
cd teamflow<br>

# Instalar dependencias
bash
npm run install:all<br>

# Levantar servicios de desarrollo
bash
npm run dev:services<br>

# Acceder a la aplicación
Frontend: http://localhost:8080
Backend API: http://localhost:3000
pgAdmin: http://localhost:8081
Redis Commander: http://localhost:8082<br>


### Configurar variables de entorno
bash
cp .env.example .env<br>

### Editar .env con tus configuraciones
Levantar base de datos
bash
docker-compose up postgres redis -d
Instalar y ejecutar backend
bash
cd server
npm install
npm run start:dev
Instalar y ejecutar frontend
bash
cd client
npm install
npm run dev<br>

*📚 Comandos Disponibles.*
Desarrollo
bash
npm run dev              # Levantar todos los servicios
npm run dev:detached     # Levantar en background
npm run dev:services     # Incluir herramientas de desarrollo
npm run stop             # Detener todos los servicios
npm run clean            # Limpiar contenedores y volúmenes
Logs y Debugging
bash
npm run logs             # Ver logs de todos los servicios
npm run logs:backend     # Ver logs del backend
npm run logs:frontend    # Ver logs del frontend
npm run shell:backend    # Acceder al contenedor del backend
npm run shell:postgres   # Acceder a PostgreSQL
Base de Datos
bash
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Poblar con datos de prueba
npm run db:reset         # Resetear y repoblar BD
Testing y Calidad
bash
npm run test             # Ejecutar todos los tests
npm run lint             # Verificar código con ESLint
npm run build            # Construir para producción<br>


*🏗️ Arquitectura del Proyecto.*<br>

teamflow/
├── 📁 client/                    # Frontend Vue.js
│   ├── 📁 src/
│   │   ├── 📁 components/        # Componentes reutilizables
│   │   ├── 📁 views/             # Páginas principales
│   │   ├── 📁 stores/            # Gestión de estado (Pinia)
│   │   ├── 📁 services/          # Servicios API
│   │   ├── 📁 router/            # Configuración de rutas
│   │   └── 📁 types/             # Definiciones TypeScript
│   └── 📄 Dockerfile
├── 📁 server/                    # Backend NestJS
│   ├── 📁 src/
│   │   ├── 📁 modules/           # Módulos de la aplicación
│   │   ├── 📁 common/            # Utilidades compartidas
│   │   ├── 📁 config/            # Configuraciones
│   │   └── 📁 database/          # Entidades y migraciones
│   └── 📄 Dockerfile
├── 📁 database/                  # Scripts de BD
│   ├── 📁 migrations/            # Migraciones SQL
│   ├── 📁 seeds/                 # Datos de prueba
│   └── 📁 scripts/               # Scripts de inicialización
├── 📁 nginx/                     # Configuración Nginx
├── 📁 docs/                      # Documentación
└── 📄 docker-compose.yml         # Orquestación de servicios<br>

*🎯 Objetivos del Proyecto*<br>

# Objetivo General<br>
Desarrollar e implementar una plataforma web de gestión de proyectos para equipos remotos, utilizando arquitectura de microservicios y tecnologías de contenedorización.<br>

# Objetivos Específicos<br>
📊 Seguimiento de Tiempo y Análisis
Implementar funcionalidad de registro de horas por tarea
Generar informes visuales de productividad
Crear dashboards para líderes de equipo
📁 Gestión Documental Avanzada
Desarrollar módulo de carga y versionado de archivos
Implementar organización por proyecto
Crear sistema de búsqueda eficiente
👥 Evaluación de Usabilidad
Conducir pruebas con 10-15 usuarios finales
Medir métricas de tiempo de completitud
Optimizar la experiencia de usuario
🤝 Contribución
Este es un proyecto de tesis académica. Si tienes sugerencias o encuentras bugs, por favor:

Abre un Issue describiendo el problema
Si deseas contribuir, haz un Fork del proyecto
Crea una branch para tu feature: git checkout -b feature/nueva-funcionalidad
Haz commit de tus cambios: git commit -m 'Agregar nueva funcionalidad'
Haz push a la branch: git push origin feature/nueva-funcionalidad
Abre un Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👨‍💻 Autor
[Tu Nombre]

🎓 Estudiante de Ingeniería en Sistemas
📧 Email: tu.email@ejemplo.com
🐙 GitHub: @tu-usuario
💼 LinkedIn: Tu Perfil
📊 Estado del Proyecto
 ✅ Configuración inicial y arquitectura
 ✅ Estructura de directorios
 ✅ Configuración Docker
 🔄 Implementación del backend (En progreso)
 ⏳ Desarrollo del frontend
 ⏳ Sistema de autenticación
 ⏳ Módulo de gestión de proyectos
 ⏳ Tableros Kanban
 ⏳ Seguimiento de tiempo
 ⏳ Gestión documental
 ⏳ Sistema de notificaciones
 ⏳ Análisis y reportes
 ⏳ Pruebas de usabilidad
 ⏳ Documentación final
Desarrollado con ❤️ para equipos remotos en todo el mundo

