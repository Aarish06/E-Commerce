import { Request, Response, NextFunction } from "express";
import { bannerService } from "../services/bannerService";

export const bannerController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await bannerService.getAll();
      res.json({ success: true, data: banners });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const banner = await bannerService.create(req.body);
      res.status(201).json({ success: true, data: banner });
    } catch (error) {
      next(error);
    }
  }
};
