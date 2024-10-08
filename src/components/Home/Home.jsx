import React, { Component } from "react";
import Slider from "react-slick"; // Import react-slick slider
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import "chart.js/auto"; // Import the chart.js library automatically
import "./Home.css"; // Custom and slider CSS
import ChartDataLabels from "chartjs-plugin-datalabels"; // Optional, if you want more customization
import PayPeriods from "../PayPeriods/PayPeriods";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      totals: { needs: 0, wants: 0, savings: 0 },
      income: this.props.income,
      expenses: this.props.expenses,
      payPeriods: this.props.payPeriods,
    };

    // Bind methods
    this.calculateTotals = this.calculateTotals.bind(this);
  }

  // Lifecycle method to calculate totals once the component mounts
  componentDidMount() {
    console.log(this.state);
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
          needs += Number(expense.amount);
          break;
        case "Wants":
          wants += Number(expense.amount);
          break;
        case "Savings":
          savings += Number(expense.amount);
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
    const income = main.income;
    const expenses = main.expenses;
    const payPeriods = main.payPeriods;
    const totals = this.state.totals; // Get totals from state
    console.log(main);
    // Data for the Pie chart
    const pieData = {
      labels: ["Needs", "Wants", "Savings"],
      datasets: [
        {
          label: "Expense Distribution",
          labels: ["Needs", "Wants", "Savings"],
          data: [totals.needs, totals.wants, totals.savings], // Data for the chart
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for the segments
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
    // Pie chart options to display text and percentages inside
    const pieOptions = {
      plugins: {
        datalabels: {
          color: "#fff", // Text color inside the chart
          formatter: (value, context) => {
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = ((value / total) * 100).toFixed(2) + "%"; // Calculate percentage
            return percentage;
          },
        },
      },
    };

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
            {Object.values(income)
              .reduce((acc, val) => acc + Number(val), 0)
              .toFixed(2)}
          </h2>
        </div>
        {/* Display Needs, Wants, Savings as a Pie Chart */}
        <div className="totals">
          <div className="pie-chart-container">
            <h3>Expense Breakdown</h3>
            <div className="pie-chart-wrapper">
              <Pie
                data={pieData}
                options={pieOptions}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>

        {/* Slider for upcoming expenses */}
        <h3>Upcoming Expenses</h3>
        <Slider {...this.sliderSettings} className="expenses-slider">
          {expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <h4>{expense.name}</h4>
              <p>Amount: ${expense.amount}</p>
              <p>Category: {expense.category}</p>
              <p>Due: {new Date(expense.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </Slider>
        {/* Slider for upcoming pay periods */}
        <h3>Upcoming Pay Periods</h3>
        <Slider {...this.sliderSettings} className="pay-periods-slider">
          {payPeriods.map((period, index) => (
            <div key={index} className="pay-period-card">
              <h4>
                Pay Period: {new Date(period.startDate).toLocaleDateString()} -{" "}
                {new Date(period.endDate).toLocaleDateString()}
              </h4>
              <p>Rate of Pay: ${period.rateOfPay}</p>
              <p>Hours Invoiced: {period.hoursInvoiced}</p>
              <p>Total Pay: ${period.totalPay}</p>
            </div>
          ))}
        </Slider>

        <h3>Expenses by Pay Period</h3>
        {payPeriods.map((period, i) => {
          const expensesForPeriod = main.expenses.filter(
            (exp) => exp.payPeriod === i
          );
          return (
            <div key={i}>
              <h4>
                Pay Period: {new Date(period.startDate).toLocaleDateString()} -{" "}
                {new Date(period.endDate).toLocaleDateString()}
              </h4>
              {expensesForPeriod.length > 0 ? (
                <ul>
                  {expensesForPeriod.map((expense, idx) => (
                    <li key={idx}>
                      {expense.name}: ${expense.amount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No expenses assigned.</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
