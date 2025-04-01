import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register";
import Labs from "./pages/labs";



function App() {

  const [token, setToken] = useState("")

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element ={<Login />} />
          <Route path="/register" element ={<Register />} />
          <Route path="/labs" element ={<Labs />} />
        </Routes>
      </div>
    </>
  );
}

export default App
