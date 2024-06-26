import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? (
        //render all the child routes of the component
    <Outlet/>
    ) : (
    <Navigate to="/" replace/>
    )
}

export default ProtectedRoute;