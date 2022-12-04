import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// fake data generator

const tmpCards = [
  { id: 1, value: 'fsdfsdfsd', order: 0, board: 1 },
  { id: 2, value: 'fsdfsdfsd2', order: 1, board: 1 },
  { id: 3, value: 'fsdfsdfsd3', order: 2, board: 1 },
  { id: 4, value: 'fsdfsdfsd4', order: 0, board: 2 },
  { id: 5, value: 'fsdfsdfsd5', order: 1, board: 2 },
  { id: 6, value: 'fsdfsdfsd6', order: 0, board: 3 },
];

const tmpBoars = [
  { id: 1, value: 'backlog', order: 0 },
  { id: 2, value: 'backlog2', order: 1 },
  { id: 3, value: 'backlog3', order: 2 },
];

export function QuoteApp() {
  function onDragEnd(result: DropResult) {
    console.log(result);
    //TODO
  }

  return (
    <div className="dnd">
      <DragDropContext onDragEnd={onDragEnd}>
        {tmpBoars.map((e) => (
          <Droppable key={e.id} droppableId={`${e.id}`}>
            {(provided) => (
              <div className="dnd-board">
                <div className="dnd-board-head">{e.value}</div>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="dnd-board-body"
                >
                  {tmpCards
                    .filter((e1) => e1.board === e.id)
                    .map((e1) => (
                      <Draggable key={e1.id} draggableId={`${e1.id}`} index={e1.order}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="dnd-card"
                          >
                            {e1.value}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
