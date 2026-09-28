import { createBrowserRouter } from "react-router-dom";
import Login from "../feature/auth/ui/components/Login";
import { ROUTES } from "../constant";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import NotFound from "../utils/components/NotFound";
import Register from "../feature/auth/ui/components/Register";
import MainPage from "../feature/chat/ui/pages/MainPage";


const AppRoute = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.REGISTER,
                element: <Register />
            }

        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.CONVERSATIONS,
                element: <MainPage />,
            },
            {
                path: "/chat/:conversationId",
                element: <MainPage />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);


export default AppRoute