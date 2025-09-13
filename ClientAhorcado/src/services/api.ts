import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5032/", // Cambia esta URL por la de tu backend
});

export default api;
