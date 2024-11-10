import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import PriceDisplay from "./PriceDisplay";
import CryptoChart from "./CryptoChart";
import Login from "./Login";
import Signup from "./Signup";
import { AuthProvider, useAuth } from "./AuthContext";
// import logo from "images/logo-cite-edit.jpg"; // เพิ่มการนำเข้ารูปโลโก้

const App: React.FC = () => {
  const logo = "images/logo-cite-edit.jpg";
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
};

// ส่วนของเนื้อหาหลัก
const Content: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div>
      {/* แสดงชื่อและรูปที่มุมขวาบน */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
          <div>
            <Link to="/price-display">Current Prices</Link>&emsp;
            <Link to="/chart">Price Chart</Link>&emsp;
            <Link to="/login">Sign Out</Link>&emsp;
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/price-display" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/price-display" element={<PrivateRoute component={<PriceDisplay />} />} />
        <Route path="/chart" element={<PrivateRoute component={<CryptoChart />} />} />
      </Routes>
      <div style={{ display: "flex", alignItems: "center" }}>
            <img src="images/logo-cite-edit.jpg" alt="Logo" style={{ width: "70px", height: "70px", marginRight: "10px" }} />
            <div>
              <p style={{ margin: 0 }}>Chayaphon Suwanvorn</p>
              <p style={{ margin: 0, fontSize: "small" }}>College of Engineering and Technology</p>
              <p style={{ margin: 0, fontSize: "small" }}>Dhurakij Pundit University</p>
              <p style={{ margin: 0, fontSize: "small" }}>Advisor Asst.Prof. Dr.Chaiyaporn Khemapatapan</p>
            </div>
          </div>
    </div>
  );
};

// คอมโพเนนต์ PrivateRoute
const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  const { user } = useAuth();
  return user ? component : <Navigate to="/login" />;
};

export default App;
