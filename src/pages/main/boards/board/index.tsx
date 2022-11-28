import React, { useState } from 'react';
import { RemoveModalWrap } from '../../../../companents/modal/remove-form/wrapper';
import { EditModal } from '../../../../companents/modal/edit-form';
import { useNavigate } from 'react-router-dom';

//TODO
interface IBoard {
  id: string;
  title: string;
  description: string;
  team: string[];
  date: string;
  pm: string;
  countTasks: string;
}

export const Board = function (card: IBoard) {
  const router = useNavigate();

  const [boardId, title, description, team, date, pm, count] = Object.values(card);
  const [hide, setHide] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  return (
    <div className="board" id={boardId}>
      <div className="board__head">
        <h3 className="board-title" onClick={() => router(`/board`)}>
          {title}
        </h3>
        <div className="board-icon-list">
          <span
            className={`board-icon icon-${hide ? 'show' : 'hide'}`}
            onClick={() => setHide(!hide)}
          >
            {hide ? 'show' : 'hide'} details
          </span>
          <span className="board-icon icon-pen" onClick={() => setEditModal(true)}>
            edit
          </span>
          <span className="board-icon icon-delete c-red" onClick={() => setRemoveModal(true)}>
            remove
          </span>
        </div>
      </div>
      <div className={`board__body ${hide && 'hide'}`}>
        <div className="board__col-main">
          <p className="board-about">{description}</p>
          <div className="board-row">
            <span className="board-subtitle">Team:</span>
            <span className="board-data">{team.join(', ')}</span>
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
      {removeModal && <RemoveModalWrap name={title} control={setRemoveModal} />}
      {editModal && (
        <EditModal title={title} description={description} members={team} control={setEditModal} />
      )}
    </div>
  );
};
