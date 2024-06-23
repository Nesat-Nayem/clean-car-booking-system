import express from "express";
import { loginController, singUpController } from "./auth.controller";
const router = express.Router();
router.post("/signup", singUpController);
router.post("/login", loginController);

export const authRouter = router;
