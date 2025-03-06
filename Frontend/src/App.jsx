import React from "react";
import { Routes, Route } from "react-router-dom";
import "./app.css";
import LandingPage from "./page/landing/LandingPage";
import AuthPage from "./page/auth/AuthPage";
import Home from "./page/home/home";
import Resume from "./components/resume/resume";
import MockQuiz from "./components/mock/Mock";
import Job from "./components/job/Job";
import CoverLetter from "./components/cover-letter/CoverLetter";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/resume" element={<Resume />} /> 
      <Route path="/mock-quiz" element={<MockQuiz />} /> 
      <Route path="/job-search" element={<Job />} /> 
      <Route path="/cover-letter" element={<CoverLetter />} /> 
    </Routes>
  );
};

export default App;