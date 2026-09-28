import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectisLaoding,
    setLoading,
    setUser,
} from "../feature/auth/state/authSlice";
import { useAuthHook } from "../feature/auth/hook/authHook";
import Spinner from "../utils/components/Spinner";

function AuthInitializer({ children }) {
    const dispatch = useDispatch();

    const { getMe } = useAuthHook();

    const isLoading = useSelector(selectisLaoding);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await getMe();

                dispatch(setUser(response.data.data));

            } catch (error) {
                console.log("AUTH INIT ERROR:", error);
            } finally {
                console.log("AUTH INITIALIZER FINISHED");
                dispatch(setLoading(false))
            }
        };

        initializeAuth();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#090B09] text-[#9ACF75]">
                <Spinner />
            </div>
        );
    }

    return children;
}

export default AuthInitializer;