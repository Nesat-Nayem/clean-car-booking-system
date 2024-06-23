import { NextFunction, Request, Response } from "express";
import { Service } from "./service.model";
import { serviceValidation } from "./service.validation";
import { appError } from "../../errors/appError";

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    try {
      const { name, description, price, duration, isDeleted } =
        serviceValidation.parse(req.body);

      const service = new Service({
        name,
        description,
        price,
        duration,
        isDeleted,
      });
      await service.save();

      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Service created successfully",
        data: service,
      });
    } catch (error: any) {
      next(error);
    }
  }
};

export const getServiceWithId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(new appError("Service not found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Service retrieved successfully",
      data: service,
    });
  } catch (error: any) {
    next(error);
  }
};
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await Service.find({ isDeleted: false });

    if (services.length === 0) {
      return next(new appError("No data found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (error: any) {
    next(error);
  }
};
export const updateWithId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateFields = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateFields,
      },
      { new: true }
    );
    if (!service) {
      return next(new appError("Service not found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error: any) {
    next(error);
  }
};
export const deleteWithId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!service) {
      return next(new appError("Service not found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Service deleted successfully",
      data: service,
    });
  } catch (error: any) {
    next(error);
  }
};
