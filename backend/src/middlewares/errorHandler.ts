import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "ValidationError",
      issues: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}
