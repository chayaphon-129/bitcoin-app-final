import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("jwtToken");
    return token ? children : _jsx(Navigate, { to: "/login" });
};
export default PrivateRoute;
