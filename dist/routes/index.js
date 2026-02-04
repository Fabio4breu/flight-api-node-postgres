"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_routes_1 = __importDefault(require("./public.routes"));
const private_routes_1 = __importDefault(require("./private.routes"));
const router = (0, express_1.Router)();
router.use(public_routes_1.default);
router.use(private_routes_1.default);
exports.default = router;
