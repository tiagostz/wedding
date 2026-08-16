import { Router } from "express";
import { weddingController } from "../controllers/wedding.controller";

export const weddingRouter = Router();

// GET /api/wedding/:slug -> dados públicos da página de casamento
weddingRouter.get("/:slug", weddingController.getBySlug);
