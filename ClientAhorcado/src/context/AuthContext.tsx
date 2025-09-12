import { createContext, useContext, ReactNode } from "react";
import api from "../services/api";
import type { AxiosInstance } from "axios";

const AxiosContext = createContext<AxiosInstance | null>(null);

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  return <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>;
};

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios debe usarse dentro de un AxiosProvider");
  }
  return context;
};
