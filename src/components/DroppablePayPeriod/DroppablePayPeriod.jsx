import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const DroppablePayPeriod = ({ key, period, i, expensesByPayPeriod }) => {
  return (
    <Droppable key={key} droppableId={`payperiod-${i}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="droppable-pay-period"
        >
          <h4>
            Pay Period: {new Date(period.startDate).toLocaleDateString()} -{" "}
            {new Date(period.endDate).toLocaleDateString()}
          </h4>
          {/* Draggable cards for each assigned expense in the pay period */}
          {expensesByPayPeriod[period.id] &&
          expensesByPayPeriod[period.id].length > 0 ? (
            expensesByPayPeriod[period.id].map((expense, idx) => (
              <Draggable
                key={`assigned-expense-${idx}`}
                draggableId={`expense-${expense.id}`}
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
                    <p>Due: {new Date(expense.dueDate).toLocaleDateString()}</p>
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
  );
};

export default DroppablePayPeriod;
