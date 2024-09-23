// Modules
import path from "path";
import cors from "cors";
import express from "express";

// Imports
import { helmetMid, morganMid } from "#middlewares";

// Variables
const app = express();

// Middlewares

app.use(cors());
app.use(helmetMid());
app.use(morganMid());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default app;
