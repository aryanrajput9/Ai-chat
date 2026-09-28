import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import ConversationRepository from "../repository/coversation-repository.js";
import conversationServices from "../services/conversation-services.js";
import memoryServices from "../services/memory-services.js";
import { aiServices } from "../services/ai-services.js";
import ApiResponse from "../utils/api-response.js";




const ConversationController = {

    chat: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {

            let {
                content,
                conversationId,
                title,
            } = req.body;

            const userId = req.user?._id;

            if (!userId) {
                throw new ApiError(401, "Unauthorized");
            }

            if (!content?.trim()) {
                throw new ApiError(400, "Message is required");
            }


            // =====================================
            // 1. CHECK / CREATE CONVERSATION
            // =====================================

            if (!conversationId) {

                // New conversation
                const result =
                    await conversationServices.createConversation({
                        title: title || content,
                        user: userId.toString(),
                        content: content,
                    });

                conversationId =
                    result.conversation._id.toString();

            } else {

                // Existing conversation
                const conversation =
                    await ConversationRepository
                        .findConversationByIdAndUser(
                            conversationId,
                            userId.toString()
                        );

                if (!conversation) {
                    throw new ApiError(
                        404,
                        "Conversation not found"
                    );
                }
            }


            // =====================================
            // 2. EXISTING CHAT ME USER MESSAGE
            // =====================================

            if (req.body.conversationId) {

                await conversationServices.createMessage({
                    conversationId,
                    role: "user",
                    content: content,
                });
            }


            // =====================================
            // 3. GET CONVERSATION MESSAGES
            // =====================================

            const messages =
                await conversationServices
                    .getMessagesByConversation(
                        conversationId
                    );


            // =====================================
            // 4. MEMORY
            // =====================================

            const memories =
                await memoryServices.getAllMessageByConversation(
                    userId
                );

            const memoryContext =
                memories
                    .map(memory => memory.content)
                    .join("\n");


            // =====================================
            // 5. SSE HEADERS
            // =====================================

            res.setHeader(
                "Content-Type",
                "text/event-stream"
            );

            res.setHeader(
                "Cache-Control",
                "no-cache"
            );

            res.setHeader(
                "Connection",
                "keep-alive"
            );

            res.setHeader(
                "X-Conversation-Id",
                conversationId
            );


            // =====================================
            // 6. AI STREAM
            // =====================================

            const stream =
                await aiServices(
                    content,
                    memoryContext
                );

            let fullResponse = "";


            for await (const chunk of stream) {

                const text = chunk.content;

                if (typeof text !== "string") {
                    continue;
                }

                fullResponse += text;


                // Live AI response
                res.write(
                    `data: ${JSON.stringify({
                        type: "token",
                        content: text,
                    })}\n\n`
                );
            }


            // =====================================
            // 7. SAVE AI MESSAGE
            // =====================================

            const assistantMessage =
                await conversationServices.createMessage({
                    conversationId,
                    role: "assistant",
                    content: fullResponse,
                });


            // =====================================
            // 8. DONE
            // =====================================

            res.write(
                `data: ${JSON.stringify({
                    type: "done",
                    conversationId,
                    assistantMessage,
                })}\n\n`
            );

            res.end();
        }
    ),


    // =====================================
    // GET SINGLE CONVERSATION
    // =====================================

    getConvesatioin: asyncHandler(
        async (
            req: Request,
            res: Response
        ): Promise<Response> => {

            const { id } = req.params;


            if (typeof id !== "string") {
                return res.status(400).json(
                    new ApiResponse(
                        400,
                        "Invalid conversation ID"
                    )
                );
            }

            const conversation =
                await conversationServices
                    .getConversation(id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "Conversation fetched successfully",
                    conversation
                )
            );
        }
    ),


    // =====================================
    // GET ALL MESSAGES
    // =====================================

    getAllMessageByConversation: asyncHandler(
        async (
            req: Request,
            res: Response
        ): Promise<Response> => {

            const { conversationId } = req.params;

            console.log(conversationId)

            if (!conversationId) {
                throw new ApiError(
                    400,
                    "Conversation ID is required"
                );
            }
            if (typeof conversationId !== "string") {
                throw new ApiError(400, "Invalid conversation ID");
            }
            const messages =
                await conversationServices
                    .getMessagesByConversation(
                        conversationId
                    );

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "All messages fetched successfully",
                    messages
                )
            );
        }
    ),


    // =====================================
    // GET ALL CONVERSATIONS
    // =====================================

    getConversations: asyncHandler(
        async (
            req: Request,
            res: Response
        ): Promise<Response> => {

            const conversations =
                await conversationServices
                    .getConversations();

            return res.status(200).json(
                new ApiResponse(
                    200,
                    "All conversations fetched successfully",
                    conversations
                )
            );
        }
    ),
};

export default ConversationController;
