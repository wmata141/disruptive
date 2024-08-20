# Disruptive

Un proyecto fullstack que implementa un sistema de gestión con autenticación utilizando Node.js, Express, JWT, MongoDB y React.

## Estructura del Proyecto

El repositorio está dividido en dos carpetas principales:

- **backend**: Contiene la API construida con Node.js, Express, y MongoDB. Utiliza JWT para la autenticación de usuarios.
- **frontend**: Contiene la aplicación cliente construida con React.

## Tecnologías Utilizadas

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT (JSON Web Tokens)
  - Nodemon (para desarrollo)

- **Frontend**
  - React
  - Axios (para solicitudes HTTP)
  - React Router (navegación)

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (deberías tener una base de datos en ejecución)

## Instalación

### Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/disruptive.git
cd disruptive

Configuración del Backend
Navega a la carpeta del backend:

cd backend
Instala las dependencias:

 npm install
Crea un archivo .env en la carpeta backend y añade las variables de entorno necesarias:

PORT=8000
MONGO_URL=direccion_cloudter_atlas_mongodb 
SECRET_KEY=clave_secreta_para_jsonwebtoken

Ejecuta el servidor:

npm run dev
Esto ejecutará el servidor usando Nodemon.

Configuración del Frontend
Navega a la carpeta del frontend:

cd ../frontend
Instala las dependencias:

npm install
Ejecuta la aplicación React:

npm start
La aplicación debería estar disponible en http://localhost:3000.

Uso
Una vez que el backend y el frontend estén en funcionamiento, podrás interactuar con la API a través de la aplicación frontend. Puedes registrarte, iniciar sesión y realizar operaciones que requieran autenticación.

Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto conmigo:

William Mata
wxmm141@gmail.com
¡Gracias por usar Disruptive!
