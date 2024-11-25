import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { CarProvider } from "./context/CarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CarProvider>
      <App />
    </CarProvider>
  </StrictMode>
);
