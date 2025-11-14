import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import QuizPage from "./pages/quizpage";
import LoadingPage from "./pages/loadingpage";
import ResultPage from "./pages/resultpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
