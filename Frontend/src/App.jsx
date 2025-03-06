import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/landing/landingPage";
import "./app.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;