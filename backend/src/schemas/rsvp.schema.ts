import { z } from "zod";

export const createRsvpSchema = z.object({
  weddingSlug: z.string().min(1),
  fullName: z.string().min(3, "Informe o nome completo"),
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().min(8, "Telefone inválido").optional(),
  status: z.enum(["CONFIRMED", "DECLINED"]),
  companionsQty: z.number().int().min(0).max(20).default(0),
  companionNames: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;
