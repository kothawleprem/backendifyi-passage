import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Dashboard from "./Dashboard/Pages/dashboard";
import Emailbox from "./EmailBox/Pages/Emailbox/Emailbox";
import Instant from "./EmailBox/Pages/Instant";
import EmailboxDoc from "./Documentation/EmailBox/EmailboxDoc";
import PassageLogin from "./Passage/PassageLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emailbox" element={<Emailbox/>}/>
        <Route path="/emailbox/instant" element={<Instant/>} />
        <Route path="/emailbox/documentation" element={<EmailboxDoc/>} />
        <Route path="/login" element={<PassageLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
