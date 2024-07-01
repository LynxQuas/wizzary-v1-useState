import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        setRegisterInput((prev) => ({ ...prev, [name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await axios.post(
                "http://localhost:5000/api/user/register",
                registerInput
            );
            navigate("/login");
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message || "An unknow error occurred."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return { registerInput, handleInputChange, handleRegister, loading, err };
};

export default useRegister;
