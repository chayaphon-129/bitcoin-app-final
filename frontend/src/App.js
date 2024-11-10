import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import PriceDisplay from "./PriceDisplay";
import CryptoChart from "./CryptoChart";
import Login from "./Login";
import Signup from "./Signup";
import { AuthProvider, useAuth } from "./AuthContext";
// import logo from "images/logo-cite-edit.jpg"; // เพิ่มการนำเข้ารูปโลโก้
const App = () => {
    const logo = "images/logo-cite-edit.jpg";
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsx(Content, {}) }) }));
};
// ส่วนของเนื้อหาหลัก
const Content = () => {
    const location = useLocation();
    const { user } = useAuth();
    return (_jsxs("div", { children: [location.pathname !== "/login" && location.pathname !== "/signup" && (_jsx("header", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }, children: _jsxs("div", { children: [_jsx(Link, { to: "/price-display", children: "Current Prices" }), "\u2003", _jsx(Link, { to: "/chart", children: "Price Chart" }), "\u2003", _jsx(Link, { to: "/login", children: "Sign Out" }), "\u2003"] }) })), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: user ? _jsx(Navigate, { to: "/price-display" }) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/price-display", element: _jsx(PrivateRoute, { component: _jsx(PriceDisplay, {}) }) }), _jsx(Route, { path: "/chart", element: _jsx(PrivateRoute, { component: _jsx(CryptoChart, {}) }) })] }), _jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx("img", { src: "images/logo-cite-edit.jpg", alt: "Logo", style: { width: "70px", height: "70px", marginRight: "10px" } }), _jsxs("div", { children: [_jsx("p", { style: { margin: 0 }, children: "Chayaphon Suwanvorn" }), _jsx("p", { style: { margin: 0, fontSize: "small" }, children: "College of Engineering and Technology" }), _jsx("p", { style: { margin: 0, fontSize: "small" }, children: "Dhurakij Pundit University" }), _jsx("p", { style: { margin: 0, fontSize: "small" }, children: "Advisor Asst.Prof. Dr.Chaiyaporn Khemapatapan" })] })] })] }));
};
// คอมโพเนนต์ PrivateRoute
const PrivateRoute = ({ component }) => {
    const { user } = useAuth();
    return user ? component : _jsx(Navigate, { to: "/login" });
};
export default App;
