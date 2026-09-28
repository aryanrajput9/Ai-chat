import { Document, Types } from "mongoose";

export interface User {
    _id?: Types.ObjectId
    username: string;
    email: string;
    avatar?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface AuthPayload {
    id: string;
    email: string;
};

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
}
