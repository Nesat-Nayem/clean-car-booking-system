import express from "express";
import { bookService, getAllBookings, getUserBookings } from "./booking.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { userMiddleware } from "../../middlewares/userMiddleware";
import { adminMiddleware } from "../../middlewares/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, userMiddleware, bookService);
router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.get("/my-bookings", authMiddleware,userMiddleware, getUserBookings);

export const bookingRouter = router;
