import mongoose, { Schema, Document } from 'mongoose'


export interface IMessage extends Document {
    conversationId: mongoose.Types.ObjectId;
    role: "user" | "ai",
    content: string
};


const messageSchema = new Schema<IMessage>(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "assistant"],
            default: "user",
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

export const Message = mongoose.model<IMessage>(
    "Message",
    messageSchema
);