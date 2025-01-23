import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import Home from "./pages/home";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import AdminDashboard from "./pages/admin-dashboard";
// import Labs from "./pages/labs";
// import Account from "./pages/account";


function App() {

  const [token, setToken] = useState("")

  return (

    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />


      </Routes>

    </>
  )
}

export default App
