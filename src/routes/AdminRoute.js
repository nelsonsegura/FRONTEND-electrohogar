import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
    const authData = localStorage.getItem("authData");

    if (!authData) return <Navigate to="/" />;

    const user = JSON.parse(authData);

    if (user.role !== "admin") {
        return <Navigate to="/movies" />;
    }

    return children;
};
