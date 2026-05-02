const express = require("express");
const log = require("./logger");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  await log("backend", "info", "route", "home route hit");

  res.json({
    status: "ok",
    message: "Server is running"
  });
});

app.get("/error", async (req, res) => {
  await log("backend", "error", "handler", "error route accessed");

  res.json({
    success: false,
    info: "Error route"
  });
});

app.get("/debug", async (req, res) => {
  await log("backend", "debug", "service", "debug route called");

  res.json({
    message: "Debug data processed",
    status: "success"
  });
});

app.listen(3000, async () => {
  await log("backend", "info", "service", "server started");
});