import React, { useState } from 'react';
import { EditModal, IEditModal } from '../../../../companents/modal/edit-form';
import { ITask } from '../../../../api/requests';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../../state';

interface IProjectTask {
  task: ITask;
  index: number;
}

export const ProjectTask = function (props: IProjectTask) {
  const [modal, setModal] = useState(false);
  const modalData: IEditModal = { ...props.task, control: setModal };

  return (
    <>
      <Draggable draggableId={props.task._id as string} index={props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="project-task"
            onClick={() => {
              setModal(true);
              console.log('test');
            }}
          >
            {props.task.title}
          </div>
        )}
      </Draggable>
      {modal && <EditModal {...modalData} />}
    </>
  );
};
