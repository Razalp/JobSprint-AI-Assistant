import React from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import LandingPage from "./page/landing/LandingPage";
import AuthPage from "./page/auth/AuthPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;