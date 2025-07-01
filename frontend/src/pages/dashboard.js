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
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
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
