import axioseInstance from "../../../api/axios";





const authServices = {

    register: async (data) => {

        const resp = await axioseInstance.post("/auth/create-user", data);
        return resp
    },
    login: async (data) => {
        const resp = await axioseInstance.post("/auth/login-user", data);
        return resp
    },
    getMe: async () => {
        const resp = await axioseInstance.get("/auth/get-me");
        return resp
    }
};


export default authServices