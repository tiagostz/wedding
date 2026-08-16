import { prisma } from "../config/prisma";
import { CreateRsvpInput } from "../schemas/rsvp.schema";

export const rsvpRepository = {
  async createForWedding(weddingId: string, input: CreateRsvpInput) {
    // Cria (ou reaproveita) o convidado pelo e-mail dentro do mesmo casamento,
    // e impede duplicidade de RSVP para o mesmo convidado (constraint unique em guestId).
    const guest = await prisma.guest.create({
      data: {
        weddingId,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
      },
    });

    return prisma.rsvp.create({
      data: {
        weddingId,
        guestId: guest.id,
        status: input.status,
        companionsQty: input.companionsQty,
        companionNames: input.companionNames,
        notes: input.notes,
      },
    });
  },

  findAllByWedding(weddingId: string) {
    return prisma.rsvp.findMany({
      where: { weddingId },
      include: { guest: true },
      orderBy: { createdAt: "desc" },
    });
  },
};
