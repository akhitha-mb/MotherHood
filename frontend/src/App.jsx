import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Auth/Login";
import Navbar from "./Navbar/Navbar";
import Psignup from "./Component/Auth/Patient/Psignup";
import Dsignup from "./Component/Auth/Doctor/Dsignup";
import Dlogin from "./Component/Auth/Doctor/Dlogin";
import Alogin from "./Component/Auth/Admin/Alogin";
import Asignup from "./Component/Auth/Admin/Asignup";
import Home from "./Component/Dashboard/User/Home"; 
import DHome from "./Component/Dashboard/Doctor/DHome";
import AHome from "./Component/Dashboard/Admin/AHome";
import Index from "./Component/Home/Index";

function App() {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Index />} />
                {/* Auth Routes */}
                <Route path="/patient-login" element={<Login />} />
                <Route path="/patient-signup" element={<Psignup />} />
                <Route path="/doctor-login" element={<Dlogin />} />
                <Route path="/doctor-signup" element={<Dsignup />} />
                <Route path="/admin-login" element={<Alogin />} />
                <Route path="/admin-signup" element={<Asignup />} />
                {/* Dashboard Routes */}
                <Route path="/patient-dashboard" element={<Home />} />
                <Route path="/doctor-dashboard" element={<DHome/>} />
                <Route path="/admin-dashboard" element={<AHome/>} />
            </Routes>
        </Router>
    );
}

export default App;

