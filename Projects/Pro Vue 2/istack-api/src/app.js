import express from "express";
import path from "path";
import dotenv from "dotenv";
import { Model } from "objection";
const knexfile = require("../knexfile");
const knex = require("knex")(knexfile[process.env.NODE_ENV]);

import user from "./routes/user";
import status from "./routes/status";
import priority from "./routes/priority";
import processing_level from "./routes/processing_level";
import image from "./routes/image";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Objection setup

Model.knex(knex);

// Routes
app.use("/api/users", user);
app.use("/api/statuses", status);
app.use("/api/priorities", priority);
app.use("/api/processing_levels", processing_level);
app.use("/api/images", image);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = app;
