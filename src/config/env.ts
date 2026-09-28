import dotenv from 'dotenv';
import type { envtypes } from '../types/env-type.js';

dotenv.config();

const required = (name: string, fallback?: string) => {
    const value = process.env[name] ?? fallback;

    if (!value) throw new Error("env variable is missing")

    return value
};

const env: envtypes = {
    port: Number(required("PORT", "5050")),
    mongoUri: required("MONGO_URI"),
    accessToken: required("ACCESSTOKEN"),
    refreshToken: required("REFRESHTOKEN"),
    nodeEnv: required("NODE_ENV"),
    aiKey: required("XKIRO_API_KEY")
};


export default env