import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";

import ActiveListingPage from "./pages/ActiveListingPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import EditListingPage from "./pages/EditListingPage";

import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <h1>HomePage</h1> },
                { path: "active-listings", element: <ActiveListingPage /> },
                { path: "contact", element: <h1>Contact Page</h1> },
                { path: "about", element: <h1>About Page</h1> },
                { path: "login", element: <LoginPage /> },
                { path: "register", element: <RegisterPage /> },
                {
                    path: "create-listing",
                    element: (
                        <PrivateRoute>
                            <CreateListingPage isEditing={false} />
                        </PrivateRoute>
                    ),
                },
                { path: "active-listings/:id", element: <ListingDetailPage /> },
                {
                    path: "active-listings/:id/edit",
                    element: <EditListingPage />,
                },
                {
                    path: "profile",
                    element: (
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    ),
                },
            ],
        },
    ]);
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
