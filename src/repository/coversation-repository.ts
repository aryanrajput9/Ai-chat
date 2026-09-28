import { ConversationModel } from "../model/conversation-model.js";
import { Message } from "../model/message-model.js";


const ConversationRepository = {

    // Create conversation
    createConversation: async (input: object) => {

        const conversation =
            await ConversationModel.create(input);

        return conversation;
    },


    // Find conversation by ID
    findById: async (id: string) => {

        return await ConversationModel.findById(id);
    },


    // Find conversation by ID + user
    findConversationByIdAndUser: async (
        id: string,
        user: string
    ) => {

        return await ConversationModel.findOne({
            _id: id,
            user: user,
        });
    },


    // Create message
    createMessage: async (input: object) => {

        return await Message.create(input);
    },


    // Get all conversations
    getConversations: async () => {

        return await ConversationModel.find()
            .sort({ createdAt: -1 });
    },


    // Get messages of conversation
    getMessagesByConversation: async (
        conversationId: string
    ) => {

        return await Message.find({
            conversationId,
        }).sort({ createdAt: 1 });
    },
};

export default ConversationRepository;
