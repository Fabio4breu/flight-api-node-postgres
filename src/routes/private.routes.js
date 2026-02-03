const express = require("express");
const authRequired = require("../middlewares/auth");
const sysUserController = require("../controllers/sysUser.controller");

const router = express.Router();

router.use(authRequired);

router.get("/sys-user", sysUserController.list);
router.get("/sys-user/:id", sysUserController.getById);
router.post("/sys-user", sysUserController.create);
router.put("/sys-user/:id", sysUserController.update);
router.delete("/sys-user/:id", sysUserController.remove);

module.exports = router;
