require('dotenv').config();
const express = require("express");
const fetchGivenData = require("./api");
const scheduleTasks = require("./vehiclescheduler");
const Log = require("../logging_middleware/logger");

const app = express();
const token = process.env.TOKEN;

const safeLog = async (...args) => {
  try {
    await Log(...args);
  } catch (e) {
  }
};

app.get("/vehicleschedule", async (req, res) => {
  try {
    await safeLog("backend", "info", "route", "vehicleschedule hit");

    const depotData = await fetchGivenData("depots", token);
    const vehicleData = await fetchGivenData("vehicles", token);

    const depots = depotData.depots;
    const vehicles = vehicleData.vehicles;

    let ans = [];

    for (let d of depots) {
      await safeLog("backend", "debug", "service", "processing depot " + d.ID);

      const result = scheduleTasks([...vehicles], d.MechanicHours);

      ans.push({
        depotID: d.ID,
        ...result
      });
    }

    await safeLog("backend", "info", "handler", "schedule done");

    res.json(ans);

  } catch (e) {
    await safeLog("backend", "error", "handler", "schedule error");
    res.status(500).send("error");
  }
});

app.listen(3000);