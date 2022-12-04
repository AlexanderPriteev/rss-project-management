import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertModal } from '../../alert';
import {
  deleteBoard,
  deleteColumnById,
  deleteTask,
  updateBoard,
  updateColumnSet,
} from '../../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, reduxProject, StateReduxInterface } from '../../../state';
import { ModalType } from '../create-form';
import { colTasks } from '../../../pages/board/column';
import { IBoard } from '../../../pages/main/boards/board';

export interface IRemoveModal {
  name: string;
  id: string;
  type: ModalType;
  control: React.Dispatch<React.SetStateAction<boolean>>;
  boardId?: string;
  columnId?: string;
}

export const RemoveModal = function (props: IRemoveModal) {
  const { t } = useTranslation();
  const token = localStorage.getItem('token') as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [alertError, setAlertError] = useState('');

  const removeColumn = async (colorId: string) => {
    try {
      const boardId = data.project.board?._id as string;
      const columnId = colorId;
      const path = `boards/${boardId}/columns/${columnId}`;
      const tasksId = colTasks(data.project.tasks, columnId).map((e) => e._id);
      await deleteColumnById(token, path);
      const columns = data.project.columns
        .filter((e) => e._id !== columnId)
        .map((e, i) => {
          e.order = i;
          return e;
        });

      const tasksSet = data.project.tasks.filter((e) => !tasksId.includes(e._id));
      dispatch(reduxProject({ ...data.project, columns: columns, tasks: tasksSet }));
      const columnsSet = columns.map((e) => {
        return { _id: e._id, order: e.order };
      });

      await updateColumnSet(token, columnsSet);
    } catch {
      setAlertError(t('remove:alert') as string);
    }
  };

  const remove = async () => {
    try {
      switch (props.type) {
        case 'Task':
          const path = `boards/${props.boardId}/columns/${props.columnId}/tasks/${props.id}`;
          await deleteTask(token, path);
          dispatch(
            reduxProject({
              ...data.project,
              tasks: data.project.tasks.filter((e) => e._id !== props.id),
            })
          );
          break;
        case 'Column':
          await removeColumn(props.id);
          break;
        case 'Board-Leave':
          const boardUser = data.boards.find((e) => e._id === props.id) as IBoard;
          await updateBoard(
            token,
            boardUser._id,
            boardUser.title,
            boardUser.owner,
            boardUser.users.filter((e) => e !== data.user._id)
          );
          dispatch(reduxBoards(data.boards.filter((e) => e._id !== props.id)));
          break;
        case 'Board':
          await deleteBoard(token, props.id);
          dispatch(reduxBoards(data.boards.filter((e) => e._id !== props.id)));
      }
      props.control(false);
    } catch {
      setAlertError(t('remove:alert') as string);
      setTimeout(() => setAlertError(''), 3000);
    }
  };

  return (
    <div className="remove-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-body">
        <h2 className="remove-modal-title">{t('remove:title')}</h2>
        <p className="remove-modal-subtitle">
          {t(`remove:${props.type === 'Board-Leave' ? 'leave' : 'subtitle'}`)} {props.name}.
        </p>
        <p className="remove-modal-about">
          {t('remove:about:0')}
          <span className="bold">{props.name}</span>
          {t('remove:about:1')}
        </p>
        <input
          type="text"
          className="remove-modal-field"
          placeholder={t('remove:placeholder') as string}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <button
          className={`modal-btn bg-red${value !== props.name ? ' disabled' : ''}`}
          onClick={() => remove()}
        >
          {t(`remove:${props.type === 'Board-Leave' ? 'btn-leave' : 'btn'}`)}
        </button>
      </div>
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
