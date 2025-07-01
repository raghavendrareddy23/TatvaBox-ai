import axios from "axios";

const api = axios.create({
  baseURL:"https://tatvabox-ai.onrender.com"
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('Token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;