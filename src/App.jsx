import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { Route, Routes } from "react-router-dom";
import Subject from "./pages/Subject";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Subject" element={<Subject />} />
      </Routes>
    </>
  );
};

export default App;
