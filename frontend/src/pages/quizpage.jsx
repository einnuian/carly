// import React, { useState, useEffect } from "react";
// import "./quizpage.css";
// import NavBar from "./navbar";

// const priorityItems = [
//   {
//     id: "A_storage",
//     label: "Storage capacity",
//     description: "Space for passengers, luggage, and daily gear.",
//   },
//   {
//     id: "B_driving",
//     label: "Driving experience",
//     description: "How it feels to drive — power, handling, responsiveness.",
//   },
//   {
//     id: "C_comfort",
//     label: "Comfort",
//     description: "Seat support, ride smoothness, and cabin quietness.",
//   },
//   {
//     id: "D_tech",
//     label: "Technology",
//     description: "Infotainment, connectivity, and driver assistance features.",
//   },
//   {
//     id: "E_owner",
//     label: "Owner satisfaction",
//     description: "Real-world reliability and ratings from other owners.",
//   },
//   {
//     id: "F_style",
//     label: "Style / X-Factor",
//     description: "Design appeal and emotional connection.",
//   },
// ];

// const allSteps = [
//   // TIER 1 — Core Functional Needs
//   {
//     id: "seats",
//     tier: "Tier 1 · Core Functional Needs",
//     title: "How many people / seats do you need?",
//     prompt: "How many people do you typically need to seat?",
//     type: "choice",
//     options: [
//       { value: "2", label: "2 seats", description: "sports cars, coupes" },
//       { value: "4", label: "4 seats", description: "compact cars, small SUVs" },
//       { value: "5", label: "5 seats", description: "most sedans & SUVs" },
//       { value: "6-7", label: "6–7 seats", description: "3-row SUVs, minivans" },
//       {
//         value: "8+",
//         label: "8+ seats",
//         description: "large SUVs, passenger vans",
//       },
//     ],
//   },
//   {
//     id: "cargo",
//     tier: "Tier 1 · Core Functional Needs",
//     title: "How much cargo space do you need?",
//     prompt: "How much cargo space do you need for luggage or gear?",
//     type: "choice",
//     options: [
//       {
//         value: "1-2",
//         label: "1–2 suitcases",
//         description: "10 cu-ft or less — small trunks, coupes",
//       },
//       {
//         value: "3-4",
//         label: "3–4 suitcases",
//         description: "11–20 cu-ft — sedans, small SUVs",
//       },
//       {
//         value: "5-6",
//         label: "5–6 suitcases",
//         description: "21–30 cu-ft — midsize SUVs",
//       },
//       {
//         value: "7-8",
//         label: "7–8 suitcases",
//         description: "31–40 cu-ft — large SUVs, wagons",
//       },
//       {
//         value: "9+",
//         label: "9+ suitcases",
//         description: "40+ cu-ft — minivans, full-size SUVs",
//       },
//     ],
//   },
//   {
//     id: "terrain",
//     tier: "Tier 1 · Core Functional Needs",
//     title: "Driving conditions",
//     prompt: "What kind of driving conditions do you face most often?",
//     type: "choice",
//     options: [
//       {
//         value: "city",
//         label: "Mostly city / suburban roads",
//         description: "FWD or RWD fine",
//       },
//       {
//         value: "snow",
//         label: "Snow or icy conditions",
//         description: "AWD preferred",
//       },
//       {
//         value: "hills",
//         label: "Steep hills or gravel roads",
//         description: "AWD or 4WD helpful",
//       },
//       {
//         value: "offroad",
//         label: "Regular off-roading",
//         description: "4WD strongly preferred",
//       },
//     ],
//   },
//   {
//     id: "towing",
//     tier: "Tier 1 · Core Functional Needs",
//     title: "Towing & utility",
//     prompt: "Do you need to tow or carry large items?",
//     type: "choice",
//     options: [
//       { value: "none", label: "No", description: "regular car or SUV is fine" },
//       {
//         value: "light",
//         label: "Some towing",
//         description: "up to 2,000 lbs (small trailer, jet ski)",
//       },
//       {
//         value: "medium",
//         label: "Moderate towing",
//         description: "2,000–5,000 lbs (small camper, boat)",
//       },
//       {
//         value: "heavy",
//         label: "Heavy towing",
//         description: "5,000+ lbs (large trailer or boat)",
//       },
//       {
//         value: "truck-bed",
//         label: "Need an open truck bed",
//         description: "pickup truck",
//       },
//     ],
//   },
//   {
//     id: "luxuryBrand",
//     tier: "Tier 1 · Core Functional Needs",
//     title: "Luxury vs. mainstream",
//     prompt: "Would you like to consider luxury brands?",
//     type: "choice",
//     options: [
//       {
//         value: "luxury",
//         label: "Yes — prefer a luxury brand",
//         description: "Audi, BMW, Lexus, Mercedes, etc.",
//       },
//       {
//         value: "mainstream",
//         label: "No — prefer mainstream brands",
//         description: "Toyota, Honda, Kia, Ford, etc.",
//       },
//     ],
//   },

