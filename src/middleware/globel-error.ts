import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error.js";


const globalError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {

    let statusCode = err instanceof ApiError ? err.statusCode : 500;
    let message = err instanceof Error ? err.message : "Internal Server Error"


    res.status(statusCode).json({
        message: message
    });

};

export default globalError