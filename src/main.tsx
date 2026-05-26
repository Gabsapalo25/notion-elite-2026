import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4"; // Importa a biblioteca
import "./index.css";
import { App } from "./App";

// Inicializa o Google Analytics com o ID CORRETO
ReactGA.initialize("G-2RC890ZE3S");  // ⬅️ TROCOU AQUI

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);