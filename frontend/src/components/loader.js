import React from "react";
import bg from "../assets/bg-img.png";

export const Loader = () => (
  <div
    className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100%",
      width: "100%",
    }}
  >
    <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
  </div>
);

export const MiniLoader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
    <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
  </div>
);
