import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new AppError("Token não informado", 401));
  }

  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
    req.userId = payload.sub;
    return next();
  } catch {
    return next(new AppError("Token inválido ou expirado", 401));
  }
}
