import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import ApiError from "../utils/api-error.js";
import authRepository from "../repository/auth-repository.js";



const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const authHeader = req.header("Authorization");


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Authorization header not found");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const decode = await verifyAccessToken(token);


    if (!decode) throw new ApiError(401, "unAuthorized person");


    const user = await authRepository.findByEmail(decode.email);

    if (!user) throw new ApiError(401, "user not found");

    req.user = user;

    next()

};


export default authMiddleware