import { Router } from "express";
import { bannerController } from "../controllers/bannerController";

const router = Router();

// GET all banners
router.get("/", bannerController.getAll);

// POST create banner
router.post("/", bannerController.create);

export default router;
