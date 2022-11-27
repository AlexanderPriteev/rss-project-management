import React, { useState } from 'react';
import { ICard } from '../../../main/tasks/task';
import { EditModal } from '../../../../companents/modal/edit-form';

export const ProjectTask = function (projectTask: ICard) {
  const [modal, setModal] = useState(false);

  const modalData = {
    title: projectTask.title,
    description: projectTask.description,
    members: projectTask.members,
    control: setModal,
  };

  return (
    <>
      <div className="project-task" onClick={() => setModal(true)}>
        {projectTask.title}
      </div>
      {modal && <EditModal {...modalData} />}
    </>
  );
};
