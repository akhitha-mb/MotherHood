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
function App() {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/patient-signup" element={<Psignup />}></Route>
                <Route path="/doctor-login" element={<Dlogin />}></Route>
                <Route path="/doctor-signup"element={<Dsignup />}></Route>
                <Route path="/admin-login" element={<Alogin />}></Route>
                <Route path="/admin-signup" element={<Asignup />}></Route>
                <Route path="/admin-signup" element={<Asignup />}></Route>
                <Route path="/patient-dashboard" element={<Home />}></Route>
                <Route path="/doctor-dashboard" element={<DHome/>}></Route>

            </Routes>
        </Router>
    );
}

export default App;

