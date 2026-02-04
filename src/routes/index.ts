import { Router } from "express";
import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";

const router = Router();

router.use(publicRoutes);
router.use(privateRoutes);

export default router;
