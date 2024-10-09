// src/components/Expense.jsx
import React from "react";
import "./Expense.css"; // Import custom styles

const Expense = ({ expense, index, handleExpenseChange }) => {
  return (
    <div className="expense-card">
      <div className="expense-input">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={expense.name}
          onChange={(e) => handleExpenseChange(index, e)}
          required
        />
      </div>

      <div className="expense-input">
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={(e) => handleExpenseChange(index, e)}
          required
        />
      </div>

      <div className="expense-input">
        <label>Category:</label>
        <select
          name="category"
          value={expense.category}
          onChange={(e) => handleExpenseChange(index, e)}
          required
        >
          <option value="">Select Category</option>
          <option value="Needs">Needs</option>
          <option value="Wants">Wants</option>
          <option value="Savings">Savings</option>
        </select>
      </div>

      <div className="expense-input">
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={expense.dueDate}
          onChange={(e) => handleExpenseChange(index, e)}
          required
        />
      </div>
    </div>
  );
};

export default Expense;
