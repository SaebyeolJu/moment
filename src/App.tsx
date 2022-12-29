import "./styles/_main.scss";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/SignUp";
import Collection from "./pages/Collection";
import MyInfo from "./pages/MyInfo";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element="/">
        <Landing />
      </Route>

      <Route element="/login">
        <Login />
      </Route>

      <Route element="/collection/:id">
        <Collection />
      </Route>

      <Route element="/myInfo">
        <MyInfo />
      </Route>

      <Route element="/signUp">
        <SignUp />
      </Route>

      <Route element="*">
        <NotFound />
      </Route>
    </Routes>
  );
}

export default App;
