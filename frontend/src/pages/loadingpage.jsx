import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./loadingpage.css";
import NavBar from "./navbar";

const LoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("starting"); // starting, fetching, success, error
  const [error, setError] = useState(null);

  useEffect(() => {
    const payload = location.state?.request;
    if (!payload) {
      setStatus("error");
      setError("No quiz data provided. Please start the quiz.");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const doFetch = async () => {
      try {
        setStatus("fetching");
        const res = await fetch(`${apiUrl}/api/recommendations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Status ${res.status}: ${text}`);
        }

        const data = await res.json();
        setStatus("success");
        // Navigate to results and pass data
        navigate("/results", { state: { recommendations: data } });
      } catch (err) {
        console.error("Recommendation fetch failed:", err);
        setError(err.message || String(err));
        setStatus("error");
      }
    };

    // slight delay to allow animation to start
    const t = setTimeout(doFetch, 120);
    return () => clearTimeout(t);
  }, [location.state, navigate]);

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

          <h1 className="loading-title">
            {status === "fetching" && "Your dream car is arriving…"}
            {status === "starting" && "Preparing your recommendations…"}
            {status === "error" && "Something went wrong"}
          </h1>
          <p className="loading-subtitle">
            {status === "error"
              ? error || "Failed to fetch recommendations."
              : "We’re tuning the data and matching vehicles to your preferences."}
          </p>

          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: status === "fetching" ? "60%" : "30%" }}
            />
          </div>

          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>

          {status === "error" && (
            <div style={{ marginTop: 16 }}>
              <button
                type="button"
                className="quiz-nav-button primary"
                onClick={() => navigate(-1)}
              >
                Back to quiz
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default LoadingPage;
