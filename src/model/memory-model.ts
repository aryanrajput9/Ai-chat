import mongoose, { Document, Types, Schema } from "mongoose";

export interface IMemory extends Document {
    _id: Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
}

const memorySchema = new Schema<IMemory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const MemoryModel = mongoose.model<IMemory>("Memory", memorySchema);