import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./pages/PrivateRoute";
import RootLayout from "./pages/RootLayout";
import AuthContextProvider from "./ctx/authContext";
import ActiveListingPage from "./pages/ActiveListingPage";
import CreateListingPage from "./pages/CreateListingPage";

const App = () => {
    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<h1>Home Page</h1>} />
                        <Route
                            path="active-listings"
                            element={<ActiveListingPage />}
                        />
                        <Route path="contact" element={<h1>Contact Page</h1>} />
                        <Route path="about" element={<h1>About Page</h1>} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route element={<PrivateRoute />}>
                            <Route
                                path="create-listing"
                                element={<CreateListingPage />}
                            />
                            <Route path="profile" element={<h1>Profile</h1>} />
                        </Route>
                    </Route>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
};

export default App;
