import { useState } from "react";
import NavBar from "./components/NavBar";
import { Body } from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element = {<Feed/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/profile" element = {<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
