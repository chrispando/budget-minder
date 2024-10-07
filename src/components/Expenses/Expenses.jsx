// src/components/Expenses.js
import React, { useState } from "react";

function Expenses() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([{ name: "", amount: 0 }]);

  const handleExpenseChange = (index, event) => {
    const newExpenses = expenses.map((expense, i) => {
      if (i === index) {
        return { ...expense, [event.target.name]: event.target.value };
      }
      return expense;
    });
    setExpenses(newExpenses);
  };

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store or process the data
    console.log("Income:", income);
    console.log("Expenses:", expenses);
  };

  return (
    <div>
      <h2>Monthly Income and Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monthly Income: </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
        <h3>Expenses</h3>
        {expenses.map((expense, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Expense Name"
              value={expense.name}
              onChange={(e) => handleExpenseChange(index, e)}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => handleExpenseChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addExpense}>
          Add Another Expense
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Expenses;
