import { Router } from 'express'
import authRouter from './auth-route.js';
import conversationRoute from './coversation-route.js';
import messageRoute from './message-route.js';


const routes = Router();

routes.use("/auth", authRouter);

routes.use("/conversation", conversationRoute);

routes.use("/message", messageRoute)

export default routes