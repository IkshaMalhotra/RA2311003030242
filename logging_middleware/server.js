const expressLib = require("express");
const loggerFunction = require("./logger");

const serverApp = expressLib();

serverApp.use(expressLib.json());
console.log("Initialising backend server");

serverApp.get("/", async (req, res) => {
  const logmessage = "Received homepage request";

  await loggerFunction("backend", "info", "route", logmessage);

  res.status(200).json({
    status: "ok",
    message: "Server is running"
  });
});

serverApp.get("/error", async (req, res) => {
  const errormsg = "Received error request";

  await loggerFunction("backend", "error", "handler", errormsg);

  res.status(200).json({
    success: false,
    info: "Error route"
  });
});

serverApp.get("/debug", async (req, res) => {
  const debugmsg = "API call for debugging";

  await loggerFunction("backend", "debug", "service", debugmsg);

  res.status(200).json({
    message: "Debug data processed",
    status: "success"
  });
});

const port = 3000;

serverApp.listen(port, () => {
  console.log("server live on port:", port);
});