//   // TIER 2 — Usage Pattern
//   {
//     id: "driveDaily",
//     tier: "Tier 2 · Usage Pattern",
//     title: "Daily driving",
//     prompt: "Do you typically drive every day?",
//     type: "choice",
//     options: [
//       { value: "yes", label: "Yes — I drive daily" },
//       { value: "no", label: "No — I don’t drive every day" },
//     ],
//   },
//   {
//     id: "tripsPerWeek",
//     tier: "Tier 2 · Usage Pattern",
//     title: "Weekly trips",
//     prompt: "How many trips do you usually take per week?",
//     type: "choice-with-other",
//     options: [
//       { value: "1-2", label: "1–2 trips" },
//       { value: "3-4", label: "3–4 trips" },
//       { value: "5-7", label: "5–7 trips" },
//       { value: "8-10", label: "8–10 trips" },
//       { value: "11-14", label: "11–14 trips" },
//     ],
//   },
//   {
//     id: "tripMinutes",
//     tier: "Tier 2 · Usage Pattern",
//     title: "Trip length",
//     prompt: "How long is a typical drive for you?",
//     type: "choice",
//     options: [
//       {
//         value: "10-15",
//         label: "10–15 min",
//         description: "short city commutes",
//       },
//       {
//         value: "20-30",
//         label: "20–30 min",
//         description: "average daily trips",
//       },
//       {
//         value: "45-60",
//         label: "45–60 min",
//         description: "longer commutes or suburban drives",
//       },
//       {
//         value: "60+",
//         label: "60+ min",
//         description: "extended travel or rural routes",
//       },
//     ],
//   },
//   {
//     id: "avgSpeed",
//     tier: "Tier 2 · Usage Pattern",
//     title: "Average speed",
//     prompt: "What’s your average driving speed?",
//     type: "choice",
//     options: [
//       { value: 25, label: "25 mph", description: "mostly city driving" },
//       { value: 35, label: "35 mph", description: "suburban mix" },
//       { value: 45, label: "45 mph", description: "mostly highway" },
//       { value: 55, label: "55+ mph", description: "long highway drives" },
//       { value: 30, label: "Not sure", description: "use default = 30 mph" },
//     ],
//   },

//   // TIER 3 — Ownership Structure
//   {
//     id: "ownershipMode",
//     tier: "Tier 3 · Ownership Structure",
//     title: "How will you get your next car?",
//     prompt: "How do you plan to get your next car?",
//     type: "choice",
//     options: [
//       {
//         value: "buy",
//         label: "Buy",
//         description: "Purchase outright or with a loan",
//       },
//       {
//         value: "lease",
//         label: "Lease",
//         description: "Lower payments, new car every few years",
//       },
//       {
//         value: "rent",
//         label: "Rent",
//         description: "Short-term or occasional use",
//       },
//     ],
//   },

//   // TIER 4 — Financial Constraints
//   {
//     id: "priceRange",
//     tier: "Tier 4 · Financial Constraints",
//     title: "Price range",
//     prompt: "What’s your price range?",
//     type: "price-range",
//     options: [
//       { value: "under-25", label: "Under $25,000", min: 0, max: 25000 },
//       { value: "25-35", label: "$25,000 – $35,000", min: 25000, max: 35000 },
//       { value: "35-50", label: "$35,000 – $50,000", min: 35000, max: 50000 },
//       { value: "50-75", label: "$50,000 – $75,000", min: 50000, max: 75000 },
//       { value: "over-75", label: "Over $75,000", min: 75000, max: null },
//       { value: "custom", label: "Other (enter a custom range)", custom: true },
//     ],
//   },
//   {
//     id: "fuelBudget",
//     tier: "Tier 4 · Financial Constraints",
//     title: "Monthly fuel / charging budget",
//     prompt: "How much would you like to spend per month on fuel or charging?",
//     type: "fuel-range",
//     options: [
//       { value: "under-100", label: "Under $100", min: 0, max: 100 },
//       { value: "100-200", label: "$100 – $200", min: 100, max: 200 },
//       { value: "200-300", label: "$200 – $300", min: 200, max: 300 },
//       { value: "over-300", label: "Over $300", min: 300, max: null },
//       { value: "custom", label: "Other (enter a custom range)", custom: true },
//     ],
//   },

//   // TIER 5 — Ownership Priorities (Ranking)
//   {
//     id: "priorities",
//     tier: "Tier 5 · Ownership Priorities",
//     title: "Rank what matters most in car ownership",
//     prompt:
//       "Drag and drop the items below to rank them — the one at the top is most important to you. Top = most important • Bottom = least important.",
//     type: "ranking",
//     items: priorityItems,
//   },
// ];

// // Helper: hide tripsPerWeek when driveDaily = "yes"
// const getVisibleSteps = (answers) =>
//   allSteps.filter((step) => {
//     if (step.id === "tripsPerWeek" && answers.driveDaily === "yes") {
//       return false;
//     }
//     return true;
//   });

// const QuizPage = () => {
//   const [answers, setAnswers] = useState({});
//   const [stepIndex, setStepIndex] = useState(0);

//   const [otherTrips, setOtherTrips] = useState("");
//   const [selectedPriceOption, setSelectedPriceOption] = useState(null);
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");
//   const [selectedFuelOption, setSelectedFuelOption] = useState(null);
//   const [fuelMin, setFuelMin] = useState("");
//   const [fuelMax, setFuelMax] = useState("");

//   const [priorityOrder, setPriorityOrder] = useState(
//     priorityItems.map((item) => item.id)
//   );
//   const [draggingId, setDraggingId] = useState(null);

//   const steps = getVisibleSteps(answers);
//   const currentStep = steps[stepIndex];
//   const totalSteps = steps.length;

