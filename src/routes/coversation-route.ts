import { Router } from "express";
import ConversationController from "../controller/coversation-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const conversationRoute = Router();

conversationRoute.post(
    "/", authMiddleware,
    ConversationController.chat
);

conversationRoute.get(
    "/",
    ConversationController.getConversations
);

conversationRoute.get(
    "/:id",
    ConversationController.getConvesatioin
);

export default conversationRoute;