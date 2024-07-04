export interface State {
    title: string;
    description: string;
    price: string | number;
    image_url: string;
    category: string;
    error: string;
    isLoading: boolean;
}

export type Action =
    | { type: "SET_FIELD"; fieldName: string; payload: string }
    | { type: "SET_ERROR"; payload: string }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "RESET_FORM"; payload: Partial<State> };

export const listingInputInitialState: State = {
    title: "",
    description: "",
    price: "",
    image_url: "",
    category: "others",
    error: "",
    isLoading: false,
};

export const listingInputReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.fieldName]: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        case "RESET_FORM":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