//   // Keep stepIndex in bounds when driveDaily changes (tripsPerWeek may disappear)
//   useEffect(() => {
//     const visible = getVisibleSteps(answers);
//     if (stepIndex >= visible.length) {
//       setStepIndex(visible.length - 1);
//     }
//   }, [answers.driveDaily, stepIndex]);

//   // Sync local range states when entering those steps (optional but nicer UX)
//   useEffect(() => {
//     if (!currentStep) return;

//     if (currentStep.id === "priceRange") {
//       setPriceMin(
//         answers.price_min !== undefined ? String(answers.price_min) : ""
//       );
//       setPriceMax(
//         answers.price_max !== undefined ? String(answers.price_max) : ""
//       );
//     }

//     if (currentStep.id === "fuelBudget") {
//       setFuelMin(
//         answers.fuel_min !== undefined ? String(answers.fuel_min) : ""
//       );
//       setFuelMax(
//         answers.fuel_max !== undefined ? String(answers.fuel_max) : ""
//       );
//     }
//   }, [
//     currentStep,
//     answers.price_min,
//     answers.price_max,
//     answers.fuel_min,
//     answers.fuel_max,
//   ]);

//   const handleSelect = (stepId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [stepId]: value,
//     }));
//   };

//   const handlePriceOptionClick = (opt) => {
//     setSelectedPriceOption(opt.value);
//     if (!opt.custom) {
//       setPriceMin(opt.min != null ? String(opt.min) : "");
//       setPriceMax(opt.max != null ? String(opt.max) : "");
//       setAnswers((prev) => ({
//         ...prev,
//         price_min: opt.min,
//         price_max: opt.max,
//       }));
//     }
//   };

//   const handleFuelOptionClick = (opt) => {
//     setSelectedFuelOption(opt.value);
//     if (!opt.custom) {
//       setFuelMin(opt.min != null ? String(opt.min) : "");
//       setFuelMax(opt.max != null ? String(opt.max) : "");
//       setAnswers((prev) => ({
//         ...prev,
//         fuel_min: opt.min,
//         fuel_max: opt.max,
//       }));
//     }
//   };

//   const applyCustomPriceRange = () => {
//     if (!priceMin || !priceMax) return;
//     const minVal = Number(priceMin);
//     const maxVal = Number(priceMax);
//     if (Number.isNaN(minVal) || Number.isNaN(maxVal)) return;
//     setAnswers((prev) => ({
//       ...prev,
//       price_min: minVal,
//       price_max: maxVal,
//     }));
//   };

//   const applyCustomFuelRange = () => {
//     if (!fuelMin || !fuelMax) return;
//     const minVal = Number(fuelMin);
//     const maxVal = Number(fuelMax);
//     if (Number.isNaN(minVal) || Number.isNaN(maxVal)) return;
//     setAnswers((prev) => ({
//       ...prev,
//       fuel_min: minVal,
//       fuel_max: maxVal,
//     }));
//   };

//   const handleOtherTripsSubmit = () => {
//     if (otherTrips.trim()) {
//       handleSelect("tripsPerWeek", Number(otherTrips.trim()));
//     }
//   };

//   const handleNext = () => {
//     // Special handling for ranking step: save JSON when leaving this step
//     if (currentStep.id === "priorities") {
//       const ranks = {};
//       priorityOrder.forEach((id, idx) => {
//         ranks[id] = idx + 1;
//       });
//       setAnswers((prev) => ({
//         ...prev,
//         priority_order: priorityOrder,
//         priority_ranks: ranks,
//       }));
//     }

//     if (stepIndex < totalSteps - 1) {
//       setStepIndex(stepIndex + 1);
//     } else {
//       // Finished: here's your JSON
//       const finalAnswers = { ...answers };
//       // If finishing from ranking, make sure we capture latest ranking
//       if (currentStep.id === "priorities") {
//         const ranks = {};
//         priorityOrder.forEach((id, idx) => {
//           ranks[id] = idx + 1;
//         });
//         finalAnswers.priority_order = priorityOrder;
//         finalAnswers.priority_ranks = ranks;
//       }
//       console.log("Quiz answers:", finalAnswers);
//       alert("Quiz complete! Check the console for the JSON payload.");
//     }
//   };

//   const handleBack = () => {
//     if (stepIndex > 0) setStepIndex(stepIndex - 1);
//   };

//   const currentValue = currentStep ? answers[currentStep.id] : undefined;

//   const isNextDisabled = (() => {
//     if (!currentStep) return true;

//     if (currentStep.type === "choice") {
//       return currentValue == null;
//     }

//     if (currentStep.id === "tripsPerWeek") {
//       // Either a preset or a custom number is required
//       if (currentValue || otherTrips.trim()) return false;
//       return true;
//     }

//     if (currentStep.id === "priceRange") {
//       if (!selectedPriceOption) return true;
//       if (selectedPriceOption === "custom") {
//         return !(priceMin && priceMax);
//       }
//       return !(answers.price_min != null && answers.price_max != null);
//     }

//     if (currentStep.id === "fuelBudget") {
//       if (!selectedFuelOption) return true;
//       if (selectedFuelOption === "custom") {
//         return !(fuelMin && fuelMax);
//       }
//       return !(answers.fuel_min != null && answers.fuel_max != null);
//     }

//     if (currentStep.type === "ranking") {
//       // Always have a full order; we could enforce no duplicates but our state guarantees it
//       return false;
//     }

//     return false;
//   })();

