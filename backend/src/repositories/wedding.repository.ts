import { prisma } from "../config/prisma";

export const weddingRepository = {
  findBySlug(slug: string) {
    return prisma.wedding.findUnique({
      where: { slug },
      include: { events: true, photos: true, gifts: true, faqs: true },
    });
  },

  findById(id: string) {
    return prisma.wedding.findUnique({ where: { id } });
  },
};
