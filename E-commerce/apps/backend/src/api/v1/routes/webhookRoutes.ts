import { Router } from "express";
import { webhookController } from "../controllers/webhookController";

const router = Router();

// POST handle Clerk webhook
router.post("/clerk", webhookController.handleClerkWebhook);

export default router;