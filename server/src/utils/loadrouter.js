import path from "node:path";
import fs from "node:fs/promises";
import { Log, parseRouter } from "#utils";

async function loadRouters(client, baseDir) {
  let dir = "";
  const stack = [baseDir];

  while (stack.length) {
    dir = stack.pop();

    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = await fs.lstat(filePath);

        if (fileStat.isDirectory()) {
          stack.push(filePath);
        } else if (file.endsWith(".js")) {
          const routePath = parseRouter(baseDir, filePath);
          try {
            const routeModule = await import(filePath);
            const relativePath = path.relative(baseDir, filePath);
            if (routeModule.default) {
              client.use(`/${routePath}`, routeModule.default);
              new Log(
                `Loaded '/${routePath}'  |  [SOURCE]  ${relativePath}`,
                "info",
                "router"
              );
            } else {
              new Log(
                `${relativePath} lacks default export.`,
                "warning",
                "router"
              );
            }
          } catch (err) {
            new Log(
              `Error importing ${relativePath}  |  [REASON]  ${err.message}`,
              "error",
              "router"
            );
          }
        }
      }
    } catch (err) {
      throw new Log(
        `Error reading ${dir}  |  [REASON]  ${err.message}`,
        "error",
        "router"
      );
    }
  }
}

export default loadRouters;
