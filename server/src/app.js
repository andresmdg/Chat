// Modules
import "#env";

import path from "node:path";
import { Server } from "socket.io";
import { createServer } from "node:http";

// Imports
import db from "#db";
import app from "#app";
import { __dirname } from "#root";
import { chatsModel, usersModel } from "#models";
import { Log, loadRouters, loadEvents, verifyJWT } from "#utils";

// Variables
const { PORT } = process.env;

const server = createServer(app);
const io = new Server(server);

const eventsDir = path.join(__dirname, "src/events");
const routesDir = path.join(__dirname, "src/routes");

(async () => {
  try {
    // DB connection
    await db();
    // loading routers
    await loadRouters(app, routesDir);

    // Running server
    const listener = server.listen(
      PORT,
      () => new Log(`Listening on port: ${listener.address().port}`, "info")
    );

    // Websocket listener
    io.on("connection", async (socket) => {
      new Log("Connection with a user established", "info", "socket");

      // Comprobar si el usuario es válido:
      const [valid, uuid] = await verifyJWT(socket.handshake.query["x-token"]);
      if (!valid) {
        new Log(
          "Client disconnected  |  [REASON]  Invalid session token",
          "warning",
          "socket"
        );
        return socket.disconnect();
      }

      try {
        await usersModel.userOnline(uuid);

        // Obtener una lista de chat_ids en los que el usuario está involucrado
        const chatIds = await chatsModel.getUserChats(uuid);

        if (chatIds) {
          new Log("Chats id " + chatIds, "info", "socket");
          // Unirse a cada sala de chat
          chatIds.forEach((chatId) => {
            new Log(chatId, "info", "socket");
            socket.join(chatId);
          });
        }

        // Load socket events
        await loadEvents(uuid, socket, io, eventsDir);

        // Client emit events
        socket.onAny((eventName, ...args) => {
          new Log(
            `Event emitted by client  |  [EVENT]  '${eventName}'`,
            "info",
            "socket"
          );
        });
      } catch (error) {
        new Log(
          `Error joining chat rooms  |  [MESSAGE]  ${error.message}`,
          "error",
          "socket"
        );
        socket.disconnect();
      }
    });
  } catch (error) {
    new Log(error.message, error.level, error.emisor);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
})();
