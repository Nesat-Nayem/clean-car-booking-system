// @types/express/index.d.ts
import { Request } from 'express';

export interface userInterface extends Request {
  user?: any;
}
