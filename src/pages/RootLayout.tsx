import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import ListingContextProvider from "../context/ListingContext";

const RootLayout = () => {
    return (
        <ListingContextProvider>
            <header>
                <Navbar />
            </header>

            <main className="bg-gray-200 py-20 min-h-screen mt-10">
                {<Outlet />}
            </main>
        </ListingContextProvider>
    );
};

export default RootLayout;
