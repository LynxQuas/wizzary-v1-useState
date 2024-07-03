import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import createListingReducer from "./createListingSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        listing: createListingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
