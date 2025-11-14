// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./resultpage.css";
// import NavBar from "./navbar";

// const mockResults = [
//   {
//     rank: 1,
//     name: "Mazda MX-5 Miata",
//     year: 2024,
//     msrp: 28800,
//     monthlyFuel: 70,
//     storage: 5.5,
//     drive: 9,
//     comfort: 7,
//     tech: 7.5,
//     owner: 8.5,
//     style: 9,
//     fitScore: 8.5,
//   },
//   {
//     rank: 2,
//     name: "BMW Z4",
//     year: 2023,
//     msrp: 52300,
//     monthlyFuel: 120,
//     storage: 6,
//     drive: 9,
//     comfort: 8,
//     tech: 8.5,
//     owner: 8,
//     style: 9,
//     fitScore: 8,
//   },
//   {
//     rank: 3,
//     name: "Chevrolet Corvette",
//     year: 2024,
//     msrp: 66200,
//     monthlyFuel: 150,
//     storage: 5,
//     drive: 9,
//     comfort: 7.5,
//     tech: 8,
//     owner: 8.5,
//     style: 9.5,
//     fitScore: 7.5,
//   },
//   {
//     rank: 4,
//     name: "Porsche Cayman",
//     year: 2023,
//     msrp: 63100,
//     monthlyFuel: 140,
//     storage: 5.5,
//     drive: 9,
//     comfort: 7.8,
//     tech: 8.5,
//     owner: 8.9,
//     style: 9.3,
//     fitScore: 8,
//   },
//   {
//     rank: 5,
//     name: "Toyota GR86",
//     year: 2024,
//     msrp: 32000,
//     monthlyFuel: 85,
//     storage: 5.5,
//     drive: 8.5,
//     comfort: 7,
//     tech: 7.5,
//     owner: 7.5,
//     style: 7.8,
//     fitScore: 8.5,
//   },
// ];

// const formatCurrency = (num) =>
//   typeof num === "number"
//     ? `$${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
//     : "-";

// const ResultPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // If your backend returns an array, you can pass it via router state:
//   // navigate("/results", { state: { result: backendArray } })
//   const backendResult = location.state?.result;
//   const rows = Array.isArray(backendResult) ? backendResult : mockResults;

//   return (
//     <div className="results-root">
//       <NavBar />

//       <main className="results-main">
//         <header className="results-header">
//           <div className="results-header-top">
//             <div className="results-badge-wrap">
//               <span className="results-icon">✨</span>
//               <span className="results-badge">AI-generated</span>
//             </div>
//             <button
//               className="results-back-link"
//               type="button"
//               onClick={() => navigate(-1)}
//             >
//               ← Back
//             </button>
//           </div>

//           <h1 className="results-title">Your Recommendations</h1>
//           <p className="results-subtitle">
//             Based on your preferences, here are the best vehicles that match
//             your needs.
//           </p>
//         </header>

//         <section className="results-table-card">
//           <div className="results-table-header">
//             <div className="col-rank">Rank</div>
//             <div className="col-vehicle">Vehicle</div>
//             <div className="col-msrp">MSRP</div>
//             <div className="col-fuel">Monthly fuel</div>
//             <div className="col-metric">Storage</div>
//             <div className="col-metric">Drive</div>
//             <div className="col-metric">Comfort</div>
//             <div className="col-metric">Tech</div>
//             <div className="col-metric">Owner</div>
//             <div className="col-metric">Style</div>
//             <div className="col-fit">Fit</div>
//           </div>

//           <div className="results-table-body">
//             {rows.length === 0 && (
//               <div className="results-empty">No recommendations yet.</div>
//             )}

//             {rows.map((car, idx) => (
//               <div className="results-row" key={car.id || idx}>
//                 <div className="col-rank">
//                   <div className="rank-pill">{car.rank ?? idx + 1}</div>
//                 </div>

//                 <div className="col-vehicle">
//                   <div className="vehicle-name">{car.name}</div>
//                   <div className="vehicle-year">
//                     {car.year || car.modelYear || "-"}
//                   </div>
//                 </div>

//                 <div className="col-msrp">
//                   {formatCurrency(car.msrp || car.price)}
//                 </div>

//                 <div className="col-fuel">
//                   {car.monthlyFuel != null ? `$${car.monthlyFuel}` : "-"}
//                 </div>

//                 <div className="col-metric">{car.storage ?? "-"}</div>
//                 <div className="col-metric highlight">{car.drive ?? "-"}</div>
//                 <div className="col-metric highlight">{car.comfort ?? "-"}</div>
//                 <div className="col-metric">{car.tech ?? "-"}</div>
//                 <div className="col-metric">{car.owner ?? "-"}</div>
//                 <div className="col-metric">{car.style ?? "-"}</div>

//                 <div className="col-fit">
//                   <div className="fit-pill">
//                     {car.fitScore != null ? car.fitScore : "-"}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <div className="results-actions">
//           <button
//             type="button"
//             className="results-action secondary"
//             onClick={() => navigate("/quiz")}
//           >
//             Refine Search
//           </button>
//           <button type="button" className="results-action primary">
//             Save Results
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ResultPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./resultpage.css";
import NavBar from "./navbar";

