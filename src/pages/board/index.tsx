import React, { useMemo, useState } from 'react';
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
  updateColumnSet,
} from '../../api/requests';
import { EditModalBoard } from '../../companents/modal/edit-form/board';
import { getTitle } from '../../methods/get-title';
import { useDispatch, useSelector } from 'react-redux';
import { reduxProject, StateReduxInterface } from '../../state';
import { CreateModal } from '../../companents/modal/create-form';
import { Container } from 'react-smooth-dnd';

interface IDropColumn {
  addedIndex: number;
  payload: IColumn;
  removedIndex: number;
}

export const ProjectBoard = function () {
  const token = localStorage.getItem('token') as string;
  const { t } = useTranslation();
  const boardId = useParams().id as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();

  const [alertError, setAlertError] = useState('');
  const [editProject, setEditProject] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [preloader, setPreloader] = useState('');

  useMemo(() => {
    if (isLoad) return;
    setIsLoad(true);

    const loadBoard = async () => {
      try {
        setPreloader(' spinner-page');
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
      setPreloader('');
    };

    const loadTasks = async (board?: IBoard, users?: IUser[]) => {
      try {
        setPreloader(' spinner-page');
        const curBoard = board || data.project.board;
        const columns = (await getBoardColumn(token, boardId)) as IColumn[];
        columns.sort((a, b) => a.order - b.order);
        const tasks = (await getBoardTaskSet(token, boardId)) as ITask[];
        tasks.sort((a, b) => a.order - b.order);
        const allUsers = users || (await getUsers(token));
        tasks.forEach((task) => {
          task.users.forEach((user) => {
            const curUser = allUsers.find((e) => e._id === user) as IUser;
            task.usersName = [...(task.usersName || []), curUser.name];
            task.usersLogin = [...(task.usersName || []), curUser.login];
          });
          task.owner = allUsers.find((e) => e._id === task.userId)?.name || 'Unknown';
        });

        dispatch(reduxProject({ board: curBoard, columns: columns, tasks: tasks }));
      } catch {
        setAlertError(t('board:alert:default') as string);
        setTimeout(() => setAlertError(''), 3000);
      }
      setPreloader('');
    };
    if (!data.project.board) {
      void loadBoard();
    } else if (!data.project.columns.length) {
      void loadTasks();
    }
  }, [dispatch, boardId, data.project, t, isLoad, token]);

  useCheckUser();

  const updateColumn = async (res: IDropColumn) => {
    try {
      const columns = [...data.project.columns];
      if (res.removedIndex !== null) {
        columns.splice(res.removedIndex, 1);
      }
      if (res.addedIndex !== null) {
        columns.splice(res.addedIndex, 0, res.payload);
      }
      const updateColumns = columns.map((e, i) => {
        e.order = i;
        return e;
      });
      const columnsSet = updateColumns.map((e) => ({ _id: e._id, order: e.order }));
      dispatch(reduxProject({ ...data.project, columns: [...updateColumns] }));
      await updateColumnSet(token, columnsSet);
    } catch {
      setAlertError(t('edit:alert') as string);
      setTimeout(() => {
        setAlertError('');
      });
    }
  };

  return (
    <div className={`project${preloader}`}>
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
            <Container
              getChildPayload={(index) => {
                return data.project.columns[index];
              }}
              onDrop={(dropResult) => {
                void updateColumn(dropResult as IDropColumn);
              }}
              nonDragAreaSelector={'.line-input__field'}
              orientation={'horizontal'}
              render={(ref) => (
                <div ref={ref}>
                  {data.project.columns.map((e) => (
                    <BoardCol key={e._id} column={e} tasks={data.project.tasks} />
                  ))}
                </div>
              )}
            />
            <button className="project-create icon-add" onClick={() => setCreateModal(true)}>
              {t('board:column')}
            </button>
          </div>
          {editProject && <EditModalBoard card={data.project.board} control={setEditProject} />}
        </>
      )}
      {createModal && <CreateModal type={'Column'} control={setCreateModal} />}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
