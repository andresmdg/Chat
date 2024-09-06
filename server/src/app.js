// Modules
import 'dotenv/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

// Imports
import db from './config/db.js';
import app from './config/server.js';
import loadRouters from './utils/loadrouter.js'

// Variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT } = process.env;
const server = createServer(app);
const basedir = path.join(__dirname, 'routes');


(async () => {
    try {

        // DB connection
        await db(__dirname);
        // loading routers
        await loadRouters(app, basedir);

        // Running server
        const listener = server.listen(PORT, () => console.log(`[SR] listening on port: ${listener.address().port}`))

    } catch (error) {
        console.log(`[SR] An error was occured: ${error.message}`);
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }
})();