# Eschat

Eschat es una aplicación de chat completa construida con un frontend en React (Vite) y un backend en Express. Este repositorio contiene todo el código necesario para ejecutar la aplicación, incluyendo el cliente, el servidor y la documentación relacionada.

## Estructura del Repositorio

El repositorio está organizado de la siguiente manera:

```
eschat
├─ client/               # Aplicación frontend (React + Vite)
├─ server/               # Aplicación backend (Express + Socket.io)
├─ docs/                 # Documentación del proyecto
├─ .gitignore            # Archivos y carpetas ignorados por Git
├─ README.md             # Este archivo
└─ .git/                 # Archivos y configuraciones de Git
```

## Documentación

La carpeta `docs` contiene la documentación de la API y WebSocket de la aplicación:

```
docs/
├─ API.md                # Documentación de la API REST
├─ WS.md                 # Documentación de WebSockets
└─ README.md             # Documentación general
```

## Configuración

### Requisitos Previos

- Node.js y npm instalados

### Instalación

> Esto solo instala las dependencias; sin embargo, se requiere una configuración adicional que está detallada en el README correspondiente de cada parte de la aplicación.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/andresmdg/Chat.git
   cd Chat
   ```

2. Instala las dependencias para el servidor:

   ```bash
   cd server
   npm install
   ```

3. Instala las dependencias para el cliente:

   ```bash
   cd ../client
   npm install
   ```

### Ejecución

#### Servidor

Para iniciar el servidor, navega a la carpeta `server` y ejecuta:

```bash
npm start
```

Esto iniciará el servidor Express.

#### Cliente

Para iniciar el cliente, navega a la carpeta `client` y ejecuta:

```bash
npm run dev
```

Esto iniciará la aplicación frontend en modo de desarrollo.

### Entorno de Desarrollo

- El cliente utiliza Vite para el desarrollo y la construcción.
- El servidor utiliza Express para manejar las rutas y la lógica de backend.
- El cliente y el servidor, ambos utilizan socket.io para mensajes en tiempo real.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.

---

Este README proporciona una visión general del repositorio, cubre la estructura de carpetas, los pasos para la instalación y ejecución del proyecto.