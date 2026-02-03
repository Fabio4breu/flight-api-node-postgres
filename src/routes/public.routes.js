const express = require("express");
const authController = require("../controllers/auth.controller");

const aircraftController = require("../controllers/aircraft.controller");
const passengerController = require("../controllers/passenger.controller");
const flightController = require("../controllers/flight.controller");
const boardingPassController = require("../controllers/boardingPass.controller");
const joinController = require("../controllers/join.controller");

const router = express.Router();

// login (público)
router.post("/login", authController.login);

// consultas públicas
router.get("/aircraft", aircraftController.list);
router.get("/passenger", passengerController.list);
router.get("/flight", flightController.list);
router.get("/boarding-pass", boardingPassController.list);

// JOIN público para teste de carga
router.get("/boarding-pass/full", joinController.listFull);

module.exports = router;
