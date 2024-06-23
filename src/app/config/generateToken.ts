// utils/generateToken.ts
import jwt from 'jsonwebtoken';
import { IUser } from '../modules/auth/auth.model';
export const generateToken = (user: IUser) => {
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '2h' });
};
