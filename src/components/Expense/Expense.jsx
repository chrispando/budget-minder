// src/components/Expense.jsx
import React from "react";

const Expense = ({ expense, index, handleExpenseChange }) => {
  return (
    <div className="expense-row">
      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Expense Name"
        value={expense.name}
        onChange={(e) => handleExpenseChange(index, e)}
        required
      />

      <label>Amount:</label>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => handleExpenseChange(index, e)}
        required
      />

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

      <label>Due Date:</label>
      <input
        type="date"
        name="dueDate"
        value={expense.dueDate}
        onChange={(e) => handleExpenseChange(index, e)}
        required
      />
    </div>
  );
};

export default Expense;
