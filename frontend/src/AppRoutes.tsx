import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallBack from "./pages/AuthCallBack";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";

const AppRoutes = () => {
    //contains all routes
    return (
        <Routes>
            {/* when path is the place where it will display and element is the content that it will display */}
            <Route path="/" element={
                //default showHero is true
                <Layout showHero>
                    <HomePage/>
                </Layout>
            } />
            <Route path="/auth-callback" element={<AuthCallBack />} />
            {/* Outlet component childern */}
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                } />

                <Route path="/manage-restaurant" element={
                    <Layout>
                        <ManageRestaurantPage />
                    </Layout>
                } />
            </Route>
            
            <Route path="*" element={
                <Navigate to="/" /> //if the user link is different it will redirect to home page
            }/>
        </Routes>
    )
}

export default AppRoutes;