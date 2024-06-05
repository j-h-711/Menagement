import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import MainPage from "./page/MainPage/MainPage";

function App() {
  const [user, setUser] = useState("admin");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/main" element={<MainPage user={user}></MainPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
