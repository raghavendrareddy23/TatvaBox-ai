import React, { useState } from "react";
import { toast } from "react-toastify";
import {MiniLoader} from "./loader";
import api from "../API/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      sessionStorage.setItem("Token", res.data.token);
      sessionStorage.setItem("Username", JSON.stringify(res.data.username));
      sessionStorage.setItem("Role", JSON.stringify(res.data.role));
      toast.success("Login successful");
    //   console.log("Login success:", res.data);
      navigate('/')
    } catch (err) {
      // console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <MiniLoader />;

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={formData.username}
        onChange={handleChange}
        required
        className="p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
      >
        {loading ? (
              <MiniLoader />
            ) : (
              "Login"
            )}
      </button>
    </form>
  );
}

export default Login;
