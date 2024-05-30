import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallBack from "./pages/AuthCallBack";


const AppRoutes = () => {
    //contains all routes
    return (
        <Routes>
            {/* when path is the place where it will display and element is the content that it will display */}
            <Route path="/" element={
                <Layout>
                    <HomePage/>
                </Layout>
            } />
            <Route path="/auth-callback" element={<AuthCallBack/>}/>
            <Route path="/user-profile" element={
                <span>User Profile Page</span>
            }/>
            <Route path="*" element={
                <Navigate to="/" /> //if the user link is different it will redirect to home page
            }/>
        </Routes>
    )
}

export default AppRoutes;