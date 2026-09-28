import jwt, { type JwtPayload } from 'jsonwebtoken';
import env from '../config/env.js';
import type { AuthPayload } from '../types/auth-type.js';


export const generateAccessToken = async (payload: AuthPayload) => {

    return jwt.sign(payload, env.accessToken!, {
        expiresIn: "15m"
    })
};

export const generateRefreshToken = async (payload: AuthPayload) => {

    return jwt.sign(payload, env.refreshToken!)
};

export const verifyAccessToken = async (token: string): Promise<AuthPayload> => {

    return jwt.verify(token, env.accessToken) as AuthPayload
};

export const verifyRefreshToken = async (token: string): Promise<AuthPayload> => {

    return jwt.verify(token, env.refreshToken) as AuthPayload
}