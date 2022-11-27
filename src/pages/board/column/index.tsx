import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { ProjectTask } from './task';
import { ICard } from '../../main/tasks/task';
import { CreateModal } from '../../../companents/modal/create-form';

interface IBoardCol {
  tasks?: ICard[];
}

export const BoardCol = function (taskList: IBoardCol) {
  const [name, setName] = useState('Backlog');
  const [createModal, setCreateModal] = useState(false);
  return (
    <div className="project-col">
      <div className="project-col__head">
        <LineInput
          hasIcons={true}
          isReadOnly={true}
          defValue={name}
          setValue={setName}
          wrapperStyles={'project-col__title'}
        />
        <i className="project-remove icon-delete" />
      </div>
      <div className="project-col__body">
        <div className="project-col__tasks">
          {taskList.tasks &&
            taskList.tasks.map((e, i) => (
              <ProjectTask key={`${i}-${new Date().getTime()}`} {...e} />
            ))}
        </div>
        <button
          className="project-create project-create--task icon-add"
          onClick={() => setCreateModal(true)}
        >
          Create Task
        </button>
      </div>
      {createModal && <CreateModal type={'Task'} control={setCreateModal} />}
    </div>
  );
};
