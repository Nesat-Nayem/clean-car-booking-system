import { Request, Response } from "express";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import { bookingValidation } from "./booking.validation";
import { bookingInterface } from "./booking.interface";

export const createBooking = async (req: bookingInterface, res: Response) => {
    try {
        const {
          serviceId,
          slotId,
          vehicleType,
          vehicleBrand,
          vehicleModel,
          manufacturingYear,
          registrationPlate,
        } = bookingValidation.parse(req.body);
    
        const slot = await Slot.findById(slotId);
        if (!slot || slot.isBooked !== "available") {
          return res
            .status(400)
            .json({ success: false, message: "Slot is not available" });
        }
    
        const booking = new Booking({
          customer: req.user?._id,
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
    
        res
          .status(201)
          .json({
            success: true,
            statusCode: 201,
            message: "Booking successful",
            data: booking,
          });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }

}