import React, { useState } from "react";
import Login from "../components/login";
import Signup from "../components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/bg-img.png";
import Header from "../components/header";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
        <Header/>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="bg-white/10 p-8 rounded-xl text-white w-80 shadow-lg">
          {isLogin ? <Login /> : <Signup />}
          <p
            className="mt-4 text-sm text-center text-gray-300 cursor-pointer underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
