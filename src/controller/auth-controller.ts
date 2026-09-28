import type { CookieOptions, Request, Response } from "express";
import asyncHandler from "../utils/async-handler.js";
import authServices from "../services/auth-service.js";
import ApiResponse from "../utils/api-response.js";
import type { User } from "../types/auth-type.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import ApiError from "../utils/api-error.js";



const sanitizer = (user: User, accessToken?: string) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        accessToken: accessToken
    }
};

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// const accessCookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
// };

const authController = {

    register: asyncHandler(async (req: Request, res: Response): Promise<Response> => {

        const { username, email, password, avatar } = req.body;

        const { user, refreshToken } = await authServices.register({ username, email, password, avatar });

        res.cookie("refreshToken", refreshToken, cookieOptions)

        return res.status(201).json(
            new ApiResponse(
                201,
                "user create successfully",
                sanitizer(user)
            )
        )

    }),
    login: asyncHandler(async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        const { user, refreshToken, accessToken } = await authServices.login(email, password);


        res.cookie("refreshToken", refreshToken, cookieOptions)


        return res.status(200).json(
            new ApiResponse(
                200,
                "user login successfull",
                sanitizer(user, accessToken)
            )

        )

    }),
    logout: asyncHandler(async (_req: Request, res: Response): Promise<Response> => {

        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json(
            new ApiResponse(
                200,
                "logout successFull",
            )
        )

    }),
    refreshToken: asyncHandler(async (req: Request, res: Response): Promise<Response> => {

        const token = req.cookies.refreshToken;
        const decode = await verifyRefreshToken(token);

        if (!decode) throw new ApiError(401, "unAuthorized person");

        const newAccesstoken = await generateAccessToken({ id: decode.id, email: decode.email });

        return res.status(201).json(
            new ApiResponse(
                201,
                "accessToken create SuccessFull",
                { accessToken: newAccesstoken }
            )
        )

    }),
    getMe: asyncHandler(async (req: Request, res: Response) => {

        const user = req.user;


        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "Get current user",
                sanitizer(user)
            )
        );

    })
};



export default authController