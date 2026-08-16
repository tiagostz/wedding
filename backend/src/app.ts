import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

export function createApp(): Application {
  const app = express();
  const allowedOrigins = process.env.CORS_ORIGIN
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(helmet());
  app.use(
    cors({
      origin:
        allowedOrigins && allowedOrigins.length > 0
          ? allowedOrigins.length === 1
            ? allowedOrigins[0]
            : allowedOrigins
          : false,
      credentials: Boolean(allowedOrigins?.length),
    })
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // Rate limit apenas nos endpoints públicos (RSVP, auth, etc.)
  const publicLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
    max: Number(process.env.RATE_LIMIT_MAX) || 60,
    standardHeaders: true,
    legacyHeaders: false,
  });
  // Usado pelo Render (e por qualquer monitor externo) para saber se o serviço está de pé,
  // sem depender do banco de dados estar populado.
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api", publicLimiter);

  app.use("/api", router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
