import { User } from "../model/user-model.js";



const authRepository = {

    register: async (input: object) => {

        const user = await User.create(input);
        return user
    },
    findByEmail: async (email: string) => {

        const user = await User.findOne({ email });
        return user
    },

};

export default authRepository