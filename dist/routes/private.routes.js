"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const sysUser_controller_1 = require("../controllers/sysUser.controller");
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.get("/sys-user", sysUser_controller_1.list);
router.get("/sys-user/:id", sysUser_controller_1.getById);
router.post("/sys-user", sysUser_controller_1.create);
router.put("/sys-user/:id", sysUser_controller_1.update);
router.delete("/sys-user/:id", sysUser_controller_1.remove);
exports.default = router;
