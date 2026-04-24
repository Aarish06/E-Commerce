import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { AuthenticatedRequest } from "../middleware/clerkAuth";

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;  
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
},

  async create(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, ...userData } = req.body;
    const user = await userService.create({ id, ...userData });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
},
async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId; 
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
 
      const { name, phone, address, avatarUrl } = req.body;
      const updateData: any = {};
      
      if (name !== undefined) updateData.name = name;
      if (phone !== undefined) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
 
      const updatedUser = await userService.updateProfile(userId, updateData);
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      console.error("Update profile error:", error);
      if (error instanceof Error) {
        if (error.message.includes("Record to update not found")) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
      }
      next(error);
    }
  },
 
  async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
 
      const user = await userService.getById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
 
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },
  async deleteById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await userService.deleteById(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}
};

