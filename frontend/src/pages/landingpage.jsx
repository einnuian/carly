// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";
// import NavBar from "./navbar";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate("/quiz");
//   };

//   return (
//     <div className="landing-root">

//       <NavBar />

//       {/* Hero */}
//       <main className="landing-hero">
//         <h1 className="hero-title">Find your next car</h1>

//         <button className="hero-button" onClick={handleGetStarted}>
//           Get started
//         </button>
//       </main>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingpage.css";
import NavBar from "./navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <div className="landing-root">
      {/* gradient background */}
      <div className="landing-overlay">
        <NavBar />

        <main className="landing-hero">
          {/* LEFT SIDE: copy */}
          <section className="landing-left">
            <span className="hero-kicker">Tune in</span>
            <h1 className="hero-title">
              Clarifying Your
              <br />
              Next Car Search
            </h1>
            <p className="hero-subtitle">
              A shortcut to clarity in a noisy world. Answer a few questions and
              let CARLY find the perfect car to meet your needs.
            </p>

            <button className="hero-button" onClick={handleGetStarted}>
              <span>Start here</span>
              <span className="hero-button-arrow">→</span>
            </button>
          </section>

          {/* RIGHT SIDE: abstract arcs / glow */}
          <section className="landing-right">
            <div className="hero-glow" />
            <div className="hero-orbit hero-orbit-1" />
            <div className="hero-orbit hero-orbit-2" />
            <div className="hero-orbit hero-orbit-3" />
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
