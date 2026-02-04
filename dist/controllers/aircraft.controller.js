"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
const db_1 = __importDefault(require("../config/db"));
async function list(req, res) {
    try {
        const r = await db_1.default.query("SELECT * FROM aircraft ORDER BY aircraft_id LIMIT 200");
        return res.json(r.rows);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao consultar aircraft", details: err.message });
    }
}
