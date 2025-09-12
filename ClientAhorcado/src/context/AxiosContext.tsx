import { type ReactNode } from "react";
import { AxiosContext } from "./AxiosContext";
import api from "../services/api";

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  return <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>;
};
