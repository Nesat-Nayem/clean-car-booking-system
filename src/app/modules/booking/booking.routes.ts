// routes/bookingRoutes.ts
import express from "express";
import { createBooking } from "./booking.controller";

const router = express.Router();

router.post("/", createBooking);

export const bookingRouter = router;
