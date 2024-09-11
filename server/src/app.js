// Modules
import "dotenv/config";

import path from "node:path";
import { createServer } from "node:http";

// Imports
import db from "#db";
import app from "#app";
import { __dirname } from '#root';
import { loadRouters } from "#utils";

// Variables
const { PORT } = process.env;
const server = createServer(app);
const basedir = path.join(__dirname, "routes");

(async () => {
  try {
    // DB connection
    await db();
    // loading routers
    await loadRouters(app, basedir);

    // Running server
    const listener = server.listen(PORT, () =>
      console.log(`[SR] listening on port: ${listener.address().port}`)
    );
  } catch (error) {
    console.log(`[SR] An error was occured: ${error.message}`);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
})();