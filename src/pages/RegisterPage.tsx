import { Link } from "react-router-dom";
import InputError from "../components/ui/InputError";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [registerInput, setRegisterInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name: fieldName, value } = e.target;
        setRegisterInput((prev) => ({ ...prev, [fieldName]: value }));
        setMessage("");
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/user/register",
                registerInput
            );

            if (data.createdUser) {
                setMessage("Created account successfully.");
            }

            setRegisterInput({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data.message || "Something went wrong.");
            } else {
                setErr("Unknow error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="md:w-[30rem] bg-white shadow-md rounded-lg w-full md:p-10 py-10 px-4 flex flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-center text-3xl font-bold">Register</h1>
            {message && (
                <h1 className="text-white bg-green-400 text-center p-2 rounded-md">
                    {message}
                </h1>
            )}
            {err && <InputError err={err} />}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <Input
                    type="text"
                    className="w-full h-[3rem] px-2 bg-gray-200 border border-black"
                    value={registerInput.name}
                    placeholder="Name"
                    name="name"
                    onChange={handleInputChange}
                />

                <Input
                    type="email"
                    className="w-full h-[3rem] px-2 bg-gray-200 border border-black"
                    value={registerInput.email}
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                />

                <PasswordInput
                    value={registerInput.password}
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />

                <PasswordInput
                    value={registerInput.confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                />

                <Button
                    label="Register"
                    disabled={isLoading}
                    className="bg-neutral-700 text-white py-3 disabled:cursor-not-allowed"
                />
            </form>
            <p>
                Already have an account?{" "}
                <Link className="text-blue-400" to="/login">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
