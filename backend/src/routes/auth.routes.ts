import { Router } from "express";

export const authRouter = Router();

// POST /api/auth/login -> autenticação dos noivos/admin (implementação na Fase 10)
authRouter.post("/login", (req, res) => {
  res.status(501).json({ message: "Autenticação será implementada na Fase 10." });
});
