import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RecommendationForm from "./pages/RecommendationForm";
import GetStartedPage from "./pages/GetStartedPage";
import ResultPage from "./pages/ResultPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ThankYouPage from "./pages/ThankYouPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("rudralife_admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<GetStartedPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/recommendation" element={<RecommendationForm />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
