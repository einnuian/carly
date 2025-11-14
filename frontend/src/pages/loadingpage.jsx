import React from "react";
import "./loadingpage.css";
import NavBar from "./navbar";

const LoadingPage = () => {
  return (
    <div className="loading-root">
      <NavBar />

      <main className="loading-main">
        <section className="loading-card">
          <div className="loading-icon-wrap">
            <div className="loading-orbit">
              <div className="loading-orbit-inner" />
            </div>
            <div className="loading-car">🚗</div>
          </div>

          <h1 className="loading-title">Your dream car is arriving…</h1>
          <p className="loading-subtitle">
            We’re tuning the data and matching vehicles to your preferences.
          </p>

          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>

          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoadingPage;
