import React, { useEffect, useState } from 'react';
import { LineInput } from '../../line-input';
import { TaskMember } from './companents/member';
import { TaskTextarea } from './companents/textarea';
import { AddMember, IMember } from '../companents/add-member';
import { RemoveModal } from '../remove-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../state';

export interface IEditModal {
  id: string;
  title: string;
  description: string;
  owner: string;
  members: string[];
  usersId: string[];
  boardId: string;
  columnId: string;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModal = function (props: IEditModal) {
  const data = useSelector((state: StateReduxInterface) => state);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.description);
  const [members, setMembers] = useState(props.members);
  const [membersID, setMembersID] = useState(props.usersId);
  const [remove, setRemove] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [newMembers, setNewMembers] = useState([] as IMember[]);
  const { t } = useTranslation();

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  useEffect(() => {
    if (remove) {
      setMembers(members.filter((e) => e !== remove));
      setRemove('');
    }
  }, [members, remove]);

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

          {desc && <TaskTextarea description={desc} setDescription={setDesc} />}

          <div className="edit-modal__members">
            <div className="edit-modal__member-list">
              {membersID.map((e, i) => (
                <TaskMember
                  member={members[i]}
                  id={e}
                  userId={data.user._id as string}
                  setRemove={setRemove}
                  key={e}
                />
              ))}
            </div>
            {!addMember && (
              <span className="edit-modal-btn icon-add" onClick={() => setAddMember(true)}>
                {t('edit:add')}
              </span>
            )}
          </div>
          {addMember && <AddMember setList={setNewMembers} />}

          <div className="edit-modal__controls">
            <button className="edit-modal-btn icon-check">{t('edit:update')}</button>
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
          id={props.id}
          type={'Task'}
          boardId={props.boardId}
          columnId={props.columnId}
          control={props.control}
        />
      )}
    </div>
  );
};
