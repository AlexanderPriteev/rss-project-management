import React, { useMemo, useState } from 'react';
import { MainBoards } from './boards';
import { MainTasks } from './tasks';
import { useCheckUser } from '../../api/checkAuth';
import {
  getBoardColumn,
  getBoardTaskSet,
  getUserBoards,
  getUsers,
  ITask,
  IUser,
} from '../../api/requests';
import { IBoard } from './boards/board';
import { reduxBoards, reduxTasks, StateReduxInterface } from '../../state';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AlertModal } from '../../companents/alert';

export const Main = function () {
  const { t } = useTranslation();
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') as string;
  const [alertError, setAlertError] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  useMemo(() => {
    if (isLoad) return;
    setIsLoad(true);

    const userBoards = async () => {
      try {
        const boards = (await getUserBoards(token, data.user._id as string)) as IBoard[];
        const allUsers = (await getUsers(token)) as IUser[];
        const promiseTasks: Promise<ITask[]>[] = [];
        const promiseColumn: Promise<ITask[]>[] = [];
        dispatch(reduxBoards([...boards]));
        for (const board of boards) {
          promiseColumn.push(getBoardColumn(token, board._id));
          promiseTasks.push(getBoardTaskSet(token, board._id));
        }
        const columns = (await Promise.all(promiseColumn)).flat(1);
        const tasks = (await Promise.all(promiseTasks)).flat(1);
        const tasksUpdate = tasks.map((e) => {
          e.columnName = columns.find((e1) => e1._id === e.columnId)?.title;
          e.boardName = boards
            .find((e1) => e1._id === e.boardId)
            ?.title.split(' - ')
            .filter((e, i) => i)
            .join(' - ');
          return e;
        });
        dispatch(reduxTasks([...tasksUpdate]));
        boards.forEach((board) => {
          board.ownerName = allUsers.find((e) => e._id === board.owner)?.name;
          board.usersName = allUsers
            .filter((e) => board.users.includes(e._id as string))
            .map((e) => e.name);
          board.count = tasks.filter((e) => e.boardId === board._id).length;
        });
        dispatch(reduxBoards([...boards]));
      } catch {
        setAlertError(`${t('main:alert:boards')}`);
      }
    };
    void userBoards();
  }, [t, token, data.user._id, dispatch, isLoad]);
  useCheckUser();
  return (
    <div className="main">
      <MainBoards />
      <MainTasks />
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
