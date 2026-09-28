import authRepository from "../repository/auth-repository.js";
import ApiError from "../utils/api-error.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { comaparepassword } from "../utils/verification.js";



const authServices = {

    register: async (input: { username: string, email: string, password: string, avatar: string }) => {

        if (!input.username) {
            throw new ApiError(404, "username is required")
        };
        if (!input.email) {
            throw new ApiError(404, "email is required")
        };
        if (!input.password) {
            throw new ApiError(404, "password is required")
        };
        if (!input.avatar) {
            throw new ApiError(404, "avatar is required")
        };
        const isExist = await authRepository.findByEmail(input.email);

        if (isExist) {
            throw new ApiError(400, "user already exist")
        }

        const user = await authRepository.register(input);


        const refreshToken = await generateRefreshToken({ id: user._id.toString(), email: user.email })

        return { user, refreshToken }

    },
    login: async (email: string, password: string) => {

        if (!email) {
            throw new ApiError(404, "email not found")
        };

        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(404, "passoword not found")
        }

        const comparepass = comaparepassword(password, user.password);

        if (!comparepass) {
            throw new ApiError(401, "wrong passowrd")
        }


        const refreshToken = await generateRefreshToken({ id: user._id.toString(), email: user.email })

        const accessToken = await generateAccessToken({ id: user._id.toString(), email: user.email })

        return { user, refreshToken, accessToken }
    }
};

export default authServices