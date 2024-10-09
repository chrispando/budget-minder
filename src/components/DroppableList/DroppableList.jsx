import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Import for drag-and-drop
const DroppableList = ({ droppableId, list, title }) => {
  return (
    <Droppable droppableId={droppableId} direction="vertical">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="droppable-expenses-list"
        >
          <h4>{title}</h4>
          {list.map((expense, index) => (
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
                  <p>Due: {new Date(expense.dueDate).toLocaleDateString()}</p>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableList;
