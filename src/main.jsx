import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./lib/stateContext.jsx";
import reducer, { initialState } from "./lib/useReducer.js";

const currentUser = true;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Router>{currentUser ? <App /> : <Login />}</Router> */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </StrictMode>
);
