import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ListingInput } from "../types";
import {
    ListingState,
    fetchListingInitialState,
    listingFetchReducer,
} from "../components/reducers/listingFetchReducer";

const BASE_URL = "http://localhost:5000/api/listing";

interface ListingContextProviderProps {
    children: React.ReactNode;
}

export const ListingContext = createContext<{
    state: ListingState;
    fetchListing: (id: string | undefined) => Promise<void>;
    createListing: (inputs: any, token: string) => Promise<void>;
    editListing: (id: string, inputs: any, token: string) => Promise<void>;
    deleteListing: (id: string | undefined, token: string) => Promise<void>;
}>({
    state: fetchListingInitialState,
    fetchListing: async () => {},
    createListing: async () => {},
    editListing: async () => {},
    deleteListing: async () => {},
});

const ListingContextProvider = ({ children }: ListingContextProviderProps) => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(
        listingFetchReducer,
        fetchListingInitialState
    );

    const handleAxiosError = (error: any) => {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: "REJECTED",
                payload: error.response?.data.message || "Network Error",
            });
        } else {
            dispatch({
                type: "REJECTED",
                payload: "An unexpected error occurred",
            });
        }
    };

    const fetchListing = async (id: string | undefined) => {
        try {
            dispatch({ type: "PENDING" });
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            dispatch({ type: "SUCCESS", payload: data.listing });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const createListing = async (inputs: ListingInput, token: string) => {
        try {
            dispatch({ type: "PENDING" });
            const { data } = await axios.post(BASE_URL, inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Barer ${token}`,
                },
            });
            dispatch({ type: "SUCCESS", payload: data.listing });
            navigate(`/active-listings/${data.listing._id}`);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const editListing = async (
        id: string | undefined | null,
        inputs: ListingInput,
        token: string
    ) => {
        try {
            dispatch({ type: "PENDING" });
            const { data } = await axios.patch(`${BASE_URL}/${id}`, inputs, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Barer ${token}`,
                },
            });
            dispatch({ type: "SUCCESS", payload: data.listing });
            navigate(`/active-listings/${data.listing._id}`);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deleteListing = async (id: string | undefined, token: string) => {
        try {
            dispatch({ type: "PENDING" });
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Barer ${token}`,
                },
            });
            dispatch({ type: "DELETE_SUCCESSED" });
            navigate("/active-listings");
        } catch (error) {
            handleAxiosError(error);
        }
    };

    return (
        <ListingContext.Provider
            value={{
                state,
                fetchListing,
                createListing,
                editListing,
                deleteListing,
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};

export const useListing = () => {
    const context = useContext(ListingContext);
    return context;
};

export default ListingContextProvider;
