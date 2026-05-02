const express = require("express");
const fetchGivenData = require("./api");
const scheduleTasks = require("./vehiclescheduler");
const Log = require("../logging_middleware/logger");

const app = express();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpbTE3MzdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDE0OSwiaWF0IjoxNzc3NzAzMjQ5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWIyNGE3ZTQtMWMzYS00YmYwLWI3YzMtMDE4ZGZmMDQzMTI0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaWtzaGEgbWFsaG90cmEiLCJzdWIiOiI0NWZjYzNhMi0yZDhjLTQzYWYtYjEzNS0wNjhlNjhmNDNiODYifSwiZW1haWwiOiJpbTE3MzdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJpa3NoYSBtYWxob3RyYSIsInJvbGxObyI6InJhMjMxMTAwMzAzMDI0MiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjQ1ZmNjM2EyLTJkOGMtNDNhZi1iMTM1LTA2OGU2OGY0M2I4NiIsImNsaWVudFNlY3JldCI6IkpHeVBLVmhzRkRZc1dKY2sifQ.acQo_wcX4eeUC-r0_zt9NUFViUNgF_OJyNBfsDY5G5w";

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

app.listen(3000, () => {
  console.log("server running on 3000");
});