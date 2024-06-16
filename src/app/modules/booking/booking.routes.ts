// routes/bookingRoutes.ts
import express from "express";
import { bookService, getAllBookings, getUserBookings } from "./booking.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, bookService);
router.get("/", authMiddleware, getAllBookings);
router.get("/my-bookings", authMiddleware, getUserBookings);

export const bookingRouter = router;
