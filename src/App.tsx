import React, { useContext, useReducer } from "react";

import { Route, Routes } from "react-router-dom";

import { AuthContext, authReducer, initialState } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Setting from "./pages/Setting";
import Friends from "./pages/Friends";
import FrameEdit from "./pages/FrameEdit";
import ImageEdit from "./components/FrameEditForm/ImageEditor";
import PrivateRoutes from "./utils/PrivateRoutes";

export function App() {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state: authState, dispatch }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit" element={<FrameEdit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
