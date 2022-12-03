import React, { useState } from 'react';
import { RemoveModalWrap } from '../../../../companents/modal/remove-form/wrapper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditModalBoard } from '../../../../companents/modal/edit-form/board';
import { useDispatch, useSelector } from 'react-redux';
import { reduxProject, StateReduxInterface } from '../../../../state';

export interface IBoard {
  _id: string;
  title: string;
  users: string[];
  owner: string;
  count?: number;
  ownerName?: string;
  usersName?: string[];
}

export const Board = function (card: IBoard) {
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const router = useNavigate();
  const { t } = useTranslation();

  const [boardId, headline] = Object.values(card);
  const count = card.count || 0;
  const ownerName = card.ownerName || '';
  const usersName = card.usersName || [];

  const arrHeadline = headline.split(' - ');
  const date = arrHeadline.splice(0, 1);
  const title = arrHeadline.join(' - ');
  const [hide, setHide] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  const boardLink = () => {
    dispatch(reduxProject({ ...data.project, board: card }));
    router(`/board-${boardId}`);
  };

  return (
    <div className="board">
      <div className="board__head">
        <h3 className="board-title" onClick={() => boardLink()}>
          {title}
        </h3>
        <div className="board-icon-list">
          <span
            className={`board-icon icon-${hide ? 'show' : 'hide'}`}
            onClick={() => setHide(!hide)}
          >
            {hide ? t('main:board:detail:0') : t('main:board:detail:1')} {t('main:board:detail:2')}
          </span>
          <span className="board-icon icon-pen" onClick={() => setEditModal(true)}>
            {t('main:board:edit')}
          </span>
          {data.user._id === card.owner && (
            <span className="board-icon icon-delete c-red" onClick={() => setRemoveModal(true)}>
              {t('main:board:remove')}
            </span>
          )}
        </div>
      </div>
      <div className={`board__body ${hide && 'hide'}`}>
        <div className="board__col-main">
          <div className="board-row">
            <span className="board-subtitle">{t('main:board:date')}</span>
            <span className="board-data">{date}</span>
          </div>
          <div className="board-row">
            <span className="board-subtitle">{t('main:board:count')}</span>
            <span className="board-data">{count}</span>
          </div>
          <div className="board-row">
            <span className="board-subtitle">{t('main:board:pm')}</span>
            <span className="board-data">{ownerName}</span>
          </div>
          {!!usersName.length && (
            <div className="board-row">
              <span className="board-subtitle">{t('main:board:team')}</span>
              <span className="board-data">{usersName.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      {removeModal && (
        <RemoveModalWrap name={title} path={boardId} type={'Board'} control={setRemoveModal} />
      )}
      {editModal && <EditModalBoard card={card} control={setEditModal} />}
    </div>
  );
};
