import { Router } from "express";
import { rsvpController } from "../controllers/rsvp.controller";

export const rsvpRouter = Router();

// POST /api/rsvp -> confirmação de presença pública
rsvpRouter.post("/", rsvpController.create);