//   // Drag & drop handlers for ranking
//   const handleDragStart = (id) => {
//     setDraggingId(id);
//   };

//   const handleDragOver = (e, overId) => {
//     e.preventDefault();
//     if (!draggingId || draggingId === overId) return;

//     setPriorityOrder((prevOrder) => {
//       const currentIndex = prevOrder.indexOf(draggingId);
//       const overIndex = prevOrder.indexOf(overId);
//       if (currentIndex === -1 || overIndex === -1) return prevOrder;

//       const newOrder = [...prevOrder];
//       newOrder.splice(currentIndex, 1);
//       newOrder.splice(overIndex, 0, draggingId);
//       return newOrder;
//     });
//   };

//   const handleDragEnd = () => {
//     setDraggingId(null);
//   };

//   if (!currentStep) return null;

//   const progressPercent = ((stepIndex + 1) / totalSteps) * 100;

//   return (
//     <div className="quiz-root">
//       <NavBar />

//       <main className="quiz-main">
//         {/* Progress */}
//         <div className="quiz-progress">
//           <div className="quiz-progress-top">
//             <span>
//               Question {stepIndex + 1} of {totalSteps}
//             </span>
//             {currentStep.tier && (
//               <span className="quiz-tier-label">{currentStep.tier}</span>
//             )}
//           </div>
//           <div className="quiz-progress-bar">
//             <div
//               className="quiz-progress-bar-fill"
//               style={{ width: `${progressPercent}%` }}
//             />
//           </div>
//         </div>

//         {/* Question */}
//         <section className="quiz-card">
//           <h2 className="quiz-title">{currentStep.title}</h2>
//           <p className="quiz-prompt">{currentStep.prompt}</p>

//           {/* Standard choice / choice-with-other */}
//           {(currentStep.type === "choice" ||
//             currentStep.type === "choice-with-other") && (
//             <div className="quiz-options">
//               {currentStep.options.map((opt) => {
//                 const selected = currentValue === opt.value;
//                 return (
//                   <button
//                     key={opt.value}
//                     type="button"
//                     className={`quiz-option ${selected ? "selected" : ""}`}
//                     onClick={() => handleSelect(currentStep.id, opt.value)}
//                   >
//                     <div className="quiz-option-label">{opt.label}</div>
//                     {opt.description && (
//                       <div className="quiz-option-desc">{opt.description}</div>
//                     )}
//                   </button>
//                 );
//               })}

//               {currentStep.id === "tripsPerWeek" && (
//                 <div className="quiz-other-row">
//                   <label className="quiz-other-label">
//                     Other:
//                     <input
//                       type="number"
//                       min="1"
//                       className="quiz-other-input"
//                       value={otherTrips}
//                       onChange={(e) => setOtherTrips(e.target.value)}
//                       onBlur={handleOtherTripsSubmit}
//                     />
//                     <span className="quiz-other-unit">trips/week</span>
//                   </label>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Price range */}
//           {currentStep.id === "priceRange" && (
//             <div className="quiz-options">
//               {currentStep.options.map((opt) => {
//                 const selected = selectedPriceOption === opt.value;
//                 return (
//                   <button
//                     key={opt.value}
//                     type="button"
//                     className={`quiz-option ${selected ? "selected" : ""}`}
//                     onClick={() => handlePriceOptionClick(opt)}
//                   >
//                     <div className="quiz-option-label">{opt.label}</div>
//                   </button>
//                 );
//               })}

//               {selectedPriceOption === "custom" && (
//                 <div className="quiz-other-row">
//                   <label className="quiz-other-label">
//                     Min:
//                     <input
//                       type="number"
//                       min="0"
//                       className="quiz-other-input"
//                       value={priceMin}
//                       onChange={(e) => setPriceMin(e.target.value)}
//                       onBlur={applyCustomPriceRange}
//                     />
//                   </label>
//                   <label className="quiz-other-label">
//                     Max:
//                     <input
//                       type="number"
//                       min="0"
//                       className="quiz-other-input"
//                       value={priceMax}
//                       onChange={(e) => setPriceMax(e.target.value)}
//                       onBlur={applyCustomPriceRange}
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Fuel budget */}
//           {currentStep.id === "fuelBudget" && (
//             <div className="quiz-options">
//               {currentStep.options.map((opt) => {
//                 const selected = selectedFuelOption === opt.value;
//                 return (
//                   <button
//                     key={opt.value}
//                     type="button"
//                     className={`quiz-option ${selected ? "selected" : ""}`}
//                     onClick={() => handleFuelOptionClick(opt)}
//                   >
//                     <div className="quiz-option-label">{opt.label}</div>
//                   </button>
//                 );
//               })}

