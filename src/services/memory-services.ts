import memoryRepository from "../repository/memory-repository.js";
import ApiError from "../utils/api-error.js";
import { Types } from "mongoose";



const memoryServices = {

    createMemory: async (input: { userId: Types.ObjectId, content: string }) => {

        if (!input.userId) {
            throw new ApiError(400, "userId is required");
        }

        if (typeof input.content !== "string" || input.content.trim() === "") {
            throw new ApiError(400, "content is required");
        }


        const memory = await memoryRepository.createMemory(input);

        return memory
    },
    getAllMessageByConversation: async (userId: Types.ObjectId) => {

        if (!userId) {
            throw new ApiError(404, "userId not found")
        }

        const memories = await memoryRepository.findById(userId);

        return memories
    }
};


export default memoryServices