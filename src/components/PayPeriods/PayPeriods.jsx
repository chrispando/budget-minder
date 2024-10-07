// src/components/PayPeriods.js
import React, { useState } from "react";

function PayPeriods() {
  const [payPeriods, setPayPeriods] = useState([
    { startDate: "", endDate: "" },
  ]);

  const handlePayPeriodChange = (index, event) => {
    const newPayPeriods = payPeriods.map((period, i) => {
      if (i === index) {
        return { ...period, [event.target.name]: event.target.value };
      }
      return period;
    });
    setPayPeriods(newPayPeriods);
  };

  const addPayPeriod = () => {
    setPayPeriods([...payPeriods, { startDate: "", endDate: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process or store pay period data
    console.log("Pay Periods:", payPeriods);
  };

  return (
    <div>
      <h2>Pay Periods</h2>
      <form onSubmit={handleSubmit}>
        {payPeriods.map((period, index) => (
          <div key={index}>
            <label>Start Date: </label>
            <input
              type="date"
              name="startDate"
              value={period.startDate}
              onChange={(e) => handlePayPeriodChange(index, e)}
              required
            />
            <label>End Date: </label>
            <input
              type="date"
              name="endDate"
              value={period.endDate}
              onChange={(e) => handlePayPeriodChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addPayPeriod}>
          Add Another Pay Period
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PayPeriods;
