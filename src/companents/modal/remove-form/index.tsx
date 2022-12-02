import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertModal } from '../../alert';
import { deleteBoard, deleteColumnById, deleteTask } from '../../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, StateReduxInterface } from '../../../state';
import { ModalType } from '../create-form';

export interface IRemoveModal {
  name: string;
  path: string;
  type: ModalType;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveModal = function (props: IRemoveModal) {
  const { t } = useTranslation();
  const token = localStorage.getItem('token') as string;
  const boards = useSelector((state: StateReduxInterface) => state.boards);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [alertError, setAlertError] = useState('');

  const remove = async () => {
    try {
      switch (props.type) {
        case 'Task':
          await deleteTask(token, props.path);
          break;
        case 'Column':
          await deleteColumnById(token, props.path);
          break;
        case 'Board':
          await deleteBoard(token, props.path);
          dispatch(reduxBoards(boards.filter((e) => e._id !== props.path)));
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
