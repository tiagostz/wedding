import { Router } from "express";

export const photoRouter = Router();

// GET /api/photos/:weddingSlug -> galeria pública (implementação na Fase 7)
photoRouter.get("/:weddingSlug", (req, res) => {
  res.json({ data: [], message: "Endpoint reservado — implementação na Fase 7 (Galeria)." });
});
