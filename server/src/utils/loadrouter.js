import path from 'node:path';
import fs from 'node:fs/promises';

import parseRouter from './parserouter.js';

async function loadRouters(client, baseDir) {
	let dir = '';
	let stack = [baseDir];

	while (stack.length) {
		dir = stack.pop();

		try {
			const files = await fs.readdir(dir);

			for (const file of files) {
				const filePath = path.join(dir, file);
				const fileStat = await fs.lstat(filePath);

				if (fileStat.isDirectory())
					stack.push(filePath);
				else if (file.endsWith('.js')) {
					const routePath = parseRouter(baseDir, filePath);
					try {
						const routeModule = await import(filePath);
						if (routeModule.default) {
							client.use(`/${routePath}`, routeModule.default);
						} else {
							console.warn(`[SR] File ${filePath} does not export a default Router.`);
						}
					} catch (err) {
						console.error(`[SR] Error importing route from ${filePath}: ${err.message}`);
					}
				}
			}
		} catch (err) {
			console.error(`[SR] Error reading directory ${dir}: ${err.message}`);
		}
	}
}

export default loadRouters;
