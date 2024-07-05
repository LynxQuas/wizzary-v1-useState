import { createContext, useContext, useState } from "react";
import { LoginInput, User } from "../types";

const AuthContext = createContext<{
    user: User | null;
    token: null | string;
    login: (userData: { name: string; id: string }, token: string) => void;
    logout: () => void;
}>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProp {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProp) => {
    const [user, setUser] =
        useState(() => JSON.parse(sessionStorage.getItem("user")!)) || null;

    const [token, setToken] = useState(sessionStorage.getItem("token") || null);

    const login = (userData: { name: string; id: string }, token: string) => {
        console.log("user logged in.");
        setUser(userData);
        setToken(token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default AuthProvider;
