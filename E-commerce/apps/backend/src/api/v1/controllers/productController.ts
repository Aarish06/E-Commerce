import { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";

export const productController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAll();
      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const product = await productService.getById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const product = await productService.update(id, req.body);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await productService.delete(id);
      res.json({ success: true, message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  },

  async rate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const { isLike, userId } = req.body;
      const result = await productService.rate(id, isLike, userId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
};
