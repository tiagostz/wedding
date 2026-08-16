import { prisma } from "../config/prisma";
import { CreateRsvpInput } from "../schemas/rsvp.schema";

export const rsvpRepository = {
  async createForWedding(weddingId: string, input: CreateRsvpInput) {
    // Reaproveita o convidado pelo e-mail ou telefone dentro do mesmo casamento.
    // Assim, um novo envio atualiza o RSVP existente em vez de criar outro registro.
    const existingGuest = input.email
      ? await prisma.guest.findFirst({ where: { weddingId, email: input.email } })
      : input.phone
        ? await prisma.guest.findFirst({ where: { weddingId, phone: input.phone } })
        : null;

    const guest = existingGuest
      ? await prisma.guest.update({
          where: { id: existingGuest.id },
          data: {
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
          },
        })
      : await prisma.guest.create({
          data: {
            weddingId,
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
          },
        });

    return prisma.rsvp.upsert({
      where: { guestId: guest.id },
      update: {
        status: input.status,
        companionsQty: input.companionsQty,
        companionNames: input.companionNames,
        notes: input.notes,
      },
      create: {
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
