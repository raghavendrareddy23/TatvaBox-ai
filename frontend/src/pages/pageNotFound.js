import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black/80 text-white px-4">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
