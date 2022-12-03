import React, { useState } from 'react';
import { EditModal, IEditModal } from '../../../../companents/modal/edit-form';
import { ITask } from '../../../../api/requests';

export const ProjectTask = function (props: ITask) {
  const [modal, setModal] = useState(false);

  const modalData: IEditModal = {
    title: props.title,
    description: props.description,
    members: props.usersName as string[],
    usersId: props.users,
    control: setModal,
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
