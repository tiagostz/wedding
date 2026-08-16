import { Router } from "express";
import { weddingRouter } from "./wedding.routes";
import { authRouter } from "./auth.routes";
import { rsvpRouter } from "./rsvp.routes";
import { photoRouter } from "./photo.routes";
import { giftRouter } from "./gift.routes";
import { adminRouter } from "./admin.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/wedding", weddingRouter);
router.use("/rsvp", rsvpRouter);
router.use("/photos", photoRouter);
router.use("/gifts", giftRouter);
router.use("/admin", adminRouter);
