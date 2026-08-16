import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import { weddingRepository } from "../repositories/wedding.repository";

export const weddingController = {
  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const wedding = await weddingRepository.findBySlug(slug);

      if (!wedding || !wedding.isPublished) {
        throw new AppError("Casamento não encontrado", 404);
      }

      return res.json({ data: wedding });
    } catch (err) {
      return next(err);
    }
  },
};
