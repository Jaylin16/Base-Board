import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import auth from "./hoc/auth";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth(<LandingPage />, null)} />
        <Route path="/login" element={auth(<LoginPage />, false)} />
        <Route path="/register" element={auth(<RegisterPage />, false)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
