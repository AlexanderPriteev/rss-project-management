import React, { useEffect, useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { ProjectTask } from './task';
import { CreateModal } from '../../../companents/modal/create-form';
import { useTranslation } from 'react-i18next';
import { IColumn, ITask, updateColumn } from '../../../api/requests';
import { RemoveModalWrap } from '../../../companents/modal/remove-form/wrapper';
import { AlertModal } from '../../../companents/alert';

interface IBoardCol {
  tasks: ITask[];
  column: IColumn;
}

export const colTasks = (tasks: ITask[], columnId: string) => {
  return tasks.filter((e) => e.columnId === columnId);
};

export const BoardCol = function (props: IBoardCol) {
  const [name, setName] = useState(props.column.title);
  const [createModal, setCreateModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [alertError, setAlertError] = useState('');
  const tasks = colTasks(props.tasks, props.column._id);

  useEffect(() => {
    const updateColumnData = async () => {
      try {
        const token = localStorage.getItem('token') as string;
        await updateColumn(token, props.column.boardId, props.column._id, name, props.column.order);
      } catch {
        setAlertError('Server Error');
        setTimeout(() => setAlertError, 3000);
      }
    };

    if (name !== props.column.title) {
      props.column.title = name;
      void updateColumnData();
    }
  }, [name, props.column]);

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
        <i className="project-remove icon-delete" onClick={() => setRemoveModal(true)} />
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
      {createModal && (
        <CreateModal type={'Task'} control={setCreateModal} columnId={props.column._id} />
      )}
      {removeModal && (
        <RemoveModalWrap
          type={'Column'}
          id={props.column._id}
          name={props.column.title}
          control={setRemoveModal}
        />
      )}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </div>
  );
};
