var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import axios from "axios";
// สร้าง Context
const AuthContext = createContext(null);
// สร้าง Provider สำหรับ Context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios.post("http://localhost:5001/api/login", {
                username,
                password,
            });
            console.log("Login Response:", response.data); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล
            if (response.data.user) {
                setUser(response.data.user); // สมมุติว่า API ส่งกลับข้อมูลผู้ใช้
                localStorage.setItem("token", response.data.token); // เก็บ JWT ลงใน localStorage
            }
        }
        catch (error) {
            console.error("Login failed", error);
        }
    });
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token"); // ลบ JWT จาก localStorage
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
// Hook เพื่อใช้ Context
export const useAuth = () => {
    return useContext(AuthContext);
};
