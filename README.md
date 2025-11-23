# CRUD Servicios (Node.js + Express + MongoDB)

## Descripción del proyecto

API REST desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)** para gestionar la colección **Servicios**.  
Permite realizar las operaciones **CRUD**:

-   Crear un servicio
-   Obtener todos los servicios
-   Obtener un servicio por ID
-   Actualizar un servicio
-   Eliminar un servicio

---

## Cómo instalar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/juliogtrenard/crud-servicios.git
```

Entrar al proyecto:

```bash
cd crud-servicios
```

Instalar dependencias:

```bash
npm install
```

---

## Cómo levantarlo en local

Ejecutar en modo desarrollo:

```bash
npm run dev
```

O en modo producción:

```bash
npm start
```

---

## Variables de entorno necesarias

Modifica el .env.template con lo siguiente:

MONGODB_URI= **Modifica el username y password**
PORT= **Tu puerto**

---

## URL del despliegue en Render

---

## Endpoints para probar en Postman

### Crear un servicio

POST /api/v1/servicios

```json
{
    "nombre": "Mantenimiento de equipos",
    "descripcion": "Revisión completa del sistema",
    "precio": 120
}
```

### Obtener todos los servicios

GET /api/v1/servicios

### Obtener un servicio por ID

GET /api/v1/servicios/:id

### Actualizar un servicio

PUT /api/v1/servicios/:id

```json
{
    "precio": 150
}
```

### Eliminar un servicio

DELETE /api/v1/servicios/:id

## Tecnologías utilizadas

-   Node.js

-   Express

-   MongoDB

-   Mongoose

-   Render
