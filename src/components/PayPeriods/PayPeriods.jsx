import React, { Component } from "react";
import "./PayPeriods.css";
import pay from "../../assets/data/pay.json";

class PayPeriods extends Component {
  constructor(props) {
    super(props);

    // Initialize state with pay periods and total pay
    this.state = {
      payPeriods: this.props.payPeriodList.length === 0 ? pay : [],
    };

    // Bind methods
    this.handlePayPeriodChange = this.handlePayPeriodChange.bind(this);
    this.addPayPeriod = this.addPayPeriod.bind(this);
    this.deletePayPeriod = this.deletePayPeriod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("Payperiods constuctor", this.state.payPeriods);
  }

  // Method to handle changes in pay period inputs
  handlePayPeriodChange(index, event) {
    const { name, value } = event.target;
    const updatedPayPeriods = this.state.payPeriods.map((period, i) => {
      if (i === index) {
        return { ...period, [name]: value };
      }
      return period;
    });

    this.setState({ payPeriods: updatedPayPeriods });
  }

  // Method to add a new pay period
  addPayPeriod() {
    this.setState({
      payPeriods: [
        ...this.state.payPeriods,
        {
          startDate: "",
          endDate: "",
          rateOfPay: 0,
          hoursInvoiced: 0,
          totalPay: 0,
        },
      ],
    });
  }
  // Method to delete the most recent pay period
  deletePayPeriod() {
    // Ensure there are pay periods to delete
    if (this.state.payPeriods.length > 0) {
      const updatedPayPeriods = this.state.payPeriods.slice(0, -1); // Remove the last item
      this.setState(
        {
          payPeriods: updatedPayPeriods, // Update state with the new array
        },
        this.props.setPayPeriodList(updatedPayPeriods) // Update parent state with the new array
      );
    }
  }

  // Method to handle form submission
  handleSubmit(e) {
    e.preventDefault();

    // Step 1: Calculate the total pay for each pay period
    const calculatedPeriods = this.state.payPeriods.map((period) => {
      const totalPay = period.rateOfPay * period.hoursInvoiced;
      return { ...period, totalPay };
    });

    // Step 2: Identify new pay periods by filtering out periods that already exist in payPeriodList (from props)
    const newPeriods = calculatedPeriods.filter((newPeriod) => {
      return !this.props.payPeriodList.some(
        (existingPeriod) =>
          existingPeriod.startDate === newPeriod.startDate &&
          existingPeriod.endDate === newPeriod.endDate &&
          existingPeriod.rateOfPay === newPeriod.rateOfPay &&
          existingPeriod.hoursInvoiced === newPeriod.hoursInvoiced
      );
    });

    // Step 3: Update local state and parent state with the new periods
    if (newPeriods.length > 0) {
      this.setState({
        payPeriods: [...this.props.payPeriodList, ...newPeriods],
      });

      this.props.setPayPeriodList([...this.props.payPeriodList, ...newPeriods]);
    } else {
      console.log("No new pay periods to add.");
    }

    // Log updated pay periods for debugging
    console.log("Updated Pay Periods:", [
      ...this.props.payPeriodList,
      ...newPeriods,
    ]);
  }

  render() {
    const { payPeriods } = this.state;

    return (
      <div className="pay-periods">
        <h2>Pay Periods</h2>
        <form onSubmit={this.handleSubmit}>
          {payPeriods.map((period, index) => (
            <div key={index} className="pay-period">
              <label>Start Date: </label>
              <input
                type="date"
                name="startDate"
                value={period.startDate}
                onChange={(e) => this.handlePayPeriodChange(index, e)}
                required
              />
              <label>End Date: </label>
              <input
                type="date"
                name="endDate"
                value={period.endDate}
                onChange={(e) => this.handlePayPeriodChange(index, e)}
                required
              />
              <label>Rate of Pay: </label>
              <input
                type="number"
                name="rateOfPay"
                value={period.rateOfPay}
                onChange={(e) => this.handlePayPeriodChange(index, e)}
                required
                placeholder="$0.00"
              />
              <label>Hours Invoiced: </label>
              <input
                type="number"
                name="hoursInvoiced"
                value={period.hoursInvoiced}
                onChange={(e) => this.handlePayPeriodChange(index, e)}
                required
                placeholder="0"
              />
              <p>Total Pay: ${period.totalPay.toFixed(2)}</p>
            </div>
          ))}
          <button type="button" onClick={this.addPayPeriod}>
            Add Another Pay Period
          </button>
          <button
            type="button"
            style={{ backgroundColor: "red" }}
            onClick={this.deletePayPeriod}
          >
            Delete Pay Period
          </button>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default PayPeriods;
