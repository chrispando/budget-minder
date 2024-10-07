// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import PayPeriods from "./components/PayPeriods/PayPeriods";
import Income from "./components/Income/Income";
import Header from "./components/Header/Header";

function App() {
  const [totalIncome, setTotalIncome] = useState(0);
  return (
    <Router>
      <div>
        {/* Include Header at the top */}
        <Header />
        <Routes>
          <Route path="/" element={<Home income={totalIncome} />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route
            path="/income"
            element={<Income setTotalIncome={setTotalIncome} />}
          />
          <Route path="/pay-periods" element={<PayPeriods />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
