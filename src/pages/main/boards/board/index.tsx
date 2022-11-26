import React, { useState } from 'react';

//TODO
interface IBoard {
  id: string;
  title: string;
  description: string;
  team: string;
  date: string;
  pm: string;
  countTasks: string;
}

export const Board = function (card: IBoard) {
  const [boardId, title, description, team, date, pm, count] = Object.values(card);
  const [hide, setHide] = useState(true);
  return (
    <div className="board" id={boardId}>
      <div className="board__head">
        <h3 className="board-title">{title}</h3>
        <div className="board-icon-list">
          <span
            className={`board-icon icon-${hide ? 'show' : 'hide'}`}
            onClick={() => setHide(!hide)}
          >
            {hide ? 'show' : 'hide'} details
          </span>
          <span className="board-icon icon-pen">edit</span>
          <span className="board-icon icon-delete c-red">remove</span>
        </div>
      </div>
      <div className={`board__body ${hide && 'hide'}`}>
        <div className="board__col-main">
          <p className="board-about">{description}</p>
          <div className="board-row">
            <span className="board-subtitle">Team:</span>
            <span className="board-data">{team}</span>
          </div>
        </div>
        <div className="board__col-about">
          <div className="board-row">
            <span className="board-subtitle">Date of Creatian:</span>
            <span className="board-data">{date}</span>
          </div>
          <div className="board-row">
            <span className="board-subtitle">Project Manager:</span>
            <span className="board-data">{pm}</span>
          </div>
          <div className="board-row">
            <span className="board-subtitle">Count of Task:</span>
            <span className="board-data">{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
