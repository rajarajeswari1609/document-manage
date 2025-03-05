import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Homepage";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Components/Auth";
import Profile from "./Components/Profile";

function App() {
    return (
      <div className="App">
        <AuthProvider>
        
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/signup" element={<Signup />} ></Route>
                <Route path="/login" element={<Login />} ></Route>
                <Route path="/dashboard" element={<Dashboard />} ></Route>
                <Route path="/AboutUs" element={<AboutUs />} ></Route>
                <Route path="/contact" element={<Contact />} ></Route>
                <Route path="/Profile"element={<Profile/>}></Route>
            </Routes>
            </AuthProvider>
            </div>
       
    );
}
export default App;
