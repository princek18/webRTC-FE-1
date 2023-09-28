import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./AppRoutes.jsx";
import "./assets/styles/index.scss";

// export const baseUrl = "http://localhost:3000";

export const baseUrl = "https://webrtc-be.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
