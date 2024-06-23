// controllers/bookingController.ts

import { NextFunction, Request, Response } from "express";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import { bookingInterface } from "./IRequestWithUser";
import { appError } from "../../errors/appError";

export const bookService = async (req: bookingInterface, res: Response, next:NextFunction) => {
  try {
    const {
      serviceId,
      slotId,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    } = req.body;
    const slot = await Slot.findById(slotId);

    if (!slot || slot.isBooked !== "available") {
    return next(new appError("Slot is not available", 400));
    }

    const booking = new Booking({
      customer: req.user._id,
      service: serviceId,
      slot: slotId,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    });

    await booking.save();

    slot.isBooked = "booked";
    await slot.save();

    // Populate the referenced documents data

    const populatedBooking = await Booking.findById(booking._id)
      .populate("customer", "name email phone address")
      .populate("service", "name description price duration isDeleted")
      .populate("slot", "service date startTime endTime isBooked");



    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Booking successful",
      data: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email phone address")
      .populate("service")
      .populate("slot");

    if (bookings.length === 0) {
      return next(new appError("No data found", 404))
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req: bookingInterface, res: Response, next:NextFunction) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate("service")
      .populate("slot")
      .select(
        "-customer"
        );

    if (bookings.length === 0) {
      return next(new appError("No data found", 404));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
