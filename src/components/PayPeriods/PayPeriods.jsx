// src/components/PayPeriods.js
import React, { useState, useEffect } from "react";
import "./PayPeriods.css";

function PayPeriods(payPeriodList, totalPay) {
  const [payPeriods, setPayPeriods] = useState([
    { startDate: "", endDate: "", rateOfPay: 0, hoursInvoiced: 0, totalPay: 0 },
  ]);

  // Calculate total income whenever any income source is updated
  useEffect(() => {
    const total = payPeriods.reduce((acc, period) => acc + period.totalPay, 0);
    totalPay = total;
  }, [totalPay]);

  const handlePayPeriodChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPayPeriods = payPeriods.map((period, i) => {
      if (i === index) {
        return { ...period, [name]: value };
      }
      return period;
    });
    setPayPeriods(updatedPayPeriods);
  };

  const addPayPeriod = () => {
    setPayPeriods([
      ...payPeriods,
      {
        startDate: "",
        endDate: "",
        rateOfPay: 0,
        hoursInvoiced: 0,
        totalPay: 0,
      },
    ]);
  };

  const append = (obj1, obj2) => {
    return obj1.concat(obj2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedPeriods = payPeriods.map((period) => {
      const totalPay = period.rateOfPay * period.hoursInvoiced;
      return { ...period, totalPay };
    });
    setPayPeriods(calculatedPeriods);
    payPeriodList = append(payPeriods, payPeriodList);
    // Display totals in the console or process them elsewhere
    console.log("Pay Periods with Totals:", payPeriodList);
  };

  return (
    <div className="pay-periods">
      <h2>Pay Periods</h2>
      <form onSubmit={handleSubmit}>
        {payPeriods.map((period, index) => (
          <div key={index} className="pay-period">
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
            <label>Rate of Pay: </label>
            <input
              type="number"
              name="rateOfPay"
              value={period.rateOfPay}
              onChange={(e) => handlePayPeriodChange(index, e)}
              required
              placeholder="$0.00"
            />
            <label>Hours Invoiced: </label>
            <input
              type="number"
              name="hoursInvoiced"
              value={period.hoursInvoiced}
              onChange={(e) => handlePayPeriodChange(index, e)}
              required
              placeholder="0"
            />
            <p>Total Pay: ${period.totalPay.toFixed(2)}</p>
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
