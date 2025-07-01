import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/authentication";
import Dashboard from "./pages/dashboard";
import bg from "./assets/bg-img.png";
import "react-toastify/dist/ReactToastify.css";
import TatvaPage from "./components/tatvaCard";
import CreateTatva from "./components/createTatva";
import PageNotFound from "./pages/pageNotFound";

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tatva/:id" element={<TatvaPage />} />
          <Route path="/tatva/create" element={<CreateTatva />} />
          <Route path="/tatva/update/:id" element={<CreateTatva />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
