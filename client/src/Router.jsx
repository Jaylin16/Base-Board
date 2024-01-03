import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./hoc/Auth"
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

const Router = () => {

  return (
      <Routes>
        <Route path="/" element={Auth(<LandingPage/>, 0)}/>
        <Route path="/login" element={Auth(<LoginPage/>, 2)}/>
        <Route path="/register" element={Auth(<RegisterPage/>, 2)} />
      </Routes>
  );
};

export default Router;