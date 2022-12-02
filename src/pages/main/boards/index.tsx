import React, { useEffect, useState } from 'react';
import { Board, IBoard } from './board';
import { CreateModal } from '../../../companents/modal/create-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertModal } from '../../../companents/alert';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, StateReduxInterface } from '../../../state';
import { getUserBoards, getUsers, IUser } from '../../../api/requests';

export const MainBoards = function () {
  const { t } = useTranslation();
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') as string;

  const location = useLocation();
  const router = useNavigate();
  const [createModal, setCreateModal] = useState(location.state);
  const [alertError, setAlertError] = useState('');

  useEffect(() => {
    if (location.state) {
      router(location.pathname, {});
    }
  }, [location, router]);

  useEffect(() => {
    const userBoards = async () => {
      try {
        const boards = (await getUserBoards(token, data.user._id as string)) as IBoard[];
        const allUsers = (await getUsers(token)) as IUser[];
        boards.forEach((board) => {
          board.ownerName = allUsers.find((e) => e._id === board.owner)?.name;
          board.usersName = allUsers
            .filter((e) => board.users.includes(e._id as string))
            .map((e) => e.name);
        });
        dispatch(reduxBoards(boards));
      } catch {
        setAlertError(`${t('main:alert:boards')}`);
      }
    };
    void userBoards();
  }, [t, token, data.user._id, dispatch]);

  return (
    <div className="main-boards">
      <div className="headline">
        {t('main:title')}
        <span className="board-new icon-add" onClick={() => setCreateModal(true)}>
          {t('main:create')}
        </span>
      </div>
      <div className="board-list">
        {data.boards.map((e) => (
          <Board {...e} key={e._id} />
        ))}
      </div>
      {createModal && <CreateModal type={'Board'} control={setCreateModal} />}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
