
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../feature/auth/state/authSlice';
import { ROUTES } from '../constant';
import { useSelector } from 'react-redux';

function PublicRoute() {
    const isAuthenticated = useSelector(selectIsAuthenticated);




    if (isAuthenticated) {
        return <Navigate to={ROUTES.CONVERSATIONS} replace ></Navigate >
    };



    return (
        <Outlet />
    )
}

export default PublicRoute
