import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// redux

// components

// types

import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";
import InputError from "../components/ui/InputError";
import { useUser } from "../ctx/authContext";

const LoginPage = () => {
    const { token, isLoading, handleLogin, err, setErr } = useUser();

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        setUserInput((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        handleLogin(userInput);
    };

    useEffect(() => {
        if (token) {
            navigate("/active-listings");
        }
    }, [token, navigate]);

    // clean the input error after leaving the login page.
    useEffect(() => {
        setErr("");
    });

    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            className="md:w-[30rem] bg-white shadow-md rounded-lg w-full md:p-10 py-10 px-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
            <h1 className="text-center text-3xl font-bold">Login</h1>

            {err && <InputError err={err} />}

            <Input
                type="email"
                value={userInput.email}
                className="w-full h-[3rem] px-2 bg-gray-200 border-black  border"
                placeholder="email"
                name="email"
                onChange={(e) => handleInputChange(e, "email")}
            />
            <PasswordInput
                name="password"
                value={userInput.password}
                placeholder="Password"
                onChange={(e) => handleInputChange(e, "password")}
            />
            <Button
                label={isLoading ? "loading" : "Login"}
                className="bg-neutral-700 text-white py-3"
            />
            <p>
                Don't have an account?{" "}
                <Link className="text-blue-400" to="/register">
                    Register
                </Link>
            </p>
        </form>
    );
};

export default LoginPage;
