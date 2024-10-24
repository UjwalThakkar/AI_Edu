import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="Chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
