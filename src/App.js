// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import PayPeriods from "./components/PayPeriods/PayPeriods";
import Income from "./components/Income/Income";
import Header from "./components/Header/Header";

function App() {
  const [payPeriodList, setPayPeriodList] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState({
    salary: 0,
    pay_periods: 0,
    other: 0,
  });
  // Function to update income in the App-level state
  const updateIncome = (newIncome) => {
    setTotalIncome(newIncome);
  };

  return (
    <Router>
      <div>
        {/* Include Header at the top */}
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home income={totalIncome} expenses={expenses} />}
          />
          <Route
            path="/expenses"
            element={<Expenses expenses={expenses} setExpenses={setExpenses} />}
          />
          <Route
            path="/income"
            element={
              <Income
                payPeriods={payPeriodList}
                totalIncome={totalIncome}
                setTotalIncome={updateIncome}
              />
            }
          />
          <Route
            path="/pay-periods"
            element={
              <PayPeriods
                payPeriodList={payPeriodList}
                setPayPeriodList={setPayPeriodList} // Correctly pass setPayPeriodList
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
