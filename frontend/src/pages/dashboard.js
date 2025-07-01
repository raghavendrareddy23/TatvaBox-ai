import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import api from "../API/api";

function Dashboard() {
  const navigate = useNavigate();

  const handleDrawTatva = async () => {
    try {
      const res = await api.get("/tatva/random");
      const randomTatva = res.data;
      navigate(`/tatva/${randomTatva._id}`);
    } catch (err) {
      console.error("Failed to fetch Tatva", err);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Discover Your Elemental Essence
        </h1>
        <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
          Click the button below to reveal a random Tatva and explore its unique wisdom.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleDrawTatva}
          className="bg-orange-500 text-white px-6 py-3 text-xl rounded-lg hover:bg-orange-600 shadow-lg"
        >
          Draw a Tatva
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
