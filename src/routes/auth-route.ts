import { Router } from 'express';
import authController from '../controller/auth-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';


const authRouter = Router();


authRouter.post("/create-user", authController.register);
authRouter.post("/login-user", authController.login);
authRouter.post("/logout-user", authController.logout);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.get("/get-me", authMiddleware, authController.getMe)



export default authRouter