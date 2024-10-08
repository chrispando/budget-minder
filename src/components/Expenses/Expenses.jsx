import React, { Component } from "react";
import data from "../../assets/data/expenses.json";
class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenses,
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
    console.log("New expense added:", this.state.expenses);
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    const expenses = this.state.expenses;
    console.log("Expenses submitted:", expenses);
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
      console.log("Expenses submitted:", [
        ...this.props.expenses,
        ...newExpenses,
      ]);
    } else {
      this.setState({ error: "No new expenses to add or invalid data." });
    }
  }

  render() {
    const { expenses, error } = this.state;

    return (
      <div>
        <h2>Expenses</h2>
        <form onSubmit={this.handleSubmit}>
          <h3>Expenses</h3>
          {expenses.map((expense, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Expense Name"
                value={expense.name}
                onChange={(e) => this.handleExpenseChange(index, e)}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => this.handleExpenseChange(index, e)}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={expense.category}
                onChange={(e) => this.handleExpenseChange(index, e)}
              />
              <input
                type="date"
                name="dueDate"
                value={expense.dueDate}
                onChange={(e) => this.handleExpenseChange(index, e)}
              />
            </div>
          ))}
          <button type="button" onClick={this.addExpense}>
            Add Another Expense
          </button>
          <br />
          <button type="submit">Submit</button>
        </form>

        {/* Show validation error if any */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
}

export default Expenses;
