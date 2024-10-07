// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import PayPeriods from "./components/PayPeriods/PayPeriods";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/pay-periods">Pay Periods</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/pay-periods" element={<PayPeriods />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
