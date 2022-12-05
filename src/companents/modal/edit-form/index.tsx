import React, { useEffect, useState } from 'react';
import { LineInput } from '../../line-input';
import { TaskMember } from './companents/member';
import { TaskTextarea } from './companents/textarea';
import { IMember } from '../companents/add-member';
import { RemoveModal } from '../remove-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reduxProject, StateReduxInterface } from '../../../state';
import { SelectMember } from '../companents/select-member';
import { getMemberSet } from '../../../methods/get-member';
import { ITask, updateTask } from '../../../api/requests';
import { AlertModal } from '../../alert';

export interface IEditModal extends ITask {
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModal = function (props: IEditModal) {
  const data = useSelector((state: StateReduxInterface) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectMembersID = data.project.board?.users.filter((e) => !props.users.includes(e));
  const selectMembersName = data.project.board?.usersName?.filter(
    (e) => !props.usersName?.includes(e)
  );
  const usersBoardCount = data.project.board?.users.length;

  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.description);
  const [members, setMembers] = useState(props.usersName);
  const [membersID, setMembersID] = useState(props.users);
  const [remove, setRemove] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [newMembers, setNewMembers] = useState([] as IMember[]);
  const [alertError, setAlertError] = useState('');
  const [preloader, setPreloader] = useState('');

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  useEffect(() => {
    if (remove) {
      const idInArray = membersID.indexOf(remove);
      setMembers(members?.filter((e, i) => i !== idInArray));
      setMembersID(membersID.filter((e, i) => i !== idInArray));
      setRemove('');
    }
  }, [members, membersID, remove]);

  const update = async () => {
    try {
      setPreloader(' spinner-btn spinner-btn--dark');
      const token = localStorage.getItem('token') as string;
      const membersSet = getMemberSet(membersID, members as string[]).concat(newMembers);
      const path = `boards/${props.boardId}/columns/${props.columnId}/tasks/${props._id}`;
      const updateData: ITask = {
        title: title,
        order: props.order,
        description: desc,
        columnId: props.columnId,
        userId: props.userId,
        users: membersSet.map((e) => e.id),
      };
      await updateTask(token, path, updateData);
      dispatch(
        reduxProject({
          ...data.project,
          tasks: data.project.tasks.map((e) => {
            if (e._id === props._id) {
              e.title = title;
              e.description = desc;
              e.users = membersSet.map((e1) => e1.id);
              e.usersName = membersSet.map((e1) => e1.login);
            }
            return e;
          }),
        })
      );
      setPreloader('');
      close();
    } catch {
      setAlertError(t('edit:alert') as string);
      setTimeout(() => setAlertError(''), 3000);
    }
  };

  return (
    <div className="modal-wrapper" onClick={close}>
      {!removeModal && (
        <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
          <LineInput
            hasIcons={true}
            isReadOnly={true}
            defValue={title}
            setValue={setTitle}
            wrapperStyles={'edit-modal__title'}
          />

          <TaskTextarea description={desc} setDescription={setDesc} />
          <div className="modal-row">
            <span className="modal-subtitle">{t('edit:owner')}</span>
            <span className="modal-data">{props.owner}</span>
          </div>

          <div className="edit-modal__members">
            <div className="edit-modal__member-list">
              {membersID.map((e, i) => (
                <TaskMember
                  member={members ? members[i] : ''}
                  id={e}
                  userId={data.user._id as string}
                  setRemove={setRemove}
                  key={e}
                />
              ))}
            </div>
            {!addMember && !!usersBoardCount && props.users.length !== usersBoardCount && (
              <span className="edit-modal-btn icon-add" onClick={() => setAddMember(true)}>
                {t('edit:add')}
              </span>
            )}
          </div>

          {addMember && (
            <SelectMember
              membersId={selectMembersID as string[]}
              membersName={selectMembersName as string[]}
              setList={setNewMembers}
            />
          )}

          <div className="edit-modal__controls">
            <button className={`edit-modal-btn icon-check${preloader}`} onClick={update}>
              {t('edit:update')}
            </button>
            <button
              className="edit-modal-btn icon-delete c-red"
              onClick={() => setRemoveModal(true)}
            >
              {t('edit:remove')}
            </button>
          </div>
        </div>
      )}
      {removeModal && (
        <RemoveModal
          name={title}
          id={props._id as string}
          type={'Task'}
          boardId={props.boardId}
          columnId={props.columnId}
          control={props.control}
        />
      )}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
