import React, { Component } from "react";
import Slider from "react-slick";
import "./Home.css"; // Custom and slider CSS
import PieChart from "../PieChart/PieChart";
import Match from "../Match/Match";
import GanttChart from "../GanttChart/Gantt";
import myExpenses from "../../assets/data/expenses.json";
import myPay from "../../assets/data/pay.json";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: { needs: 0, wants: 0, savings: 0 },
      income: this.props.income,
      expenses:
        this.props.expenses.length === 0 ? myExpenses : this.props.expenses,
      payPeriods:
        this.props.payPeriods.length === 0 ? myPay : this.props.payPeriods,
      expensesByPayPeriod: {}, // Start with an empty object for expenses by pay period
    };
    console.log("Home constructor", this.state);
  }

  // Lifecycle method to calculate totals once the component mounts
  componentDidMount() {
    this.calculateTotals(this.props.expenses);

    const savedExpensesByPayPeriod = JSON.parse(
      localStorage.getItem("expensesByPayPeriod")
    );
    if (savedExpensesByPayPeriod) {
      this.setState({ expensesByPayPeriod: savedExpensesByPayPeriod });
    }
  }

  // Lifecycle method to update the local storage when the expensesByPayPeriod state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expensesByPayPeriod !== this.state.expensesByPayPeriod) {
      localStorage.setItem(
        "expensesByPayPeriod",
        JSON.stringify(this.state.expensesByPayPeriod)
      );
    }
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

  // Method to format the data for the Gantt chart

  render() {
    const expenses = this.state.expenses;
    const payPeriods = this.state.payPeriods;
    const totals = this.state.totals;
    console.log("Pay Periods", payPeriods);
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
