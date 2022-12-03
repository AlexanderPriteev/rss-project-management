import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertModal } from '../../alert';
import { deleteBoard, deleteColumnById, deleteTask, updateColumnSet } from '../../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, reduxProject, StateReduxInterface } from '../../../state';
import { ModalType } from '../create-form';
import { colTasks } from '../../../pages/board/column';

export interface IRemoveModal {
  name: string;
  id: string;
  type: ModalType;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveModal = function (props: IRemoveModal) {
  const { t } = useTranslation();
  const token = localStorage.getItem('token') as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();

  const removeColumn = async (colorId: string) => {
    try {
      const boardId = data.project.board?._id as string;
      const columnId = colorId;
      const path = `boards/${boardId}/columns/${columnId}`;
      console.log(path);
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

  const [value, setValue] = useState('');
  const [alertError, setAlertError] = useState('');

  const remove = async () => {
    try {
      switch (props.type) {
        case 'Task':
          await deleteTask(token, props.id);
          break;
        case 'Column':
          await removeColumn(props.id);
          break;
        case 'Board':
          await deleteBoard(token, props.id);
          dispatch(reduxBoards(data.boards.filter((e) => e._id !== props.id)));
      }
      props.control(false);
    } catch {
      setAlertError(t('remove:alert') as string);
    }
  };

  return (
    <div className="remove-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-body">
        <h2 className="remove-modal-title">{t('remove:title')}</h2>
        <p className="remove-modal-subtitle">
          {t('remove:subtitle')} {props.name}.
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
          {t('remove:btn')}
        </button>
      </div>
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
