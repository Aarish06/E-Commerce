import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";

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
}
};
