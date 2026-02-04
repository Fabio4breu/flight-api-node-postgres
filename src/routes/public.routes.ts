import { Router } from "express";
import { login } from "../controllers/auth.controller";

import { list as listAircraft } from "../controllers/aircraft.controller";
import { list as listPassenger } from "../controllers/passenger.controller";
import { list as listFlight } from "../controllers/flight.controller";
import { list as listBoardingPass } from "../controllers/boardingPass.controller";
import { listFull } from "../controllers/join.controller";

const router = Router();

router.post("/login", login);

router.get("/aircraft", listAircraft);
router.get("/passenger", listPassenger);
router.get("/flight", listFlight);
router.get("/boarding-pass", listBoardingPass);
router.get("/boarding-pass/full", listFull);

export default router;
