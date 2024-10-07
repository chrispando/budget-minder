// src/components/Home.js
import React, { useEffect, useState } from "react";
import "./Home.css"; // for optional styling
import Expenses from "../Expenses/Expenses";
import data from "../../assets/data/expenses.json";

function Home({ income }) {
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState({ needs: 0, wants: 0, savings: 0 });

  useEffect(() => {
    setExpenses(data);
    calculateTotals(data); // Calculate totals immediately
  }, []);

  const calculateTotals = (expenses) => {
    let needs = 0,
      wants = 0,
      savings = 0;

    expenses.forEach((expense) => {
      switch (expense.category) {
        case "Needs":
          needs += expense.amount;
          break;
        case "Wants":
          wants += expense.amount;
          break;
        case "Savings":
          savings += expense.amount;
          break;
        default:
          break;
      }
    });

    setTotals({ needs, wants, savings });
  };

  return (
    <div className="home">
      <h1>Welcome to the Budget App!</h1>
      <p>Track your monthly expenses and plan according to your pay periods.</p>

      {/* Display Needs, Wants, Savings */}
      <div className="totals">
        <div className="total-card">
          <h2>Needs</h2>
          <p>${totals.needs.toFixed(2)}</p>
        </div>
        <div className="total-card">
          <h2>Wants</h2>
          <p>${totals.wants.toFixed(2)}</p>
        </div>
        <div className="total-card">
          <h2>Savings</h2>
          <p>${totals.savings.toFixed(2)}</p>
        </div>
      </div>

      {/* Display upcoming expenses as cards */}
      <h3>Upcoming Expenses</h3>
      <div className="expenses-grid">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-card">
            <h4>{expense.name}</h4>
            <p>Amount: ${expense.amount.toFixed(2)}</p>
            <p>Category: {expense.category}</p>
            <p>Due: {new Date(expense.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
