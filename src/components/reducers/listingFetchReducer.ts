import { Listing } from "../../types";

export interface ListingState {
    listing: Listing | null;
    isLoading: boolean;
    error: string | null;
}

export const fetchListingInitialState: ListingState = {
    listing: null,
    isLoading: false,
    error: null,
};

type ListingAction =
    | { type: "REJECTED"; payload: string }
    | { type: "SUCCESS"; payload: Listing }
    | { type: "PENDING" }
    | { type: "DELETE_SUCCESSED" };

export const listingFetchReducer = (
    state: ListingState,
    action: ListingAction
) => {
    switch (action.type) {
        case "PENDING":
            return { ...state, isLoading: true };
        case "SUCCESS":
            return {
                ...state,
                listing: action.payload,
                isLoading: false,
                error: null,
            };
        case "DELETE_SUCCESSED":
            return { ...state, isLoading: false, error: null };
        case "REJECTED":
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
