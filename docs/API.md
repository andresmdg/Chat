# Documentación de la API

Esta sección describe los endpoints disponibles para interactuar con la API.

> **NOTA:** Todos los endpoints comienzan con `${URL}/api/` antes de cada endpoint.

## Autenticación

| Method | Endpoint    | Descripción               | Response                                               |
| ------ | ----------- | ------------------------- | ------------------------------------------------------ |
| POST   | `/login`    | Autentica un usuario      | `{ success: boolean, token: string, message: string }` |
| POST   | `/register` | Registra un nuevo usuario | `{ success: boolean, message: string }`                |

### `/login`

Permite a los usuarios autenticarse en la aplicación. Devuelve un token JWT si la autenticación es exitosa.

- **Request Body**:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "message": "Login successful"
  }
  ```

### `/register`

Permite registrar un nuevo usuario en el sistema.

- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Registration successful"
  }
  ```

## Mensajes

| Method | Endpoint             | Descripción                                       | Response              |
| ------ | -------------------- | ------------------------------------------------- | --------------------- |
| GET    | `/messages/:chat_id` | Obtiene todos los mensajes de un chat por chat ID | `{ messages: array }` |

### `/messages/:chat_id`

Recupera los mensajes utilizando el chat ID.

- **Request Parameters**:
  - `chat_id` (string): UUID del chat.
- **Response**:
  ```json
  {
    "messages": [
      {
        "id": "uuid",
        "chat_id": "uuid",
        "sender_id": "uuid",
        "body": "string",
        "status": "string",
        "created_at": "timestamp"
      }
    ]
  }
  ```
