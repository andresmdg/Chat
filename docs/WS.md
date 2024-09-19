# Documentación de WebSockets

Esta sección describe los eventos WebSocket disponibles para interactuar con la aplicación en tiempo real utilizando Socket.IO.

## Autenticación

Para autenticar la conexión WebSocket, el cliente debe enviar un token en el query string. Este token se usa para validar la sesión del usuario.

### Cliente

El cliente envía el token usando el query string de Socket.IO:

```javascript
import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverURL) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = io.connect(serverURL, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  };
};
```

### Servidor

El servidor verifica el token en el query string durante la conexión:

```javascript
import Server from "socket.io";
const io = new Server(server);

io.on("connection", async (socket) => {
  const token = socket.handshake.query["x-token"];
  const [valido, uid] = comprobarJWT(token);

  // Si el token no es de un usuario valido no establece una conexion
  if (!valido) return socket.disconnect();
  // Si es asi entonces actualiza la bd para mostrar que el usuario se ha conectado.
  await usuarioOnline(uuid);

  // Eventos de socket.io

  // ....
});
```

## Eventos

| Event            | Descripción                                            | Payload                                                                                                |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `chat:create`    | Se emite cuando un chat grupal o publico se ha creado. | `{ owner_id: string, name: string, isGroup: boolean }`                                                 |
| `message:send`   | Se emite cuando se envía un nuevo mensaje.             | `{ id: string, chat_id: string, sender_id: string, body: string, status: string, created_at: string }` |
| `message:update` | Se emite cuando un mensaje es actualizado.             | `{ id: string, body: string, status: string, updated_at: string }`                                     |
| `message:delete` | Se emite cuando un mensaje es eliminado.               | `{ id: string }`                                                                                       |
| `users:online`   | Se emite cuando uno o varios usuarios se conectan.     | `{ user_id: string, username: string }`                                                                |

## Ejemplo de Interacción

### Enviar un mensaje nuevo

- **Cliente** envía un mensaje a través de WebSocket usando Socket.IO:

  ```javascript
  socket.emit("message:send", {
    chat_id: "uuid",
    sender_id: "uuid",
    body: "Hello World!",
    status: "sent",
  });
  ```

- **Servidor** responde con el evento `message:send` a todos los clientes conectados:

  ```javascript
  io.emit("message:send", {
    id: "uuid",
    chat_id: "uuid",
    sender_id: "uuid",
    body: "Hello World!",
    status: "sent",
    created_at: "2024-09-15T10:00:00Z",
  });
  ```

### Actualizar un mensaje

- **Cliente** emite una solicitud para actualizar un mensaje:

  ```javascript
  socket.emit("message:update", {
    id: "uuid",
    body: "Updated message content",
    status: "updated",
  });
  ```

- **Servidor** responde con el evento `message:update` a todos los clientes conectados:

  ```javascript
  io.emit("message:update", {
    id: "uuid",
    body: "Updated message content",
    status: "updated",
    updated_at: "2024-09-15T10:15:00Z",
  });
  ```

### Eliminar un mensaje

- **Cliente** emite una solicitud para eliminar un mensaje:

  ```javascript
  socket.emit("message:delete", {
    id: "uuid",
  });
  ```

- **Servidor** responde con el evento `message:delete` a todos los clientes conectados:

  ```javascript
  io.emit("message:delete", {
    id: "uuid",
  });
  ```

### Obtener la lista de usuarios

- **Servidor** emite el evento `users:list` con la lista de usuarios conectados:

  ```javascript
  io.emit("users:list", {
    users: [
      { user_id: "uuid", username: "username" },
      { user_id: "uuid", username: "username" },
    ],
  });
  ```

## Notas

- Los eventos WebSocket deben ser manejados adecuadamente en el cliente para mantener la sincronización en tiempo real.
- Asegúrate de manejar la autenticación y la autorización de manera segura para evitar el acceso no autorizado a los datos a través de WebSocket.
