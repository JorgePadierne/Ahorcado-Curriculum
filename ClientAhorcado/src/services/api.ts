import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Cambia esta URL por la de tu backend
});

export default api;
