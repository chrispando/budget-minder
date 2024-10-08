// src/components/Expenses.jsx
import React, { Component } from "react";
import Expense from "../Expense/Expense";
import "./Expenses.css"; // Custom CSS
import data from "../../assets/data/expenses.json"; // Import sample data

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenses.length === 0 ? data : [], // Initialize with props or an empty array
      error: null, // To store error messages for invalid inputs
    };

    this.handleExpenseChange = this.handleExpenseChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle changes in expense input fields
  handleExpenseChange(index, event) {
    const { name, value } = event.target;
    const newExpenses = this.state.expenses.map((expense, i) => {
      if (i === index) {
        return { ...expense, [name]: value }; // Update the specific expense by index
      }
      return expense;
    });
    this.setState({ expenses: newExpenses });
  }

  // Validate expense (no empty name or amount)
  validateExpense(expense) {
    return (
      expense.name.trim() !== "" &&
      expense.amount > 0 &&
      expense.category.trim() !== "" &&
      expense.dueDate.trim() !== ""
    );
  }

  // Add a new blank expense (with validation to prevent empty or duplicate entries)
  addExpense() {
    const lastExpense = this.state.expenses[this.state.expenses.length - 1];

    // Validate the last expense before adding a new one
    if (lastExpense && !this.validateExpense(lastExpense)) {
      this.setState({
        error: "Please fill out all fields before adding another expense.",
      });
      return;
    }

    // Reset error and add a new expense if the previous one is valid
    this.setState({
      error: null,
      expenses: [
        ...this.state.expenses,
        {
          name: "",
          amount: 0,
          category: "",
          dueDate: "",
        },
      ],
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    const expenses = this.state.expenses;
    // Filter out valid expenses and prevent submission of duplicates or empty fields
    const newExpenses = expenses.filter((newExpense) => {
      return (
        this.validateExpense(newExpense) &&
        !this.props.expenses.some(
          (existingExpense) =>
            existingExpense.name === newExpense.name &&
            existingExpense.amount === newExpense.amount &&
            existingExpense.category === newExpense.category &&
            existingExpense.dueDate === newExpense.dueDate
        )
      );
    });

    if (newExpenses.length > 0) {
      // Add valid expenses to the parent state
      this.props.setExpenses([...this.props.expenses, ...newExpenses]);
      this.setState({ error: null });
    } else {
      this.setState({ error: "No new expenses to add or invalid data." });
    }
  }

  render() {
    const { expenses, error } = this.state;

    return (
      <div className="expenses-container">
        <h2>Manage Your Expenses</h2>
        <form onSubmit={this.handleSubmit} className="expenses-form">
          {expenses.map((expense, index) => (
            <Expense
              key={index}
              expense={expense}
              index={index}
              handleExpenseChange={this.handleExpenseChange} // Pass down handler
            />
          ))}

          <button
            type="button"
            onClick={this.addExpense}
            className="add-expense-button"
          >
            Add Another Expense
          </button>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {/* Show validation error if any */}
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
}

export default Expenses;
