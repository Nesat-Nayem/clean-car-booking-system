import { NextFunction, Request, Response } from "express";
import { slotValidation } from "./slot.validation";
import { Slot } from "./slot.model";
import { appError } from "../../errors/appError";

export const createSlot = async(req:Request,res:Response, next:NextFunction) => {
    try {
        const { service, date, startTime, endTime } = slotValidation.parse(req.body);
    
        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);
    
        const slots = [];
        let currentTime = startDateTime;
    
        while (currentTime < endDateTime) {
          const slot = new Slot({
            service,
            date,
            startTime: currentTime.toISOString(),
            endTime: new Date(currentTime.getTime() + 60 * 60000).toISOString(),
          });
          slots.push(slot);
          currentTime = new Date(currentTime.getTime() + 60 * 60000);
        }
    
        await Slot.insertMany(slots);
    
        res.status(201).json({
          success: true,
          statusCode: 200,
          message: 'Slots created successfully',
          data: slots,
        });
      } catch (error:any) {
        next(error);
      }
}
export const getAllSlots = async(req:Request,res:Response, next:NextFunction) => {
    try {
        const { date, serviceId } = req.query;
    
        const query: any = { isBooked: 'available' };
        if (date) {
          query.date = new Date(date as string);
        }
        if (serviceId) {
          query.service = serviceId;
        }
    
        const slots = await Slot.find(query).populate('service');
        if (slots.length === 0) {
          return next(new appError('No data found', 404));
        }
    
        res.json({
          success: true,
          statusCode: 200,
          message: 'Available slots retrieved successfully',
          data: slots,
        });
      } catch (error:any) {
        next(error);
      }
}