import { Router } from 'express'
import ConversationController from '../controller/coversation-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';


const messageRoute = Router()



messageRoute.get(
    "/allMessage/:conversationId",
    ConversationController.getAllMessageByConversation
);


export default messageRoute