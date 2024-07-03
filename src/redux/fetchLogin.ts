import axios from "axios";
import { LoginInput, User } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk<
    any,
    LoginInput,
    { rejectValue: string }
>("user/login", async (loginData: LoginInput, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(
            "http://localhost:5000/api/user/login",
            loginData
        );

        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);
        console.log(data);
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
});
