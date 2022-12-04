import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ITask } from '../../../../api/requests';
import { reduxProject, StateReduxInterface } from '../../../../state';
import { useDispatch, useSelector } from 'react-redux';
import { IBoard } from '../../boards/board';

export const MainCard = function (task: ITask) {
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const router = useNavigate();
  const { t } = useTranslation();
  const boardLink = () => {
    dispatch(
      reduxProject({
        board: data.boards.find((e) => e._id === task.boardId) as IBoard,
        tasks: [],
        columns: [],
      })
    );
    router(`/board-${task.boardId}`);
  };

  return (
    <div className="main-card">
      <div className="main-card__headline">
        <h4 className="main-card-title">{task.title}</h4>
        <span className="main-card-status">
          <span className="bold">{t('main:task:status')}</span> {task.columnName}
        </span>
      </div>
      <p className="main-card-about">{task.description}</p>
      <span className="main-card-link icon-next-arrow">
        <span className="main-card-link-wrapper" onClick={boardLink}>
          {t('main:task:link:0')}
          <span className="main-card-link__name">{task.boardName}</span>
          {t('main:task:link:1')}
        </span>
      </span>
    </div>
  );
};
