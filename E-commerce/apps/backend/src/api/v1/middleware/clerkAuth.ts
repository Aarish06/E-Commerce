import { Request, Response, NextFunction } from "express";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY || "" });

export interface AuthenticatedRequest extends Request {
  userId?: string;
  auth?: any;
  params: { [key: string]: string };
}

/**
 * Middleware to verify Clerk session tokens and attach user info to request.
 * Extracts the session token from the Authorization header.
 */
export const clerkAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
      return;
    }

    const token = authHeader.substring(7);

    // Verify the session token with Clerk
    const sessionClaims = await clerk.verifyToken(token);

    if (!sessionClaims) {
      res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
      return;
    }

    // Attach user ID and auth info to request
    req.userId = sessionClaims.sub;
    req.auth = sessionClaims;

    next();
  } catch (error) {
    console.error("Clerk auth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
  }
};

/**
 * Optional auth middleware - attaches user info if token present, but doesn't require it
 */
export const optionalClerkAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No token, but that's ok for optional auth
      next();
      return;
    }

    const token = authHeader.substring(7);
    const sessionClaims = await clerk.verifyToken(token);

    if (sessionClaims) {
      req.userId = sessionClaims.sub;
      req.auth = sessionClaims;
    }

    next();
  } catch (error) {
    // Token invalid, but continue without auth for optional auth
    next();
  }
};
