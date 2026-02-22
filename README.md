# Gestor de Tareas - DataPoint

## Tecnologías Utilizadas

### Frontend (tasks-client)
- **Angular 20.3**: Framework moderno y reactivo para construir interfaces de usuario robustas
- **Tailwind CSS 4.2**: Framework de CSS utilitario para diseño responsive y accesible
- **RxJS 7.8**: Librería de programación reactiva para manejo de observables y flujos asincronos
- **TypeScript 5.9**: Lenguaje tipado que se compila a JavaScript
- **Testing**: Jasmine y Karma para pruebas unitarias

### Backend (tasks-server)
- **NestJS 11.0**: Framework moderno de Node.js/TypeScript con arquitectura modular y escalable
- **TypeORM 0.3**: ORM (Object-Relational Mapping) para interacción con la base de datos
- **Passport.js**: Middleware de autenticación flexible y modular
- **JWT (JSON Web Tokens)**: Sistema de autenticación sin estado basado en tokens
- **bcrypt 6.0**: Librería de hashing de contraseñas segura
- **SQLite (better-sqlite3)**: Base de datos relacional embebida y ligera
- **Jest**: Framework de testing moderno y robusto

### Servicios y Herramientas de Despliegue
- **Docker**: Containerización de la aplicación
- **Cloudflare Pages**: Despliegue del frontend (`tasks-client`)
- **Render**: Despliegue del backend (`tasks-server`) mediante Docker utilizando la image construida con Dockerfile.
- **pnpm**: Gestor de paquetes rápido y eficiente

---

## Descripción General de la Solución

### Arquitectura

La aplicación sigue una **arquitectura de capas limpia (Clean Architecture)** separada en cliente y servidor:

#### Backend - Arquitectura Modular
El servidor NestJS está organizado en módulos independientes, cada uno con tres capas:

1. **Capa de Dominio** (`domain/`): Contiene la lógica de negocio pura
   - Entidades: `Task.ts`, `User.ts`
   - Enumeraciones: `TaskStatus`, `TaskPriority`
   - Interfaces de repositorio: Definiciones de contratos

2. **Capa de Aplicación** (`application/`): Contiene los casos de uso
   - `CreateTaskUseCase.ts`
   - `DeleteTaskUseCase.ts`
   - `UpdateTaskUseCase.ts`
   - `GetTasksUseCase.ts`

3. **Capa de Infraestructura** (`infrastructure/`): Implementaciones técnicas
   - Controladores REST
   - Implementaciones de repositorios
   - Entidades ORM/Base de datos
   - DTOs (Data Transfer Objects)

**Módulos principales:**
- **AuthModule**: Manejo de autenticación y autorización con JWT
- **UsersModule**: Gestión de usuarios y hashing de contraseñas
- **TasksModule**: Lógica completa de gestión de tareas

#### Frontend - Arquitectura Basada en Componentes
La aplicación Angular utiliza:

1. **Componentes Standalone**: Componentes autónomos sin necesidad de módulos NgModule
2. **Routing**: Sistema modular de rutas (`app.routes.ts`) con guardias de autenticación
3. **Servicios**: Inyección de dependencias para lógica compartida
   - `AuthService`: Gestión de autenticación y tokens
   - `TaskApiService`: Comunicación con la API backend

4. **Shared**: Código reutilizable
   - Modelos de datos
   - Helpers y utilidades
   - Estados (enumeraciones)

#### Comunicación Cliente-Servidor
- **API REST**: Endpoints HTTP para CRUD de tareas y autenticación
- **Interceptores**: Inyección automática de tokens JWT en peticiones
- **Guardias**: Protección de rutas que requieren autenticación

---

## Funcionamiento de la Aplicación desde el Punto de Vista del Usuario

### Flujo de Uso

#### 1. **Acceso a la Aplicación**
El usuario accede a la aplicación web. Si no está autenticado, es redirigido automáticamente a la pantalla de **login**.

#### 2. **Inicio de Sesión**
- El usuario ingresa sus credenciales (usuario y contraseña)
- Las credenciales se envían de forma segura al servidor
- El servidor valida las credenciales y genera un **token JWT**
- El token se almacena localmente en el navegador
- El usuario es redirigido al panel principal de tareas

#### 3. **Panel de Tareas**
Una vez autenticado, el usuario ve una interfaz limpia y responsiva donde puede:

**Visualizar tareas:**
- Lista completa de sus tareas personales
- Información visible: título, descripción, estado, prioridad y fecha de vencimiento

**Crear nuevas tareas:**
- Formulario para agregar una nueva tarea
- Campos: título, descripción, prioridad (Alta, Media, Baja), fecha de vencimiento
- Al crear, la tarea se guarda en la base de datos del servidor
- Al finalizar se redirige al listado con datos actualizados

**Actualizar tareas existentes:**
- Editar título, descripción, estado (Pendiente, En Progreso, Completada)
- Cambiar prioridad o fecha de vencimiento
- Al finalizar se redirige al listado con datos actualizados

**Eliminar tareas:**
- Opción para eliminar tareas que ya no son necesarias

#### 4. **Sincronización en Tiempo Real**
- Todas las operaciones se comunican en tiempo real con el servidor
- La interfaz se actualiza automáticamente tras cada acción
- Los datos se mantienen sincronizados entre cliente y servidor

#### 5. **Gestión de Sesión**
- El token JWT tiene validez temporal
- Si la sesión expira, se solicita nuevamente autenticarse
- Al cerrar sesión, el token se elimina y se regresa a la pantalla de login

### Características de Seguridad
- **Autenticación basada en contraseña**: Las contraseñas se hashean con bcrypt antes de almacenarse
- **Tokens JWT**: Autenticación sin estado (stateless)
- **CORS configurado**: Control de acceso a la API
- **Guardias de rutas**: Solo usuarios autenticados pueden acceder a tareas
- **Interceptores**: Inyección automática del token en cada petición autorizada

### Experiencia de Usuario
- **Interfaz intuitiva**: Diseño limpio y moderno con Tailwind CSS
- **Responsiva**: Funciona perfectamente en dispositivos móviles, tablets y desktops
- **Reactividad**: Actualizaciones instantáneas sin necesidad de recargar la página
- **Validaciones**: Mensajes de error claros en caso de fallos
