import React, { Component } from "react";
import Slider from "react-slick"; // Import react-slick slider
import "./Home.css"; // Custom and slider CSS

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // Initialize state
    this.state = {
      totals: { needs: 0, wants: 0, savings: 0 },
    };

    // Bind methods
    this.calculateTotals = this.calculateTotals.bind(this);
  }

  // Lifecycle method to calculate totals once the component mounts
  componentDidMount() {
    this.calculateTotals(this.props.expenses);
  }

  // Method to calculate totals for Needs, Wants, and Savings
  calculateTotals(expenses) {
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

    // Update totals in state
    this.setState({ totals: { needs, wants, savings } });
  }

  // Slider settings for react-slick
  sliderSettings = {
    dots: true, // Show navigation dots
    infinite: false, // No infinite loop
    speed: 500,
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1, // Scroll one card at a time
    responsive: [
      {
        breakpoint: 1024, // For tablets and small desktops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // For small devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  render() {
    const main = this.props; // Receive expenses and income from props
    const { totals } = this.state; // Get totals from state

    return (
      <div className="home">
        <h1>Welcome to the Budget App!</h1>
        <p>
          Track your monthly expenses and plan according to your pay periods.
        </p>
        {/* Display Income */}
        <div className="income">
          <h2>
            Total Income: $
            {Object.values(main.income)
              .reduce((acc, val) => acc + Number(val), 0)
              .toFixed(2)}
          </h2>
        </div>
        {/* Display Needs, Wants, Savings */}
        <div className="totals">
          <div className="total-card">
            <h2>Needs</h2>
            <p>${totals.needs}</p>
          </div>
          <div className="total-card">
            <h2>Wants</h2>
            <p>${totals.wants}</p>
          </div>
          <div className="total-card">
            <h2>Savings</h2>
            <p>${totals.savings}</p>
          </div>
        </div>

        {/* Slider for upcoming expenses */}
        <h3>Upcoming Expenses</h3>
        <Slider {...this.sliderSettings} className="expenses-slider">
          {main.expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <h4>{expense.name}</h4>
              <p>Amount: ${expense.amount}</p>
              <p>Category: {expense.category}</p>
              <p>Due: {new Date(expense.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Home;
