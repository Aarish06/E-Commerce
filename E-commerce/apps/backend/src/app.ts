import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import webhookRoutes from "./api/v1/routes/webhookRoutes";
import productRoutes from "./api/v1/routes/productRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import bannerRoutes from "./api/v1/routes/bannerRoutes";
import { webhookController } from "./api/v1/controllers/webhookController";
// Load environment variables
dotenv.config();

// Initialize Express application
const app: Express = express();

// Enable CORS for all routes
app.use(cors());
app.post("/api/v1/webhooks/clerk", express.raw({ type: "application/json" }), webhookController.handleClerkWebhook);
app.use("/api/v1/webhooks", webhookRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/banners", bannerRoutes);
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});


export default app;