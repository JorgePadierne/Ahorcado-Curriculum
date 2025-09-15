import axios from "axios";

const api = axios.create({
  baseURL: "https://ahorcado-curriculum.onrender.com", // Cambia esta URL por la de tu backend
});

export default api;
