import ConversationRepository from "../repository/coversation-repository.js";
import ApiError from "../utils/api-error.js";


const conversationServices = {

    // New conversation + first user message
    createConversation: async (input: {
        title: string;
        user: string;
        content: string;
    }) => {

        if (!input.title?.trim()) {
            throw new ApiError(400, "Title is required");
        }

        if (!input.user) {
            throw new ApiError(401, "User is required");
        }

        if (!input.content?.trim()) {
            throw new ApiError(400, "Content is required");
        }

        // Conversation create
        const conversation =
            await ConversationRepository.createConversation({
                title: input.title,
                user: input.user,
            });

        // First user message create
        const message =
            await ConversationRepository.createMessage({
                conversationId: conversation._id.toString(),
                role: "user",
                content: input.content,
            });

        return {
            conversation,
            message,
        };
    },


    // Normal message create
    createMessage: async (input: {
        conversationId: string;
        role: string;
        content: string;
    }) => {

        if (!input.conversationId) {
            throw new ApiError(400, "Conversation ID is required");
        }

        if (!input.role) {
            throw new ApiError(400, "Role is required");
        }

        if (!input.content?.trim()) {
            throw new ApiError(400, "Content is required");
        }

        return await ConversationRepository.createMessage(input);
    },


    getConversation: async (id: string) => {

        if (!id) {
            throw new ApiError(400, "ID not found");
        }

        const conversation =
            await ConversationRepository.findById(id);

        if (!conversation) {
            throw new ApiError(404, "Conversation not found");
        }

        return conversation;
    },


    getConversations: async () => {

        return await ConversationRepository.getConversations();
    },


    getMessagesByConversation: async (conversationId: string) => {

        if (!conversationId) {
            throw new ApiError(400, "Conversation ID is required");
        }

        return await ConversationRepository.getMessagesByConversation(
            conversationId
        );
    },
};

export default conversationServices;