//               {selectedFuelOption === "custom" && (
//                 <div className="quiz-other-row">
//                   <label className="quiz-other-label">
//                     Min:
//                     <input
//                       type="number"
//                       min="0"
//                       className="quiz-other-input"
//                       value={fuelMin}
//                       onChange={(e) => setFuelMin(e.target.value)}
//                       onBlur={applyCustomFuelRange}
//                     />
//                   </label>
//                   <label className="quiz-other-label">
//                     Max:
//                     <input
//                       type="number"
//                       min="0"
//                       className="quiz-other-input"
//                       value={fuelMax}
//                       onChange={(e) => setFuelMax(e.target.value)}
//                       onBlur={applyCustomFuelRange}
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Ranking step */}
//           {currentStep.type === "ranking" && (
//             <div className="quiz-ranking">
//               <ul className="quiz-ranking-list">
//                 {priorityOrder.map((id, idx) => {
//                   const item = priorityItems.find((p) => p.id === id);
//                   if (!item) return null;
//                   return (
//                     <li
//                       key={id}
//                       className={`quiz-ranking-item ${
//                         draggingId === id ? "dragging" : ""
//                       }`}
//                       draggable
//                       onDragStart={() => handleDragStart(id)}
//                       onDragOver={(e) => handleDragOver(e, id)}
//                       onDragEnd={handleDragEnd}
//                     >
//                       <div className="quiz-ranking-handle">≡</div>
//                       <div className="quiz-ranking-content">
//                         <div className="quiz-ranking-header">
//                           <span className="quiz-ranking-index">{idx + 1}</span>
//                           <span className="quiz-ranking-label">
//                             {item.label}
//                           </span>
//                         </div>
//                         <div className="quiz-ranking-desc">
//                           {item.description}
//                         </div>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}

//           {/* Navigation */}
//           <div className="quiz-actions">
//             <button
//               type="button"
//               className="quiz-nav-button secondary"
//               onClick={handleBack}
//               disabled={stepIndex === 0}
//             >
//               Back
//             </button>
//             <button
//               type="button"
//               className="quiz-nav-button primary"
//               onClick={handleNext}
//               disabled={isNextDisabled}
//             >
//               {stepIndex === totalSteps - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         </section>
//         {/* Debug: show JSON answers */}
//         {/* <section className="quiz-json">
//           <h3>Current answers JSON (for dev):</h3>
//           <pre>{JSON.stringify(answers, null, 2)}</pre>
//         </section> */}
//       </main>
//     </div>
//   );
// };

// export default QuizPage;

import React, { useState, useEffect } from "react";
import "./quizpage.css";
import NavBar from "./navbar";

const priorityItems = [
  {
    id: "A_storage",
    label: "Storage capacity",
    description: "Space for passengers, luggage, and daily gear.",
  },
  {
    id: "B_driving",
    label: "Driving experience",
    description: "How it feels to drive — power, handling, responsiveness.",
  },
  {
    id: "C_comfort",
    label: "Comfort",
    description: "Seat support, ride smoothness, and cabin quietness.",
  },
  {
    id: "D_tech",
    label: "Technology",
    description: "Infotainment, connectivity, and driver assistance features.",
  },
  {
    id: "E_owner",
    label: "Owner satisfaction",
    description: "Real-world reliability and ratings from other owners.",
  },
  {
    id: "F_style",
    label: "Style / X-Factor",
    description: "Design appeal and emotional connection.",
  },
];

