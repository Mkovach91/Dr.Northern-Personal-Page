import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";



function App() {

  const [token, setToken] = useState("")

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App
