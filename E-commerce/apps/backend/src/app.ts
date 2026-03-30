import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express application
const app: Express = express();

// Enable CORS for all routes
app.use(cors());

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