import { MemoryModel, type IMemory } from "../model/memory-model.js";
import { Types } from "mongoose";

const memoryRepository = {
    createMemory: async (input: object) => {

        console.log("MEMORY INPUT:", input);
        const memory = await MemoryModel.create(input);
        return memory
    },
    findById: async (userId: Types.ObjectId): Promise<IMemory[]> => {

        return await MemoryModel.find({ userId });

    }
};

export default memoryRepository