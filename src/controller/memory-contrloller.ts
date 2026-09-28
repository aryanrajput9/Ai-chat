import type { Request, Response } from "express";
import asyncHandler from "../utils/async-handler.js";
import memoryServices from "../services/memory-services.js";
import ApiResponse from "../utils/api-response.js";



const memoryController = {

    createMemory: asyncHandler(async (req: Request, res: Response): Promise<Response> => {

        const { userId, content } = req.body;

        const memory = await memoryServices.createMemory({ userId, content });

        return res.status(201).json(
            new ApiResponse(
                201,
                "memory create",
                memory
            )
        )
    })
};


export default memoryController