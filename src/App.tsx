import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./pages/PrivateRoute";
import RootLayout from "./pages/RootLayout";
import AuthContextProvider from "./ctx/authContext";
import ActiveListingPage from "./pages/ActiveListingPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import EditListingPage from "./pages/EditListingPage";

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
                { path: "login", element: <h1>Login Page </h1> },
                { path: "register", element: <h1>Register Page</h1> },
                { path: "create-listing", element: <CreateListingPage /> },
                { path: "active-listings/:id", element: <ListingDetailPage /> },
                {
                    path: "active-listings/:id/edit",
                    element: <EditListingPage />,
                },
            ],
        },
    ]);
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />;
        </AuthContextProvider>
    );
};

export default App;

// createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//         <Route index element={<h1>Home Page</h1>} />
//         <Route path="active-listings" element={<ActiveListingPage />} />
//         <Route path="contact" element={<h1>Contact Page</h1>} />
//         <Route path="about" element={<h1>About Page</h1>} />
//         <Route path="login" element={<LoginPage />} />
//         <Route
//             path="active-listings/:id"
//             element={<ListingDetailPage />}
//         />
//         <Route path="register" element={<RegisterPage />} />
//         <Route element={<PrivateRoute />}>
//             <Route
//                 path="create-listing"
//                 element={<CreateListingPage />}
//             />
//             <Route path="profile" element={<h1>Profile</h1>} />
//         </Route>
//     </Route>
// )
