import { useContext } from "react";
import { AxiosContext } from "../context/AxiosContext";
import type { AxiosInstance } from "axios";

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios debe usarse dentro de un AxiosProvider");
  }
  return context;
};
