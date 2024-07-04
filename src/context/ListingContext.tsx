import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ListingInput } from "../types";
import { useNavigate } from "react-router-dom";
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
    createListing: (inputs: any) => Promise<void>;
    editListing: (id: string, inputs: any) => Promise<void>;
    deleteListing: (id: string | undefined) => Promise<void>;
}>({
    state: fetchListingInitialState,
    fetchListing: async () => {},
    createListing: async () => {},
    editListing: async () => {},
    deleteListing: async () => {},
});

const ListingContextProvider = ({ children }: ListingContextProviderProps) => {
    const [state, dispatch] = useReducer(
        listingFetchReducer,
        fetchListingInitialState
    );
    const navigate = useNavigate();

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

    const createListing = async (inputs: ListingInput) => {
        try {
            dispatch({ type: "PENDING" });
            const { data } = await axios.post(BASE_URL, inputs);
            dispatch({ type: "SUCCESS", payload: data.listing });
            navigate(`/active-listings/${data.listing._id}`);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const editListing = async (
        id: string | undefined | null,
        inputs: ListingInput
    ) => {
        try {
            dispatch({ type: "PENDING" });
            const { data } = await axios.patch(`${BASE_URL}/${id}`, inputs);
            dispatch({ type: "SUCCESS", payload: data.listing });
            navigate(`/active-listings/${data.listing._id}`);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const deleteListing = async (id: string | undefined) => {
        try {
            dispatch({ type: "PENDING" });
            await axios.delete(`${BASE_URL}/${id}`);
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
