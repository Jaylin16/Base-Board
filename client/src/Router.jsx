import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./hoc/Auth"
// import LandingPage from "./components/views/LandingPage/LandingPage";
// import LoginPage from "./components/views/LoginPage/LoginPage";
// import RegisterPage from "./components/views/RegisterPage/RegisterPage";

const LandingPage = lazy(() => import("./components/views/LandingPage/LandingPage"));
const LoginPage = lazy(() => import("./components/views/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./components/views/RegisterPage/RegisterPage"));

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={Auth(<LandingPage/>, 0)}/>
        <Route path="/login" element={Auth(<LoginPage/>, 1)}/>
        <Route path="/register" element={Auth(<RegisterPage/>, 1)} />
      </Routes>
  );
};

export default Router;