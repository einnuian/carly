import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import NavBar from "./navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <div className="landing-root">
      {/* Nav */}
      {/* <header className="landing-nav">
        <div className="nav-logo">Carly</div>
        <nav className="nav-links">
          <button className="nav-link">Find</button>
          <button className="nav-link">Contact</button>
          <button className="nav-link">Help</button>
        </nav>
      </header> */}
      <NavBar />

      {/* Hero */}
      <main className="landing-hero">
        <h1 className="hero-title">Find your next car</h1>

        <button className="hero-button" onClick={handleGetStarted}>
          Get started
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
