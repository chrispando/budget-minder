import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Import for drag-and-drop
import "./Match.css"; // Custom CSS

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenses,
      payPeriods: this.props.payPeriods,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // Handle the Drag End event
  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    // If there is no destination, or if it's dropped outside of a droppable area
    if (!destination) return;

    // If dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedExpenseIndex = parseInt(draggableId.replace("expense-", ""));

    // Get the dragged expense
    const draggedExpense = this.state.expenses[draggedExpenseIndex];

    // If dropped in a pay period (not the original expenses list)
    if (destination.droppableId.startsWith("payperiod-")) {
      const updatedExpense = {
        ...draggedExpense,
        payPeriod: parseInt(destination.droppableId.replace("payperiod-", "")), // Assign to the dropped pay period
      };

      // Remove the dragged expense from the expenses list
      const newExpensesList = this.state.expenses.filter(
        (_, index) => index !== draggedExpenseIndex
      );

      // Add the expense to the correct pay period
      this.setState({
        expenses: newExpensesList,
        payPeriods: this.state.payPeriods.map((period, i) =>
          i === updatedExpense.payPeriod
            ? {
                ...period,
                expenses: [...(period.expenses || []), updatedExpense],
              }
            : period
        ),
      });
    }
  }

  render() {
    const { expenses, payPeriods } = this.state;

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="drag-drop-container">
            {/* Expenses List (Draggable) */}
            <Droppable droppableId="expenses-list" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="droppable-expenses-list"
                >
                  <h4>Expenses</h4>
                  {expenses.map((expense, index) => (
                    <Draggable
                      key={`expense-${index}`}
                      draggableId={`expense-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-expense"
                        >
                          <h5>{expense.name}</h5>
                          <p>Amount: ${expense.amount}</p>
                          <p>
                            Due:{" "}
                            {new Date(expense.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Pay Periods (Droppable with Draggable Expenses) */}
            {payPeriods.map((period, i) => (
              <Droppable key={i} droppableId={`payperiod-${i}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-pay-period"
                  >
                    <h4>
                      Pay Period:{" "}
                      {new Date(period.startDate).toLocaleDateString()} -{" "}
                      {new Date(period.endDate).toLocaleDateString()}
                    </h4>
                    {/* Draggable cards for each assigned expense in the pay period */}
                    {period.expenses && period.expenses.length > 0 ? (
                      period.expenses.map((expense, idx) => (
                        <Draggable
                          key={`assigned-expense-${idx}`}
                          draggableId={`assigned-expense-${idx}`}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="draggable-expense"
                            >
                              <h5>{expense.name}</h5>
                              <p>Amount: ${expense.amount}</p>
                              <p>
                                Due:{" "}
                                {new Date(expense.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>No expenses assigned yet.</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default Match;
