import { Router } from "express";
import { userController } from "../controllers/userController";
import { clerkAuthMiddleware } from "../middleware/clerkAuth";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.get("/me/profile", clerkAuthMiddleware, userController.getAll);

router.put("/me/profile", clerkAuthMiddleware, userController.updateProfile);

router.delete("/:id", clerkAuthMiddleware, userController.deleteById);

export default router;
