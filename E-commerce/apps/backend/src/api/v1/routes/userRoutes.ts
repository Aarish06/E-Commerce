import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

// GET all users
router.get("/", userController.getAll);

// GET single user
router.get("/:id", userController.getById);

// POST create user
router.post("/", userController.create);

export default router;
