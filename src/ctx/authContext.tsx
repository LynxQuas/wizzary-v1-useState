import { createContext, useContext, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { AuthContextProviderProps, Login } from "../types";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

const AuthContext = createContext<any>(undefined);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [err, setErr] = useState("");
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    const handleLogin = async (loginData: Login) => {
        setIsLoading(true);
        setErr("");

        try {
            const { data } = await axios.post(`${BASE_URL}/login`, loginData);
            setUser(data.user);
            setToken(data.token);

            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", data.token);

            redirect("/active-listings");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErr(
                    error.response?.data.message ||
                        "Something went wrong try again."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                err,

                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useUser = () => {
    const context = useContext(AuthContext);
    return context;
};

export default AuthContextProvider;
