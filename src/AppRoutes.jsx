/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import { Contacts } from "./Components/Contacts";
import { AppContext } from "./Context/AppContext";
import { io } from "socket.io-client";

export let socket;
// export const url = "http://localhost:3000";

export const url = "https://webrtc-be.onrender.com";

if (sessionStorage.getItem("AuthToken")) {
  socket = io(url, {
    query: { authToken: sessionStorage.getItem("AuthToken") },
  });
}

window.onbeforeunload = () => {
  socket.disconnect();
};

export const AppRoutes = () => {
  const AuthRoute = ({ children }) => {
    if (!sessionStorage.getItem("AuthToken")) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Contacts />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/contacts"
            element={
              <AuthRoute>
                <Contacts />
              </AuthRoute>
            }
          />
          <Route
            path="*"
            element={
              <AuthRoute>
                <Navigate to="/contacts" />
              </AuthRoute>
            }
          />
          <Route
            path="/*"
            element={
              <AuthRoute>
                <Navigate to="/contacts" />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
};