const allSteps = [
  // TIER 1 — Core Functional Needs
  {
    id: "seats",
    tier: "Tier 1 · Core Functional Needs",
    title: "How many people / seats do you need?",
    prompt: "How many people do you typically need to seat?",
    type: "choice",
    options: [
      { value: "2", label: "2 seats", description: "sports cars, coupes" },
      { value: "4", label: "4 seats", description: "compact cars, small SUVs" },
      { value: "5", label: "5 seats", description: "most sedans & SUVs" },
      { value: "6-7", label: "6–7 seats", description: "3-row SUVs, minivans" },
      {
        value: "8+",
        label: "8+ seats",
        description: "large SUVs, passenger vans",
      },
    ],
  },
  {
    id: "cargo",
    tier: "Tier 1 · Core Functional Needs",
    title: "How much cargo space do you need?",
    prompt: "How much cargo space do you need for luggage or gear?",
    type: "choice",
    options: [
      {
        value: "1-2",
        label: "1–2 suitcases",
        description: "10 cu-ft — small trunks, coupes",
      },
      {
        value: "3-4",
        label: "3–4 suitcases",
        description: "11–20 cu-ft — sedans, small SUVs",
      },
      {
        value: "5-6",
        label: "5–6 suitcases",
        description: "21–30 cu-ft — midsize SUVs",
      },
      {
        value: "7-8",
        label: "7–8 suitcases",
        description: "31–40 cu-ft — large SUVs, wagons",
      },
      {
        value: "9+",
        label: "9+ suitcases",
        description: "40+ cu-ft — minivans, full-size SUVs",
      },
    ],
  },
  {
    id: "terrain",
    tier: "Tier 1 · Core Functional Needs",
    title: "Driving conditions",
    prompt: "What kind of driving conditions do you face most often?",
    type: "choice",
    options: [
      {
        value: "city",
        label: "Mostly city / suburban roads",
        description: "FWD or RWD fine",
      },
      {
        value: "snow",
        label: "Snow or icy conditions",
        description: "AWD preferred",
      },
      {
        value: "hills",
        label: "Steep hills or gravel roads",
        description: "AWD or 4WD helpful",
      },
      {
        value: "offroad",
        label: "Regular off-roading",
        description: "4WD strongly preferred",
      },
    ],
  },
  {
    id: "towing",
    tier: "Tier 1 · Core Functional Needs",
    title: "Towing & utility",
    prompt: "Do you need to tow or carry large items?",
    type: "choice",
    options: [
      { value: "none", label: "No", description: "regular car or SUV is fine" },
      {
        value: "light",
        label: "Some towing",
        description: "up to 2,000 lbs (small trailer, jet ski)",
      },
      {
        value: "medium",
        label: "Moderate towing",
        description: "2,000–5,000 lbs (small camper, boat)",
      },
      {
        value: "heavy",
        label: "Heavy towing",
        description: "5,000+ lbs (large trailer or boat)",
      },
      {
        value: "truck-bed",
        label: "Need an open truck bed",
        description: "pickup truck",
      },
    ],
  },
  {
    id: "luxuryBrand",
    tier: "Tier 1 · Core Functional Needs",
    title: "Luxury vs. mainstream",
    prompt: "Would you like to consider luxury brands?",
    type: "choice",
    options: [
      {
        value: "luxury",
        label: "Yes — prefer a luxury brand",
        description: "Audi, BMW, Lexus, Mercedes, etc.",
      },
      {
        value: "mainstream",
        label: "No — prefer mainstream brands",
        description: "Toyota, Honda, Kia, Ford, etc.",
      },
    ],
  },

  // TIER 2 — Usage Pattern
  {
    id: "driveDaily",
    tier: "Tier 2 · Usage Pattern",
    title: "Daily driving",
    prompt: "Do you typically drive every day?",
    type: "choice",
    options: [
      { value: "yes", label: "Yes — I drive daily" },
      { value: "no", label: "No — I don’t drive every day" },
    ],
  },
  {
    id: "tripsPerWeek",
    tier: "Tier 2 · Usage Pattern",
    title: "Weekly trips",
    prompt: "How many trips do you usually take per week?",
    type: "choice-with-other",
    options: [
      { value: "1-2", label: "1–2 trips" },
      { value: "3-4", label: "3–4 trips" },
      { value: "5-7", label: "5–7 trips" },
      { value: "8-10", label: "8–10 trips" },
      { value: "11-14", label: "11–14 trips" },
    ],
  },
  {
    id: "tripMinutes",
    tier: "Tier 2 · Usage Pattern",
    title: "Trip length",
    prompt: "How long is a typical drive for you?",
    type: "choice",
    options: [
      {
        value: "10-15",
        label: "10–15 min",
        description: "short city commutes",
      },
      {
        value: "20-30",
        label: "20–30 min",
        description: "average daily trips",
      },
      {
        value: "45-60",
        label: "45–60 min",
        description: "longer commutes or suburban drives",
      },
      {
        value: "60+",
        label: "60+ min",
        description: "extended travel or rural routes",
      },
    ],
  },
  {
    id: "avgSpeed",
    tier: "Tier 2 · Usage Pattern",
    title: "Average speed",
    prompt: "What’s your average driving speed?",
    type: "choice",
    options: [
      { value: 25, label: "25 mph", description: "mostly city driving" },
      { value: 35, label: "35 mph", description: "suburban mix" },
      { value: 45, label: "45 mph", description: "mostly highway" },
      { value: 55, label: "55+ mph", description: "long highway drives" },
      { value: 30, label: "Not sure", description: "use default = 30 mph" },
    ],
  },

  // TIER 3 — Ownership Structure
  {
    id: "ownershipMode",
    tier: "Tier 3 · Ownership Structure",
    title: "How will you get your next car?",
    prompt: "How do you plan to get your next car?",
    type: "choice",
    options: [
      {
        value: "buy",
        label: "Buy",
        description: "Purchase outright or with a loan",
      },
      {
        value: "lease",
        label: "Lease",
        description: "Lower payments, new car every few years",
      },
      {
        value: "rent",
        label: "Rent",
        description: "Short-term or occasional use",
      },
    ],
  },

  // TIER 4 — Financial Constraints
  {
    id: "priceRange",
    tier: "Tier 4 · Financial Constraints",
    title: "Price range",
    prompt: "What’s your price range?",
    type: "price-range",
    options: [
      { value: "under-25", label: "Under $25,000", min: 0, max: 25000 },
      { value: "25-35", label: "$25,000 – $35,000", min: 25000, max: 35000 },
      { value: "35-50", label: "$35,000 – $50,000", min: 35000, max: 50000 },
      { value: "50-75", label: "$50,000 – $75,000", min: 50000, max: 75000 },
      { value: "over-75", label: "Over $75,000", min: 75000, max: null },
      { value: "custom", label: "Other (enter a custom range)", custom: true },
    ],
  },
  {
    id: "fuelBudget",
    tier: "Tier 4 · Financial Constraints",
    title: "Monthly fuel / charging budget",
    prompt: "How much would you like to spend per month on fuel or charging?",
    type: "fuel-range",
    options: [
      { value: "under-100", label: "Under $100", min: 0, max: 100 },
      { value: "100-200", label: "$100 – $200", min: 100, max: 200 },
      { value: "200-300", label: "$200 – $300", min: 200, max: 300 },
      { value: "over-300", label: "Over $300", min: 300, max: null },
      { value: "custom", label: "Other (enter a custom range)", custom: true },
    ],
  },

  // TIER 5 — Ownership Priorities (Ranking)
  {
    id: "priorities",
    tier: "Tier 5 · Ownership Priorities",
    title: "Rank what matters most in car ownership",
    prompt:
      "Drag and drop the items below to rank them — the one at the top is most important to you. Top = most important • Bottom = least important.",
    type: "ranking",
    items: priorityItems,
  },
];

// Helper: hide tripsPerWeek when driveDaily = "yes"
const getVisibleSteps = (answers) =>
  allSteps.filter((step) => {
    if (step.id === "tripsPerWeek" && answers.driveDaily === "yes") {
      return false;
    }
    return true;
  });

