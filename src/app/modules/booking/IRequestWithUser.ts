// @types/express/index.d.ts
import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user?: any;
}
