import { Request, Response } from "express";
import { User } from "./auth.model";
import { authValidation, loginValidation } from "./auth.validation";
import { generateToken } from "../../config/generateToken";


export const singUpController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, role, address } = authValidation.parse(req.body);
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'User already exists' });
        }
    
        const user = new User({ name, email, password, phone, role, address });
        await user.save();
    
        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          data: user,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}


export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginValidation.parse(req.body);
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    
        const token = generateToken(user);
    
        res.json({
          success: true,
          message: 'User logged in successfully',
          token,
          data: user,
        });
      } catch (error:any) {
        res.status(400).json({ success: false, message: error.message });
      }
}
