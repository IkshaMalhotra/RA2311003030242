const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("notification service running");
});

app.listen(4000, () => {
    console.log("notification app running");
});