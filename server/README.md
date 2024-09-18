# EsChat Backend

Una aplicación de chat en tiempo real con soporte para mensajería, autenticación, grupos, roles y permisos. La aplicación utiliza WebSockets para la comunicación en tiempo real y una base de datos SQLite para el almacenamiento de datos.

## Características

- **Autenticación**: Registro e inicio de sesión de usuarios con manejo seguro de credenciales.
- **Mensajería en tiempo real**: Comunicación instantánea a través de WebSockets.
- **Grupos y Roles**: Creación de grupos, asignación de roles y permisos personalizados.
- **Almacenamiento**: Gestión de mensajes, usuarios, contactos y grupos utilizando SQLite.
- **UUID**: Uso de UUIDs para identificadores únicos de usuarios, mensajes, chats, etc.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [WebSockets](#websockets)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/andresmdg/Chat.git
   ```

2. Navega al directorio del servidor:

   ```bash
   cd Chat/server
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del directorio `server` con los siguientes valores:

   > Consulta el archivo `.env.example` para obtener la estructura y los valores necesarios para configurar el entorno.

5. Inicializa la base de datos:

   ```bash
   npm run initdb
   ```

6. Inicia la aplicación:

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Uso

1. Regístrate o inicia sesión a través de los endpoints de autenticación.
2. Usa la interfaz de usuario (UI) o el cliente WebSocket para enviar y recibir mensajes en tiempo real.
3. Crea grupos, asigna roles y gestiona contactos a través de la API.

## API Endpoints

El backend provee varios endpoints para interactuar con el sistema. Para detalles completos, consulta la [documentación de la API](../docs/API.md).

### Autenticación

- **`POST /api/login`**: Inicia sesión en la aplicación.
- **`POST /api/register`**: Registra un nuevo usuario.

### Mensajes

- **`GET /api/messages/:chat_id`**: Obtiene los mensajes por el ID del chat.

## WebSockets

La aplicación utiliza WebSockets para manejar la comunicación en tiempo real. Algunos de los eventos disponibles incluyen:

- **`message:send`**: Se emite cuando se envía un nuevo mensaje.
- **`message:update`**: Se emite cuando un mensaje es actualizado.
- **`user:connected`**: Se emite cuando un usuario se conecta.

Para detalles completos de los eventos WebSocket, consulta la [documentación de WebSockets](../docs/WS.md).

## Estructura de la Base de Datos

La aplicación utiliza SQLite para el almacenamiento de datos. La estructura de las tablas incluye:

- **`users`**: Almacena los usuarios registrados.
- **`chats`**: Almacena los chats (individuales y grupales).
- **`messages`**: Almacena los mensajes enviados.
- **`groups`**: Almacena la información de los grupos.
- **`roles`** y **`permissions`**: Maneja roles y permisos para usuarios y grupos.

Todos los registros utilizan UUIDs como identificadores únicos. Para más detalles sobre la estructura de la base de datos, consulta el archivo [initdb.js](./src/utils/initdb.js).

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](../LICENSE) para más detalles.

---

Este README está adaptado para la estructura del backend del proyecto. Ajusta los detalles según sea necesario para que se adapten a la estructura y características específicas de tu aplicación.
