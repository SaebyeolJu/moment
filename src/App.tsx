import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Collection from "./pages/Collection";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/info" element={<Info />} />
      {/* <Route path="/collection/:id" element={<Collection />} /> */}
      {/* <Route path="/info/:id" element={<MyInfo />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
