import { useDispatch } from "react-redux";
import authServices from "../services/authServices";
import { setErorr, setToken, setUser } from "../state/authSlice";
import { toast } from "react-toastify";



export const useAuthHook = () => {


    const dispatch = useDispatch();



    const register = async (data) => {

        try {
            const resp = await authServices.register(data);
            return resp

        } catch (error) {
            dispatch(
                setErorr(error.resp?.data?.message || error.message || "Something is wrong")
            );
        }

    };
    const login = async (data) => {

        try {
            const resp = await authServices.login(data);
            dispatch(setUser(resp.data.data));
            dispatch(setToken(resp.data.data.accessToken))
            toast.success(resp.data.message)

            return resp

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

            dispatch(setErorr(errorMessage));

            toast.error(errorMessage);

        }

    };

    const getMe = async () => {

        const resp = await authServices.getMe();
        dispatch(setUser(resp.data.data))
        return resp
    }


    return { register, login, getMe }
}