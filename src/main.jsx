import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";

const currentUser = true;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Router>{currentUser ? <App /> : <Login />}</Router> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