// Mock data in the same shape as your backend
const mockResults = [
  {
    rank: 1,
    make_model_year: "2025 Kia Sportage",
    avg_msrp_usd: 34500,
    monthly_energy_cost_usd: 96,
    scores: {
      A_storage: 8.5,
      B_driving: 6.5,
      C_comfort: 7.8,
      D_tech: 8.2,
      E_owner: 7.0,
      F_style: 8.8,
    },
    fit_score: 8.0,
    pros: ["Stylish interior", "Huge cargo space", "Strong tech"],
    cons: ["Leisurely acceleration"],
    data_sources: {
      price: "KBB",
      fuel_cost: "KBB MPG + GasBuddy",
      ratings: "Edmunds",
    },
  },
  {
    rank: 2,
    make_model_year: "2024 Mazda MX-5 Miata",
    avg_msrp_usd: 28800,
    monthly_energy_cost_usd: 70,
    scores: {
      A_storage: 5.5,
      B_driving: 9.0,
      C_comfort: 7.0,
      D_tech: 7.5,
      E_owner: 8.5,
      F_style: 9.0,
    },
    fit_score: 8.5,
    pros: ["Fun to drive", "Great steering"],
    cons: ["Limited storage"],
    data_sources: {
      price: "KBB",
      fuel_cost: "KBB MPG + GasBuddy",
      ratings: "Edmunds",
    },
  },
  {
    rank: 3,
    make_model_year: "2023 BMW X3",
    avg_msrp_usd: 52000,
    monthly_energy_cost_usd: 130,
    scores: {
      A_storage: 7.5,
      B_driving: 8.5,
      C_comfort: 8.0,
      D_tech: 8.5,
      E_owner: 8.0,
      F_style: 8.3,
    },
    fit_score: 8.2,
    pros: ["Strong engine options", "Premium feel"],
    cons: ["Higher price"],
    data_sources: {
      price: "KBB",
      fuel_cost: "KBB MPG + GasBuddy",
      ratings: "Edmunds",
    },
  },
];

const formatCurrency = (num) =>
  typeof num === "number"
    ? `$${num.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    : "-";

// "2025 Kia Sportage" -> { year: "2025", name: "Kia Sportage" }
const parseMakeModelYear = (str) => {
  if (!str) return { year: "", name: "-" };
  const parts = String(str).split(" ");
  if (parts.length <= 1) return { year: "", name: str };
  const year = parts[0];
  const name = parts.slice(1).join(" ");
  return { year, name };
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Expect: navigate("/results", { state: { recommendations: backendData } })
  const backendData = location.state?.recommendations;
  const backendResults = backendData?.recommendations;
  const rows =
    Array.isArray(backendResults) && backendResults.length
      ? backendResults
      : mockResults;

  return (
    <div className="results-root">
      <NavBar />

      <main className="results-main">
        <header className="results-header">
          <div className="results-header-top">
            <div className="results-badge-wrap">
              <span className="results-icon">✨</span>
              <span className="results-badge">AI-generated</span>
            </div>
            <button
              className="results-back-link"
              type="button"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <h1 className="results-title">Your Recommendations</h1>
          <p className="results-subtitle">
            Based on your preferences, here are the best vehicles that match
            your needs.
          </p>
        </header>

        <section className="results-table-card">
          <div className="results-table-header">
            <div className="col-photo">Photo</div>
            <div className="col-rank">Rank</div>
            <div className="col-vehicle">Vehicle</div>
            <div className="col-msrp">MSRP</div>
            <div className="col-fuel">Monthly fuel</div>
            <div className="col-metric">Storage</div>
            <div className="col-metric">Drive</div>
            <div className="col-metric">Comfort</div>
            <div className="col-metric">Tech</div>
            <div className="col-metric">Owner</div>
            <div className="col-metric">Style</div>
            <div className="col-fit">Fit</div>
          </div>

          <div className="results-table-body">
            {rows.length === 0 && (
              <div className="results-empty">No recommendations yet.</div>
            )}

            {rows.map((car, idx) => {
              const { year, name } = parseMakeModelYear(car.make_model_year);
              const scores = car.scores || {};
              const storage = scores.A_storage;
              const drive = scores.B_driving;
              const comfort = scores.C_comfort;
              const tech = scores.D_tech;
              const owner = scores.E_owner;
              const style = scores.F_style;

              return (
                <div className="results-row" key={car.id || idx}>
                  <div className="col-photo">
                    {car.photo_url ? (
                      <img
                        src={car.photo_url}
                        alt={`${name} ${year}`}
                        className="vehicle-thumb"
                      />
                    ) : (
                      <div className="photo-placeholder">—</div>
                    )}
                  </div>

                  <div className="col-rank">
                    <div className="rank-pill">
                      {car.rank != null ? car.rank : idx + 1}
                    </div>
                  </div>

                  <div className="col-vehicle">
                    <div className="vehicle-name">{name}</div>
                    <div className="vehicle-year">{year}</div>
                  </div>

                  <div className="col-msrp">
                    {formatCurrency(car.avg_msrp_usd)}
                  </div>

                  <div className="col-fuel">
                    {car.monthly_energy_cost_usd != null
                      ? `$${car.monthly_energy_cost_usd}`
                      : "-"}
                  </div>

                  <div className="col-metric">{storage ?? "-"}</div>
                  <div className="col-metric highlight">{drive ?? "-"}</div>
                  <div className="col-metric highlight">{comfort ?? "-"}</div>
                  <div className="col-metric">{tech ?? "-"}</div>
                  <div className="col-metric">{owner ?? "-"}</div>
                  <div className="col-metric">{style ?? "-"}</div>

                  <div className="col-fit">
                    <div className="fit-pill">
                      {car.fit_score != null ? car.fit_score : "-"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="results-actions">
          <button
            type="button"
            className="results-action secondary"
            onClick={() => navigate("/quiz")}
          >
            Refine Search
          </button>
          <button type="button" className="results-action primary">
            Save Results
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
