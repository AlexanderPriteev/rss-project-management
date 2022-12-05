import React, { useState } from 'react';
import { AddMember, IMember } from '../companents/add-member';
import { LineInput } from '../../line-input';
import { useTranslation } from 'react-i18next';
import {
  createBoard,
  createColumn,
  createTask,
  getColumnTasks,
  ITask,
} from '../../../api/requests';
import { useDispatch, useSelector } from 'react-redux';
import { reduxBoards, reduxProject, StateReduxInterface } from '../../../state';
import { getDate } from '../../../methods/get-date';
import { AlertModal } from '../../alert';
import { IBoard } from '../../../pages/main/boards/board';
import { SelectMember } from '../companents/select-member';

export type ModalType = 'Task' | 'Board' | 'Column' | 'Board-Leave';
interface ICreateModal {
  type: ModalType;
  link?: string;
  control: React.Dispatch<React.SetStateAction<boolean>>;
  columnId?: string;
}

export const CreateModal = function (props: ICreateModal) {
  const token = localStorage.getItem('token') as string;
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [title, setTitle] = useState(props.type === 'Column' ? 'Backlog' : '');
  const [description, setDescription] = useState('');
  const [newMembers, setNewMembers] = useState([] as IMember[]);
  const [alertError, setAlertError] = useState('');
  const [preloader, setPreloader] = useState('');
  const type = t(`create:type:${+(props.type !== 'Task')}`);

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');

  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  const create = async () => {
    try {
      setPreloader(' spinner-btn');
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
      } else if (props.type === 'Task') {
        const usersId = newMembers.map((e) => e.id);
        const usersName = newMembers.map((e) => e.login);
        const path = `boards/${data.project.board?._id}/columns/${props.columnId}/tasks`;
        const order = ((await getColumnTasks(token, path)) as ITask[]).length;
        const task: ITask = {
          title: title,
          order: order,
          description: description || ' ',
          userId: data.user._id as string,
          users: usersId,
        };
        const newTask = (await createTask(token, path, task)) as ITask;
        const updateTask = {
          ...newTask,
          usersName: usersName,
          owner: data.user.name,
          board: data.project.board,
          columnId: props.columnId,
        };
        dispatch(reduxProject({ ...data.project, tasks: [...data.project.tasks, updateTask] }));
      } else {
        const order = data.project.columns.length;
        const newColumn = await createColumn(
          token,
          data.project.board?._id as string,
          title,
          order
        );
        const columns = [...data.project.columns, newColumn];
        dispatch(reduxProject({ ...data.project, columns: columns }));
      }
      close();
    } catch {
      setAlertError(t('create:alert') as string);
      setTimeout(() => setAlertError(''), 3000);
    }
    setPreloader('');
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
          {props.type === 'Task' && (
            <>
              <textarea
                className="create-modal-area"
                placeholder={`${t('create:placeholder:0')}${type.toLowerCase()}${t(
                  'create:placeholder:1'
                )}`}
                onChange={(e) => setDescription(e.target.value)}
              />
              {!!data.project.board?.users.length && (
                <SelectMember
                  membersId={data.project.board?.users as string[]}
                  membersName={data.project.board?.usersName as string[]}
                  setList={setNewMembers}
                />
              )}
            </>
          )}
          {props.type === 'Board' && <AddMember setList={setNewMembers} />}
        </div>
        <div className="modal-footer">
          <button
            className={`modal-btn${!title.length ? ' disabled' : ''}${preloader}`}
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
