import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PropsWithChildren } from "react";

type PrivateRouteProps = PropsWithChildren;

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    return children;
};

export default PrivateRoute;
