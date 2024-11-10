var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // นำเข้า useAuth
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // ใช้ useAuth เพื่อดึงฟังก์ชัน login
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield login(username, password); // เรียกใช้ฟังก์ชัน login
            navigate("/price-display"); // เปลี่ยนเส้นทางไปหน้า PriceDisplay เมื่อเข้าสู่ระบบสำเร็จ
        }
        catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please check your username and password.");
        }
    });
    const handleSignup = () => {
        navigate("/signup");
    };
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Login" }), _jsxs("form", { onSubmit: handleLogin, children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Username:" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Password:" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsxs("div", { className: "button-group", children: [_jsx("button", { type: "submit", children: "Login" }), _jsx("button", { type: "button", onClick: handleSignup, children: "Sign Up" })] }), _jsx("br", {}), _jsx("br", {})] })] }));
};
export default Login;
