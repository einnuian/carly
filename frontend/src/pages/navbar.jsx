// import React from "react";
// import "./navbar.css";

// const NavBar = () => {
//   return (
//     <header className="landing-nav">
//       <div className="nav-logo">Carly</div>
//       <nav className="nav-links">
//         <button className="nav-link">Find</button>
//         <button className="nav-link">Contact</button>
//         <button className="nav-link">Help</button>
//       </nav>
//     </header>
//   );
// };

// export default NavBar;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="landing-nav">
      <div className="nav-logo">Carly</div>
      <nav className="nav-links">
        <button className="nav-link" onClick={() => navigate("/quiz")}>
          Find
        </button>

        <button className="nav-link">Contact</button>
        <button className="nav-link">Help</button>
      </nav>
    </header>
  );
};

export default NavBar;
