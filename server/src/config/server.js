// Modules
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

// Imports

// Variables
const app = express();
const { CLI_PORT } = process.env;

// Middlewares

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.socket.io",
          "https://cdn.jsdelivr.net/",
          "'unsafe-inline'",
        ],
        connectSrc: [
          "'self'",
          `ws://127.0.0.1:${CLI_PORT}`,
          `wss://127.0.0.1:${CLI_PORT}`,
        ],
      },
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default app;
