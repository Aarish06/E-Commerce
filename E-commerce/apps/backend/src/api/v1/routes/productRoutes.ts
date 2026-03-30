import { Router } from "express";
import { productController } from "../controllers/productController";

const router = Router();

// GET all products
router.get("/", productController.getAll);

// GET single product
router.get("/:id", productController.getById);

// POST create product
router.post("/", productController.create);

// PUT update product
router.put("/:id", productController.update);

// DELETE product
router.delete("/:id", productController.delete);

// POST rate product (like/dislike)
router.post("/:id/rate", productController.rate);

export default router;
