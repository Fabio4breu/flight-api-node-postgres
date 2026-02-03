const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

// rota básica
app.get("/", (req, res) => {
  res.json({ status: "API demo-flight online 🚀" });
});

module.exports = app;
