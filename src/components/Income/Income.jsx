// src/components/Income.jsx
import React, { useState, useEffect } from "react";
import "./Income.css";

function Income({ payPeriods, setTotalIncome }) {
  const [income, setIncome] = useState({
    salary: 0,
    pay_periods: 0,
    other: 0,
  });

  // Calculate total income whenever any income source is updated
  useEffect(() => {
    const total = Object.values(income).reduce(
      (acc, val) => acc + Number(val),
      0
    );
    setTotalIncome(total + payPeriods);
  }, [income, setTotalIncome]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  return (
    <div className="income">
      <h2>Enter Your Income Sources</h2>
      <form>
        <div className="income-input">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={income.salary}
            onChange={handleInputChange}
            placeholder="$0.00"
          />
        </div>

        <div className="income-input">
          <label>Pay Periods:</label>
          <input
            type="number"
            name="pay_periods"
            value={payPeriods}
            onChange={handleInputChange}
            placeholder="$0.00"
            disabled={true}
          />
        </div>
        <div className="income-input">
          <label>Other Income:</label>
          <input
            type="number"
            name="other"
            value={income.other}
            onChange={handleInputChange}
            placeholder="$0.00"
          />
        </div>
      </form>
      <h3>
        Total Income: $
        {Object.values(income)
          .reduce((acc, val) => acc + Number(val), 0)
          .toFixed(2)}
      </h3>
    </div>
  );
}

export default Income;
