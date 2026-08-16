import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { rsvpService } from "../services/rsvp.service";

export const adminRouter = Router();

// GET /api/admin/rsvps/:weddingId -> lista confirmações (protegido)
adminRouter.get("/rsvps/:weddingId", requireAuth, async (req, res, next) => {
  try {
    const data = await rsvpService.listForWedding(req.params.weddingId);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/photos -> upload de fotos (implementação na Fase 9)
adminRouter.post("/photos", requireAuth, (req, res) => {
  res.status(501).json({ message: "Upload de fotos será implementado na Fase 9." });
});

// POST /api/admin/gifts -> cadastro de presentes (implementação na Fase 9)
adminRouter.post("/gifts", requireAuth, (req, res) => {
  res.status(501).json({ message: "Cadastro de presentes será implementado na Fase 9." });
});
