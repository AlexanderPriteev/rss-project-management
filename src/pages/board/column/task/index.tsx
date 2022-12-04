import React from 'react';
import { ITask } from '../../../../api/requests';
import { Draggable } from 'react-smooth-dnd';

interface IProjectTask {
  task: ITask;
  control: React.Dispatch<React.SetStateAction<boolean>>;
  dataControl: React.Dispatch<React.SetStateAction<ITask | null>>;
}

export const ProjectTask = function (props: IProjectTask) {
  return (
    <Draggable
      render={() => (
        <div>
          <div
            className="project-task"
            onClick={() => {
              props.control(true);
              props.dataControl(props.task);
            }}
          >
            {props.task.title}
          </div>
        </div>
      )}
    />
  );
};
