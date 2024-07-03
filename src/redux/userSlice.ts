import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./fetchLogin";

const initialState = {
    user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")!)
        : null,
    token: sessionStorage.getItem("token") || null,
    err: "",
    isLoading: false,
};

const userLoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.token = null;
            state.err = "";
            sessionStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.err = "";
                state.isLoading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.err = "";
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.err =
                    (action.payload as string) ||
                    "Login failed. Please try again.";
            });
    },
});

export const { logout } = userLoginSlice.actions;
export const loginUser = fetchLogin;
export default userLoginSlice.reducer;
