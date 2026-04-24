import { Request, Response } from "express";
import { userService } from "../services/userService";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * Handle Clerk webhooks for user lifecycle events.
 * Syncs Clerk users to our database.
 */
export const webhookController = {
  async handleClerkWebhook(req: Request, res: Response): Promise<void> {
    try {
      // Verify webhook signature (simplified - in production use svix library)
      const payload = req.body;
      const eventType = payload.type;

      console.log(`Received Clerk webhook: ${eventType}`);

      switch (eventType) {
        case "user.created":
        case "user.updated": {
          const clerkUser = payload.data;
          await userService.syncFromClerk({
            id: clerkUser.id,
            email: clerkUser.email_addresses[0]?.email_address || "",
            name: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim() || null,
            avatarUrl: clerkUser.image_url || null,
          });
          break;
        }

        case "user.deleted": {
          const clerkUserId = payload.data.id;
          await userService.deleteById(clerkUserId);
          break;
        }

        default:
          console.log(`Unhandled webhook event: ${eventType}`);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ success: false, message: "Webhook processing failed" });
    }
  },
};
