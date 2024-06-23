import { Request } from 'express';

export interface bookingInterface extends Request {
  user?: any;
}
