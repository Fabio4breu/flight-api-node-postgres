import { Router } from "express";
import authRequired from "../middlewares/auth";
import {
  list,
  getById,
  create,
  update,
  remove
} from "../controllers/sysUser.controller";

const router = Router();

router.use(authRequired);

router.get("/sys-user", list);
router.get("/sys-user/:id", getById);
router.post("/sys-user", create);
router.put("/sys-user/:id", update);
router.delete("/sys-user/:id", remove);

export default router;
