import React, { useState } from 'react';
import { AddMember, IMember } from '../companents/add-member';
import { LineInput } from '../../line-input';
import { useTranslation } from 'react-i18next';
import { createBoard } from '../../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, StateReduxInterface } from '../../../state';
import { getDate } from '../../../methods/get-date';
import { AlertModal } from '../../alert';
import { IBoard } from '../../../pages/main/boards/board';

export type ModalType = 'Task' | 'Board' | 'Column';
interface ICreateModal {
  type: ModalType;
  link?: string;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateModal = function (props: ICreateModal) {
  const token = localStorage.getItem('token') as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [newMembers, setNewMembers] = useState([] as IMember[]);
  const [alertError, setAlertError] = useState('');
  const type = t(`create:type:${+(props.type !== 'Task')}`);

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');

  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  const create = async () => {
    try {
      if (props.type === 'Board') {
        const users = newMembers.map((e) => e.id);
        const usersName = newMembers.map((e) => e.name || e.login);
        const name = `${getDate()} - ${title}`;
        const newBoard = (await createBoard(token, name, data.user._id as string, users)) as IBoard;
        dispatch(
          reduxBoards([
            ...data.boards,
            {
              _id: newBoard._id,
              title: name,
              users: users,
              owner: data.user._id as string,
              count: 0,
              ownerName: data.user.name,
              usersName: usersName,
            },
          ])
        );
      }
      close();
    } catch {
      setAlertError(t('create:alert') as string);
    }
  };

  return (
    <div className="modal-wrapper" onClick={close}>
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body create-modal__body">
          <LineInput
            label={`${type} ${t('create:name')}`}
            defValue={title}
            setValue={setTitle}
            isString={false}
            wrapperStyles={'create-modal-field'}
          />
          {props.type === 'Task' ? (
            <textarea
              className="create-modal-area"
              placeholder={`${t('create:placeholder:0')}${type.toLowerCase()}${t(
                'create:placeholder:1'
              )}`}
            />
          ) : (
            <AddMember setList={setNewMembers} />
          )}
        </div>
        <div className="modal-footer">
          <button
            className={`modal-btn${!title.length ? ' disabled' : ''}`}
            onClick={() => create()}
          >
            {t('create:btn')}
            {type}
          </button>
        </div>
      </div>
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
