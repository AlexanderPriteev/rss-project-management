import React, { useEffect, useState } from 'react';
import { LineInput } from '../../line-input';
import { TaskMember } from './companents/member';
import { TaskTextarea } from './companents/textarea';
import { AddMember } from '../companents/add-member';
import { RemoveModal } from '../remove-form';

interface IEditModal {
  title: string;
  description: string;
  members: string[];
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModal = function (projectTask: IEditModal) {
  const [title, setTitle] = useState(projectTask.title);
  const [desc, setDesc] = useState(projectTask.description);
  const [members, setMembers] = useState(projectTask.members);
  const [remove, setRemove] = useState('');
  const [addMember, setAddMember] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    projectTask.control(false);
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

          <TaskTextarea description={desc} setDescription={setDesc} />
          <div className="edit-modal__members">
            <div className="edit-modal__member-list">
              {[...new Set(members)].map((e) => (
                <TaskMember member={e} setRemove={setRemove} key={e} />
              ))}
            </div>
            {!addMember && (
              <span className="edit-modal-btn icon-add" onClick={() => setAddMember(true)}>
                add member
              </span>
            )}
          </div>
          {addMember && <AddMember />}

          <div className="edit-modal__controls">
            <button className="edit-modal-btn icon-check">update task</button>
            <button
              className="edit-modal-btn icon-delete c-red"
              onClick={() => setRemoveModal(true)}
            >
              remove task
            </button>
          </div>
        </div>
      )}
      {removeModal && <RemoveModal name={title} />}
    </div>
  );
};
