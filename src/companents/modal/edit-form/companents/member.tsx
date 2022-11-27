import React from 'react';

interface ITaskMember {
  member: string;
  setRemove: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskMember = function (props: ITaskMember) {
  return (
    <div className="edit-modal__member">
      <span className="edit-modal__member-name">{props.member}</span>
      <i
        className="edit-modal__member-remove icon-close"
        onClick={() => props.setRemove(props.member)}
      />
    </div>
  );
};
