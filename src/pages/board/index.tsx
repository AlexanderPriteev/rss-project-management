import React, { useEffect, useState } from 'react';
import { BoardCol } from './column';
import { useTranslation } from 'react-i18next';
import { useCheckUser } from '../../api/checkAuth';
import { useLocation, Link, useParams } from 'react-router-dom';
import { IBoard } from '../main/boards/board';
import { AlertModal } from '../../companents/alert';
import {
  getBoardById,
  getBoardColumn,
  getBoardTaskSet,
  getUsers,
  IColumn,
  ITask,
  IUser,
} from '../../api/requests';
import { EditModalBoard } from '../../companents/modal/edit-form/board';
import { getTitle } from '../../methods/get-title';

export const ProjectBoard = function () {
  const { t } = useTranslation();
  const boardId = useParams().id as string;

  const stateData = useLocation().state as IBoard | null;
  const [boardState, setBoardState] = useState(stateData);
  const [columns, setColumns] = useState([] as IColumn[]);
  const [tasks, setTasks] = useState([] as ITask[]);
  const [isLoad, setIsLoad] = useState(false);
  const [alertError, setAlertError] = useState('');
  const [editProject, setEditProject] = useState(false);

  try {
    useEffect(() => {
      if (isLoad) return;
      setIsLoad(true);

      const token = localStorage.getItem('token') as string;
      const loadBoard = async () => {
        const loadBoard = await getBoardById(token, boardId);
        const allUsers = await getUsers(token);
        loadBoard.ownerName = allUsers.find((e) => e._id === loadBoard.owner)?._id;
        loadBoard.usersName = allUsers
          .filter((e) => loadBoard.users.includes(e._id as string))
          .map((e) => e.name);
        setBoardState(loadBoard);
      };
      const loadTasks = async () => {
        const loadColumns = (await getBoardColumn(token, boardId)) as IColumn[];
        const loadTasksSet = (await getBoardTaskSet(token, boardId)) as ITask[];
        const users = await getUsers(token);
        loadTasksSet.forEach((task) => {
          task.users.forEach((user) => {
            const curUser = users.find((e) => e._id === user) as IUser;
            task.usersName = [...(task.usersName || []), curUser.name];
            task.usersLogin = [...(task.usersName || []), curUser.login];
          });
        });
        setColumns(loadColumns);
        setTasks(loadTasksSet);
      };

      if (!boardState) {
        void loadBoard();
      }
      void loadTasks();
    }, [boardId, boardState, columns, isLoad]);
  } catch {
    setAlertError(t('board:alert:default') as string);
    setTimeout(() => setAlertError(''), 3000);
  }

  useCheckUser();

  return (
    <div className="project">
      {boardState && (
        <>
          <div className="project__headline">
            <Link to="/" className="project-title icon-prev-arrow">
              <span className="project-title__text">{getTitle(boardState.title)}</span>
            </Link>
            <span className="project-board-edit icon-book" onClick={() => setEditProject(true)}>
              {t('board:project')}
            </span>
          </div>
          <div className="project-wrapper">
            <div className="project-col-list">
              {columns.map((e) => (
                <BoardCol key={e._id} column={e} tasks={tasks} board={boardState} />
              ))}
            </div>
            <button className="project-create icon-add" onClick={() => []}>
              {t('board:column')}
            </button>
          </div>
          {editProject && <EditModalBoard card={boardState} control={setEditProject} />}
        </>
      )}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
