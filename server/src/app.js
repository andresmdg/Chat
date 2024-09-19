// Modules
import "dotenv/config";

import path from "node:path";
import { Server } from "socket.io";
import { createServer } from "node:http";

// Imports
import db from "#db";
import app from "#app";
import { __dirname } from "#root";
import { chatsModel } from "#models";
import { loadRouters, loadEvents, verifyJWT } from "#utils";

// Variables
const { PORT } = process.env;

const server = createServer(app);
const io = new Server(server);

const eventsDir = path.join(__dirname, "events");
const routesDir = path.join(__dirname, "routes");

(async () => {
  try {
    // DB connection
    await db();
    // loading routers
    await loadRouters(app, routesDir);

    // Running server
    const listener = server.listen(PORT, () =>
      console.log(`[SR] listening on port: ${listener.address().port}`)
    );

    // Websocket listener
    io.on("connection", async (socket) => {
      console.log("[IO] Connection with a user established");

      // Comprobar si el usuario es válido:
      const [valid, uuid] = await verifyJWT(socket.handshake.query["x-token"]);
      if (!valid) return socket.disconnect();

      try {
        // Obtener una lista de chat_ids en los que el usuario está involucrado
        const chatIds = await chatsModel.getUserChats(uuid);

        if (chatIds) {
          // Unirse a cada sala de chat
          chatIds.forEach((chatId) => {
            socket.join(chatId);
          });
        }

        // Load socket events
        await loadEvents(socket, io, eventsDir);
      } catch (error) {
        console.error("[IO] Error joining chat rooms:", error);
        socket.disconnect();
      }
    });
  } catch (error) {
    console.log(`[SR] An error was occured: ${error.message}`);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
})();
