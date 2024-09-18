# Documentación de WebSockets

Esta sección describe los eventos WebSocket disponibles para interactuar con la aplicación en tiempo real utilizando Socket.IO.

## Eventos

| Event            | Descripción                                        | Payload                                                                                                |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `message:send`   | Se emite cuando se envía un nuevo mensaje.         | `{ id: string, chat_id: string, sender_id: string, body: string, status: string, created_at: string }` |
| `message:update` | Se emite cuando un mensaje es actualizado.         | `{ id: string, body: string, status: string, updated_at: string }`                                     |
| `message:delete` | Se emite cuando un mensaje es eliminado.           | `{ id: string }`                                                                                       |
| `users:online`   | Se emite cuando uno o varios usuarios se conectan. | `{ user_id: string, username: string }`                                                                |

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

### Conectar un usuario

- **Cliente** se conecta y envía información sobre el usuario:

  ```javascript
  socket.emit("user:connected", {
    user_id: "uuid",
    username: "username",
  });
  ```

- **Servidor** emite el evento `user:connected` a todos los clientes conectados:

  ```javascript
  io.emit("user:connected", {
    user_id: "uuid",
    username: "username",
  });
  ```

### Desconectar un usuario

- **Cliente** se desconecta y envía información sobre el usuario:

  ```javascript
  socket.emit("user:disconnected", {
    user_id: "uuid",
  });
  ```

- **Servidor** emite el evento `user:disconnected` a todos los clientes conectados:

  ```javascript
  io.emit("user:disconnected", {
    user_id: "uuid",
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
