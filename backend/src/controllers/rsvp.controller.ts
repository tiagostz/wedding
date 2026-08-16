import { Request, Response, NextFunction } from "express";
import { createRsvpSchema } from "../schemas/rsvp.schema";
import { rsvpService } from "../services/rsvp.service";

export const rsvpController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createRsvpSchema.parse(req.body);
      const rsvp = await rsvpService.create(input);
      return res.status(201).json({ data: rsvp });
    } catch (err) {
      return next(err);
    }
  },
};
