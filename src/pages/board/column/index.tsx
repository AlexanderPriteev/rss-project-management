import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { ProjectTask } from './task';
import { CreateModal } from '../../../companents/modal/create-form';
import { useTranslation } from 'react-i18next';
import { IColumn, ITask } from '../../../api/requests';

interface IBoardCol {
  tasks?: ITask[];
  column?: IColumn;
}

const colTasks = (tasks?: ITask[], column?: IColumn) => {
  if (tasks && column) {
    return tasks.filter((e) => e.columnId === column._id);
  }
  return [];
};

export const BoardCol = function (props: IBoardCol) {
  const [name, setName] = useState(props.column?.title || 'Backlog');
  const [createModal, setCreateModal] = useState(false);
  const [tasks, setTasks] = useState(colTasks(props.tasks, props.column));

  const { t } = useTranslation();
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
          {tasks.map((e) => (
            <ProjectTask key={e._id} {...e} />
          ))}
        </div>
        <button
          className="project-create project-create--task icon-add"
          onClick={() => setCreateModal(true)}
        >
          {t('board:task')}
        </button>
      </div>
      {createModal && <CreateModal type={'Task'} control={setCreateModal} />}
    </div>
  );
};
