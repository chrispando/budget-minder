import React, { Component } from "react";
import "./Income.css";

class Income extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payPeriods: this.props.payPeriods, // Derived from parent props
      totalPayPeriods: this.props.payPeriods.reduce(
        (acc, period) => acc + period.totalPay,
        0
      ),
      income: this.props.totalIncome, // Derived from parent props
    };

    // Bind the methods
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state.income["pay_periods"] = this.state.totalPayPeriods;
  }

  // Handle input changes and update the App-level state via props
  handleInputChange(e) {
    const { name, value } = e.target;

    // // Update the income state based on input changes
    // const updatedIncome = {
    //   ...this.state.income["income"], // Spread current state of income
    //   [name]: Number(value), // Dynamically update the field
    // };
    const incomeObj = this.state.income;
    incomeObj[name] = Number(value);
    //incomeObj["pay_periods"] = this.state.totalPayPeriods;
    console.log(incomeObj);
    // Update state locally
    this.setState({ income: incomeObj });

    // Update the App-level state by calling the parent setTotalIncome method
    // this.props.setTotalIncome(updatedIncome); // Pass the updated income to the parent component
  }

  render() {
    const { payPeriods, income } = this.state;

    // Calculate total income including salary, pay_periods, and other
    const totalPayPeriods = payPeriods.reduce(
      (acc, period) => acc + period.totalPay,
      0
    );
    const totalIncome = Object.values(income)
      .reduce((acc, val) => acc + Number(val), 0)
      .toFixed(2);

    return (
      <div className="income">
        <h2>Enter Your Income Sources</h2>
        <form>
          <div className="income-input">
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              value={income.salary}
              onChange={this.handleInputChange}
              placeholder="$0.00"
            />
          </div>

          <div className="income-input">
            <label>Pay Periods:</label>
            <input
              type="number"
              name="pay_periods"
              value={totalPayPeriods} // Use the calculated total from payPeriods
              placeholder="$0.00"
              disabled={true} // Disable this input field since it's calculated from payPeriods prop
              onChange={this.handleInputChange}
            />
          </div>

          <div className="income-input">
            <label>Other Income:</label>
            <input
              type="number"
              name="other"
              value={income.other}
              onChange={this.handleInputChange}
              placeholder="$0.00"
            />
          </div>
        </form>
        <h3>Total Income: ${totalIncome}</h3>
      </div>
    );
  }
}

export default Income;
