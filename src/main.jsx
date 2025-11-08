import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//mport App from "./App.jsx";
import AppForOtherLearn from "./AppForOtherLearn.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppForOtherLearn />
  </StrictMode>
);
