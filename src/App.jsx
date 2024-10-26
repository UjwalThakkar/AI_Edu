import React, { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import { useStateProvider } from "./lib/stateContext";
import { reducerCases } from "./lib/constants";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Subject from "./pages/Subject";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  const [, dispatch] = useStateProvider();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch({
  //         type: reducerCases.SET_USER_INFO,
  //         userInformation: { uid: user.uid, email: user.email },
  //       });
  //     } else {
  //       dispatch({ type: reducerCases.SET_USER_INFO, userInformation: null });
  //       console.log("user logged out for some reason")
  //     }
  //   });
  //   return unsubscribe;
  // }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Subject/:subjectName"
          element={
            <ProtectedRoute>
              <Subject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
