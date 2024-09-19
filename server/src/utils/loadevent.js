import path from "node:path";
import fs from "node:fs/promises";

import { __dirname } from "#root";

async function loadEvents(client, io, baseDir) {
  let currentDir = "";
  const stack = [baseDir];

  while (stack.length) {
    currentDir = stack.pop();

    let files = await fs.readdir(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const fileStat = await fs.lstat(filePath);
      if (fileStat.isDirectory()) stack.push(filePath);
      else if (file.endsWith(".js")) {
        const eventName = parseEventName(baseDir, filePath);
        try {
          let eventModule = await import(filePath);
          if (eventModule.default)
            client.on(
              eventName,
              eventModule.default.bind(null, { eventName, client, io })
            );
          else
            console.warn(
              `[IO] File ${filePath} does not export a default Event.`
            );
        } catch (err) {
          console.error(
            "[IO] There was an error initializing the " + eventName + " event",
            err
          );
        }
      }
    }
  }
}

function parseEventName(basedir, filePath) {
  let relativePath = path.relative(basedir, filePath).split(".js").join("");
  let route = relativePath.split("/").join(":");

  return route;
}

export default loadEvents;
