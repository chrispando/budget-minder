import React, { Component } from "react";
import Slider from "react-slick";
import "./Home.css"; // Custom and slider CSS
import PieChart from "../PieChart/PieChart";
import Match from "../Match/Match";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: { needs: 0, wants: 0, savings: 0 },
      income: this.props.income,
      expenses: this.props.expenses,
      payPeriods: this.props.payPeriods,
    };
  }

  // Lifecycle method to calculate totals once the component mounts
  componentDidMount() {
    this.calculateTotals(this.props.expenses);
  }

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

    this.setState({ totals: { needs, wants, savings } });
  }

  render() {
    const expenses = this.state.expenses;
    const payPeriods = this.state.payPeriods;
    const totals = this.state.totals;

    // Data for the Pie chart
    const pieData = {
      labels: ["Needs", "Wants", "Savings"],
      datasets: [
        {
          label: "Expense Distribution",
          data: [totals.needs, totals.wants, totals.savings],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    // Pie chart options
    const pieOptions = {
      plugins: {
        datalabels: {
          color: "#fff",
          formatter: (value, context) => {
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return percentage;
          },
        },
      },
    };

    return (
      <div className="home">
        <h1>Welcome to the Budget App!</h1>
        <PieChart data={pieData} options={pieOptions} />

        <h3>Assign Expenses to Pay Periods</h3>
        <Match expenses={expenses} payPeriods={payPeriods} />
      </div>
    );
  }
}

export default Home;
