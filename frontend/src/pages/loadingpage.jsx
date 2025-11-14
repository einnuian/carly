import React from "react";
import "./loadingpage.css";
import NavBar from "./navbar";

const LoadingPage = () => {
  return (
    <div className="loading-root">
      <NavBar />

      <main className="loading-main">
        <div className="loading-card">
          <div className="loading-icon-wrap">
            <div className="loading-pulse" />
            <div className="loading-car">🚗</div>
          </div>

          <h1 className="loading-title">Your dream car is arriving...</h1>
          <p className="loading-subtitle">
            We’re crunching the numbers to find the best match for your needs.
          </p>

          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingPage;
