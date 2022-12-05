import React from 'react';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../../state';

interface ITaskMember {
  id: string;
  member: string;
  setRemove: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}

export const TaskMember = function (props: ITaskMember) {
  const stateID = useSelector((state: StateReduxInterface) => state.user._id);

  return (
    <div className="edit-modal__member">
      <span className="edit-modal__member-name">{props.member}</span>
      {stateID === props.userId && (
        <i
          className="edit-modal__member-remove icon-close"
          onClick={() => props.setRemove(props.id)}
        />
      )}
    </div>
  );
};
