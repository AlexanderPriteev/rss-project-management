import React, { useState } from 'react';
import { EditModal, IEditModal } from '../../../../companents/modal/edit-form';
import { ITask } from '../../../../api/requests';

export const ProjectTask = function (props: ITask) {
  const [modal, setModal] = useState(false);

  const modalData: IEditModal = {
    id: props._id as string,
    title: props.title,
    description: props.description,
    owner: props.owner as string,
    members: props.usersName as string[],
    usersId: props.users,
    control: setModal,
    boardId: props.boardId as string,
    columnId: props.columnId as string,
  };

  return (
    <>
      <div className="project-task" onClick={() => setModal(true)}>
        {props.title}
      </div>
      {modal && <EditModal {...modalData} />}
    </>
  );
};