const QuizPage = () => {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);

  const [otherTrips, setOtherTrips] = useState("");
  const [selectedPriceOption, setSelectedPriceOption] = useState(null);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedFuelOption, setSelectedFuelOption] = useState(null);
  const [fuelMin, setFuelMin] = useState("");
  const [fuelMax, setFuelMax] = useState("");

  const [priorityOrder, setPriorityOrder] = useState(
    priorityItems.map((item) => item.id)
  );
  const [draggingId, setDraggingId] = useState(null);

  const steps = getVisibleSteps(answers);
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  // Keep stepIndex in bounds when driveDaily changes (tripsPerWeek may disappear)
  useEffect(() => {
    const visible = getVisibleSteps(answers);
    if (stepIndex >= visible.length) {
      setStepIndex(visible.length - 1);
    }
  }, [answers.driveDaily, stepIndex]);

  // Sync local range states when entering those steps
  useEffect(() => {
    if (!currentStep) return;

    if (currentStep.id === "priceRange") {
      setPriceMin(
        answers.price_min !== undefined ? String(answers.price_min) : ""
      );
      setPriceMax(
        answers.price_max !== undefined ? String(answers.price_max) : ""
      );
    }

    if (currentStep.id === "fuelBudget") {
      setFuelMin(
        answers.fuel_min !== undefined ? String(answers.fuel_min) : ""
      );
      setFuelMax(
        answers.fuel_max !== undefined ? String(answers.fuel_max) : ""
      );
    }
  }, [
    currentStep,
    answers.price_min,
    answers.price_max,
    answers.fuel_min,
    answers.fuel_max,
  ]);

  const handleSelect = (stepId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [stepId]: value,
    }));
  };

  const handlePriceOptionClick = (opt) => {
    setSelectedPriceOption(opt.value);
    if (!opt.custom) {
      setPriceMin(opt.min != null ? String(opt.min) : "");
      setPriceMax(opt.max != null ? String(opt.max) : "");
      setAnswers((prev) => ({
        ...prev,
        price_min: opt.min,
        price_max: opt.max,
      }));
    }
  };

  const handleFuelOptionClick = (opt) => {
    setSelectedFuelOption(opt.value);
    if (!opt.custom) {
      setFuelMin(opt.min != null ? String(opt.min) : "");
      setFuelMax(opt.max != null ? String(opt.max) : "");
      setAnswers((prev) => ({
        ...prev,
        fuel_min: opt.min,
        fuel_max: opt.max,
      }));
    }
  };

  const applyCustomPriceRange = () => {
    if (!priceMin || !priceMax) return;
    const minVal = Number(priceMin);
    const maxVal = Number(priceMax);
    if (Number.isNaN(minVal) || Number.isNaN(maxVal)) return;
    setAnswers((prev) => ({
      ...prev,
      price_min: minVal,
      price_max: maxVal,
    }));
  };

  const applyCustomFuelRange = () => {
    if (!fuelMin || !fuelMax) return;
    const minVal = Number(fuelMin);
    const maxVal = Number(fuelMax);
    if (Number.isNaN(minVal) || Number.isNaN(maxVal)) return;
    setAnswers((prev) => ({
      ...prev,
      fuel_min: minVal,
      fuel_max: maxVal,
    }));
  };

  const handleOtherTripsSubmit = () => {
    if (otherTrips.trim()) {
      handleSelect("tripsPerWeek", Number(otherTrips.trim()));
    }
  };

  const handleNext = () => {
    // Special handling for ranking step: save JSON when leaving this step
    if (currentStep.id === "priorities") {
      const ranks = {};
      priorityOrder.forEach((id, idx) => {
        ranks[id] = idx + 1;
      });
      setAnswers((prev) => ({
        ...prev,
        priority_order: priorityOrder,
        priority_ranks: ranks,
      }));
    }

    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      const finalAnswers = { ...answers };
      if (currentStep.id === "priorities") {
        const ranks = {};
        priorityOrder.forEach((id, idx) => {
          ranks[id] = idx + 1;
        });
        finalAnswers.priority_order = priorityOrder;
        finalAnswers.priority_ranks = ranks;
      }
      console.log("Quiz answers:", finalAnswers);
      alert("Quiz complete! Check the console for the JSON payload.");
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const currentValue = currentStep ? answers[currentStep.id] : undefined;

  const isNextDisabled = (() => {
    if (!currentStep) return true;

    if (currentStep.type === "choice") {
      return currentValue == null;
    }

    if (currentStep.id === "tripsPerWeek") {
      if (currentValue || otherTrips.trim()) return false;
      return true;
    }

    if (currentStep.id === "priceRange") {
      if (!selectedPriceOption) return true;
      if (selectedPriceOption === "custom") {
        return !(priceMin && priceMax);
      }
      return !(answers.price_min != null && answers.price_max != null);
    }

    if (currentStep.id === "fuelBudget") {
      if (!selectedFuelOption) return true;
      if (selectedFuelOption === "custom") {
        return !(fuelMin && fuelMax);
      }
      return !(answers.fuel_min != null && answers.fuel_max != null);
    }

    if (currentStep.type === "ranking") {
      return false;
    }

    return false;
  })();

  // Drag & drop handlers for ranking
  const handleDragStart = (id) => {
    setDraggingId(id);
  };

  const handleDragOver = (e, overId) => {
    e.preventDefault();
    if (!draggingId || draggingId === overId) return;

    setPriorityOrder((prevOrder) => {
      const currentIndex = prevOrder.indexOf(draggingId);
      const overIndex = prevOrder.indexOf(overId);
      if (currentIndex === -1 || overIndex === -1) return prevOrder;

      const newOrder = [...prevOrder];
      newOrder.splice(currentIndex, 1);
      newOrder.splice(overIndex, 0, draggingId);
      return newOrder;
    });
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  if (!currentStep) return null;

  const progressPercent = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <div className="quiz-root">
      <NavBar />

      <main className="quiz-main">
        <div className="quiz-shell">
          <section className="quiz-card">
            {/* Progress bar like the screenshot */}
            <div className="quiz-progress">
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="quiz-header">
              <div className="quiz-header-top">
                <span className="quiz-step-label">
                  Question {stepIndex + 1} of {totalSteps}
                </span>
                {currentStep.tier && (
                  <span className="quiz-tier-label">{currentStep.tier}</span>
                )}
              </div>
              {/* Big question text */}
              <h1 className="quiz-question">{currentStep.prompt}</h1>
            </div>

            {/* Standard choice / choice-with-other */}
            {(currentStep.type === "choice" ||
              currentStep.type === "choice-with-other") && (
              <div className="quiz-options">
                {currentStep.options.map((opt) => {
                  const selected = currentValue === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option ${selected ? "selected" : ""}`}
                      onClick={() => handleSelect(currentStep.id, opt.value)}
                    >
                      <span className="quiz-option-radio" />
                      <div className="quiz-option-text">
                        <span className="quiz-option-main">{opt.label}</span>
                        {opt.description && (
                          <span className="quiz-option-desc">
                            {opt.description}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}

                {currentStep.id === "tripsPerWeek" && (
                  <div className="quiz-other-row">
                    <label className="quiz-other-label">
                      Other:
                      <input
                        type="number"
                        min="1"
                        className="quiz-other-input"
                        value={otherTrips}
                        onChange={(e) => setOtherTrips(e.target.value)}
                        onBlur={handleOtherTripsSubmit}
                      />
                      <span className="quiz-other-unit">trips/week</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Price range */}
            {currentStep.id === "priceRange" && (
              <div className="quiz-options">
                {currentStep.options.map((opt) => {
                  const selected = selectedPriceOption === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option ${selected ? "selected" : ""}`}
                      onClick={() => handlePriceOptionClick(opt)}
                    >
                      <span className="quiz-option-radio" />
                      <div className="quiz-option-text">
                        <span className="quiz-option-main">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}

                {selectedPriceOption === "custom" && (
                  <div className="quiz-range-row">
                    <label className="quiz-other-label">
                      Min:
                      <input
                        type="number"
                        min="0"
                        className="quiz-other-input"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        onBlur={applyCustomPriceRange}
                      />
                    </label>
                    <label className="quiz-other-label">
                      Max:
                      <input
                        type="number"
                        min="0"
                        className="quiz-other-input"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        onBlur={applyCustomPriceRange}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Fuel budget */}
            {currentStep.id === "fuelBudget" && (
              <div className="quiz-options">
                {currentStep.options.map((opt) => {
                  const selected = selectedFuelOption === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option ${selected ? "selected" : ""}`}
                      onClick={() => handleFuelOptionClick(opt)}
                    >
                      <span className="quiz-option-radio" />
                      <div className="quiz-option-text">
                        <span className="quiz-option-main">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}

                {selectedFuelOption === "custom" && (
                  <div className="quiz-range-row">
                    <label className="quiz-other-label">
                      Min:
                      <input
                        type="number"
                        min="0"
                        className="quiz-other-input"
                        value={fuelMin}
                        onChange={(e) => setFuelMin(e.target.value)}
                        onBlur={applyCustomFuelRange}
                      />
                    </label>
                    <label className="quiz-other-label">
                      Max:
                      <input
                        type="number"
                        min="0"
                        className="quiz-other-input"
                        value={fuelMax}
                        onChange={(e) => setFuelMax(e.target.value)}
                        onBlur={applyCustomFuelRange}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Ranking step */}
            {currentStep.type === "ranking" && (
              <div className="quiz-ranking">
                <p className="quiz-ranking-help">
                  Top = most important • Bottom = least important.
                </p>
                <ul className="quiz-ranking-list">
                  {priorityOrder.map((id, idx) => {
                    const item = priorityItems.find((p) => p.id === id);
                    if (!item) return null;
                    return (
                      <li
                        key={id}
                        className={`quiz-ranking-item ${
                          draggingId === id ? "dragging" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(id)}
                        onDragOver={(e) => handleDragOver(e, id)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="quiz-ranking-handle">≡</div>
                        <div className="quiz-ranking-content">
                          <div className="quiz-ranking-header">
                            <span className="quiz-ranking-index">
                              {idx + 1}
                            </span>
                            <span className="quiz-ranking-label">
                              {item.label}
                            </span>
                          </div>
                          <div className="quiz-ranking-desc">
                            {item.description}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Navigation */}
            <div className="quiz-actions">
              <button
                type="button"
                className="quiz-back-link"
                onClick={handleBack}
                disabled={stepIndex === 0}
              >
                ← Back
              </button>
              <button
                type="button"
                className="quiz-nav-button primary"
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                {stepIndex === totalSteps - 1 ? "See results" : "Continue →"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
