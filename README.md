# Proyecto Node JWT con TypeScript

Este proyecto es una API RESTful construida con Node.js, TypeScript, JWT para autenticación y PostgreSQL como base de datos. Utiliza Prisma como ORM para interactuar con la base de datos.

## Tecnologías Usadas

- Node.js
- TypeScript
- Express
- JWT (JSON Web Tokens)
- PostgreSQL
- Prisma
- Docker

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/proyecto-node-jwt-ts.git
   cd proyecto-node-jwt-ts

   ```

2. Instalar dependencias:

   ```npm install

   ```

3. Configurar variables de entorno:

   Se facilita un env template.

4. Iniciar los servicios de Docker:

   ```bash docker-compose up -d

   ```

5. Ejecutar las migraciones de Prisma:

   ```npx prisma migrate dev

   ```

6. Correr el proyecto:

   ```npm run dev

   ```

## Explicación del proyecto

El servidor estará disponible en http://localhost:3000.

Endpoints
POST /auth/register - Registrar un nuevo usuario
POST /auth/login - Iniciar sesión
GET /user - Obtener todos los usuarios (requiere autenticación)
GET /user/:id - Obtener un usuario por ID (requiere autenticación)
PUT /user/:id - Editar un usuario por ID (requiere autenticación)
DELETE /user/:id - Eliminar un usuario por ID (requiere autenticación)
