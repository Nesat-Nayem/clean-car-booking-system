// controllers/bookingController.ts

import { Request, Response } from 'express';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';
import { bookingInterface } from './IRequestWithUser';

export const bookService = async (req: bookingInterface, res: Response) => {
  try {
    const { serviceId, slotId, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate } = req.body;
    const slot = await Slot.findById(slotId);

    if (!slot || slot.isBooked !== 'available') {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Slot is not available',
      });
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

    slot.isBooked = 'booked';
    await slot.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Booking successful',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email phone address')
      .populate('service')
      .populate('slot');

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No data found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const getUserBookings = async (req: bookingInterface, res: Response) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('service')
      .populate('slot');

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No data found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};
