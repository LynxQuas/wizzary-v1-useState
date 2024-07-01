import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../ctx/authContext";

const PrivateRoute = () => {
    const { token } = useUser();

    if (!token) return <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
