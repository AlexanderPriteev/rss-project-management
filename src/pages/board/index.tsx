import React, { useEffect, useState } from 'react';
import { BoardCol } from './column';
import { useTranslation } from 'react-i18next';
import { useCheckUser } from '../../api/checkAuth';
import { Link, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { reduxProject, StateReduxInterface } from '../../state';

export const ProjectBoard = function () {
  const { t } = useTranslation();
  const boardId = useParams().id as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();

  const [alertError, setAlertError] = useState('');
  const [editProject, setEditProject] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') as string;

    const loadBoard = async () => {
      try {
        const loadBoard = (await getBoardById(token, boardId)) as IBoard;
        const allUsers = await getUsers(token);
        loadBoard.ownerName = allUsers.find((e) => e._id === loadBoard.owner)?._id;
        loadBoard.usersName = allUsers
          .filter((e) => loadBoard.users.includes(e._id as string))
          .map((e) => e.name);
        dispatch(reduxProject({ ...data.project, board: loadBoard }));
        await loadTasks(loadBoard, allUsers);
      } catch {
        setAlertError(t('board:alert:default') as string);
        setTimeout(() => setAlertError(''), 3000);
      }
    };

    const loadTasks = async (board?: IBoard, users?: IUser[]) => {
      try {
        const curBoard = board || data.project.board;
        const columns = (await getBoardColumn(token, boardId)) as IColumn[];
        const tasks = (await getBoardTaskSet(token, boardId)) as ITask[];
        const allUsers = users || (await getUsers(token));
        tasks.forEach((task) => {
          task.users.forEach((user) => {
            const curUser = allUsers.find((e) => e._id === user) as IUser;
            task.usersName = [...(task.usersName || []), curUser.name];
            task.usersLogin = [...(task.usersName || []), curUser.login];
          });
        });
        dispatch(reduxProject({ board: curBoard, columns: columns, tasks: tasks }));
      } catch {
        setAlertError(t('board:alert:default') as string);
        setTimeout(() => setAlertError(''), 3000);
      }
    };

    if (!data.project.board) {
      void loadBoard();
    } else if (!data.project.columns.length) {
      void loadTasks();
    }
  }, [dispatch, boardId, data.project, t]);

  useCheckUser();

  return (
    <div className="project">
      {data.project.board && (
        <>
          <div className="project__headline">
            <Link to="/" className="project-title icon-prev-arrow">
              <span className="project-title__text">{getTitle(data.project.board.title)}</span>
            </Link>
            <span className="project-board-edit icon-book" onClick={() => setEditProject(true)}>
              {t('board:project')}
            </span>
          </div>
          <div className="project-wrapper">
            <div className="project-col-list">
              {data.project.columns.map((e) => (
                <BoardCol key={e._id} column={e} tasks={data.project.tasks} />
              ))}
            </div>
            <button className="project-create icon-add" onClick={() => []}>
              {t('board:column')}
            </button>
          </div>
          {editProject && <EditModalBoard card={data.project.board} control={setEditProject} />}
        </>
      )}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
