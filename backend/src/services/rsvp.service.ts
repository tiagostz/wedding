import { AppError } from "../middlewares/errorHandler";
import { CreateRsvpInput } from "../schemas/rsvp.schema";
import { rsvpRepository } from "../repositories/rsvp.repository";
import { weddingRepository } from "../repositories/wedding.repository";

export const rsvpService = {
  async create(input: CreateRsvpInput) {
    const wedding = await weddingRepository.findBySlug(input.weddingSlug);
    if (!wedding) {
      throw new AppError("Casamento não encontrado", 404);
    }

    // A constraint unique(guestId) no banco garante, a nível de dado,
    // que não existam dois RSVPs para o mesmo convidado.
    return rsvpRepository.createForWedding(wedding.id, input);
  },

  async listForWedding(weddingId: string) {
    return rsvpRepository.findAllByWedding(weddingId);
  },
};
