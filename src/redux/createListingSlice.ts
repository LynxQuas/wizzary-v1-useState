import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCreateListing = createAsyncThunk(
    "listing/create",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axios.post(
                "http://localhost:5000/api/listing",
                data.inputs,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Barer ${data.token}`,
                    },
                }
            );

            console.log(response.data);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(
                    err.response?.data?.message || err.message
                );
            } else {
                return rejectWithValue(err.message);
            }
        }
    }
);

const initialState = {
    result: null,
    isLoading: false,
    err: "",
};

const createListingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateListing.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreateListing.fulfilled, (state, action) => {
                state.err = "";
                state.result = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCreateListing.rejected, (state, action) => {
                state.isLoading = false;
                state.result = null;
                state.err = action.payload as string;
            });
    },
});

export const createListing = fetchCreateListing;
export default createListingSlice.reducer;
