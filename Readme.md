# Tortas Y Decoraciones

Descripción concisa de tu aplicación.

## Requisitos

Asegúrate de tener instalado Node.js y npm en tu máquina.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
    npm install
   ```

## Configuración
Asegúrate de configurar los siguientes elementos antes de ejecutar la aplicación:

MongoDB Atlas URI: Define la variable de entorno DB_MONGOATLAS en tu archivo .env con la URI de tu base de datos MongoDB Atlas.

Secret de Sesión: Define la variable de entorno SESSION_SECRET en tu archivo .env con una cadena segura para el manejo de sesiones.






## Uso
Inicia la aplicación con el siguiente comando:
```
npm start

```

## Estructura del proyecto

```
/
|-- public/         # Archivos estáticos (CSS, imágenes, etc.)
|-- router/         # Rutas de la aplicación
|-- views/          # Plantillas Handlebars
|-- .env            # Archivo de configuración con variables de entorno
|-- app.js          # Archivo principal de la aplicación
|-- package.json    # Archivo de configuración de npm
|-- README.md       # Este archivo


```

## Dependencias principales

Dependencias Principales
Express: Framework web para Node.js
MongoDB: Base de datos NoSQL
Handlebars: Motor de plantillas
Morgan: Middleware para el registro de solicitudes HTTP
Cors: Middleware para el manejo de CORS
Express Fileupload: Middleware para la carga de archivos




## Configuración de Sesión
La aplicación utiliza el middleware de manejo de sesiones con MongoDB para almacenar sesiones de usuario.

Rutas Principales
/usuario: Rutas relacionadas con usuarios.
/admin: Rutas para el panel de administración.
/cliente: Rutas para el cliente.
/producto: Rutas relacionadas con productos.
/pedido: Rutas relacionadas con pedidos.




