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
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield axios.post("http://localhost:5001/api/signup", {
                username,
                password,
            });
            // หลังจากสมัครสมาชิกสำเร็จ นำไปล็อกอิน
            navigate("/login");
        }
        catch (error) {
            console.error("Signup failed", error);
            alert("Signup failed. Please try again.");
        }
    });
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Sign Up" }), _jsxs("form", { onSubmit: handleSignup, children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Username:" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Password:" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", children: "Sign Up" })] })] }));
};
export default Signup;
