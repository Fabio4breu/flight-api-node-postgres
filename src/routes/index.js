const express = require("express");
const publicRoutes = require("./public.routes");
const privateRoutes = require("./private.routes");

const router = express.Router();

router.use(publicRoutes);
router.use(privateRoutes);

module.exports = router;
