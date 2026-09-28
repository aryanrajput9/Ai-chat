
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../feature/auth/state/authSlice';
import { ROUTES } from '../constant';
import { useSelector } from 'react-redux';

function ProtectedRoute() {

    const isAuthenticated = useSelector(selectIsAuthenticated);




    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace ></Navigate >
    }



    return (
        <Outlet />
    )
}

export default ProtectedRoute
