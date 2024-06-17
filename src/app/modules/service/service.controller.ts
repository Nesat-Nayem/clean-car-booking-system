import { Request, Response } from "express";
import { Service } from "./service.model";
import { serviceValidation } from "./service.validation";


export const createService = async (req: Request, res: Response) => {
    {
        try {
          const { name, description, price, duration, isDeleted } = serviceValidation.parse(req.body);
      
          const service = new Service({ name, description, price, duration, isDeleted });
          await service.save();
      
          res.status(201).json({
            success: true,
            statusCode: 200,
            message: 'Service created successfully',
            data: service,
          });
        } catch (error:any) {
          res.status(400).json({ success: false,    statusCode: 400, message: error.message });
        }
      }
}


export const getServiceWithId = async (req: Request, res: Response) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found' });
        }
    
        res.json({
          success: true,
          message: 'Service retrieved successfully',
          data: service,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find({ isDeleted: false });
        if (services.length === 0) {
          return res.status(404).json({ success: false, message: 'No data found' });
        }
    
        res.json({
          success: true,
          message: 'Services retrieved successfully',
          data: services,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}
export const updateWithId = async (req: Request, res: Response) => {
    try {
        const { price } = serviceValidation.parse(req.body);
    
        const service = await Service.findByIdAndUpdate(
          req.params.id,
          { price },
          { new: true }
        );
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found' });
        }
    
        res.json({
          success: true,
          message: 'Service updated successfully',
          data: service,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}
export const deleteWithId = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByIdAndUpdate(
          req.params.id,
          { isDeleted: true },
          { new: true }
        );
        if (!service) {
          return res.status(404).json({ success: false, message: 'Service not found' });
        }
    
        res.json({
          success: true,
          message: 'Service deleted successfully',
          data: service,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}
