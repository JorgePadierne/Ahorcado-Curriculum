import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { AxiosProvider } from "./context/AxiosContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AxiosProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AxiosProvider>
);
