import { Router } from "express";

export const giftRouter = Router();

// GET /api/gifts/:weddingSlug -> lista de presentes (implementação na Fase 8)
giftRouter.get("/:weddingSlug", (req, res) => {
  res.json({ data: [], message: "Endpoint reservado — implementação na Fase 8 (Presentes)." });
});
