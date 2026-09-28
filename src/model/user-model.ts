import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt'


export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    avatar: string
};


const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function () {

    this.password = bcrypt.hashSync(this.password, Number(process.env.SALT_ROUND!))
});


export const User = model<IUser>("User", userSchema);