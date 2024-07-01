import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

const RootLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="bg-gray-200 py-20 min-h-screen mt-10">
                {<Outlet />}
            </main>
        </>
    );
};

export default RootLayout;
