import React, { useEffect, useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { ProjectTask } from './task';
import { CreateModal } from '../../../companents/modal/create-form';
import { useTranslation } from 'react-i18next';
import { IColumn, ITask, ITaskSet, updateColumn, updateTaskSet } from '../../../api/requests';
import { RemoveModalWrap } from '../../../companents/modal/remove-form/wrapper';
import { AlertModal } from '../../../companents/alert';

import { Container, Draggable } from 'react-smooth-dnd';
import { EditModal } from '../../../companents/modal/edit-form';
import { reduxProject, StateReduxInterface } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';

interface IBoardCol {
  tasks: ITask[];
  column: IColumn;
}

interface IDropTask {
  addedIndex: number;
  payload: ITask;
  removedIndex: number;
}

export const colTasks = (tasks: ITask[], columnId: string) => {
  return tasks.filter((e) => e.columnId === columnId);
};

export const BoardCol = function (props: IBoardCol) {
  const token = localStorage.getItem('token') as string;
  const project = useSelector((state: StateReduxInterface) => state.project);
  const dispatch = useDispatch();

  const [name, setName] = useState(props.column.title);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dataModal, setDataModal] = useState(null as null | ITask);
  const [removeModal, setRemoveModal] = useState(false);
  const [alertError, setAlertError] = useState('');
  const tasks = colTasks(props.tasks, props.column._id);

  useEffect(() => {
    const updateColumnData = async () => {
      try {
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
  }, [name, props.column, token]);

  const { t } = useTranslation();

  const updateTasks = (res: IDropTask) => {
    if (res.removedIndex !== null) {
      const leaveTask = project.tasks.map((e) => {
        if (e._id === res.payload._id) {
          e.order = -1;
        }
        if (e.order > res.removedIndex) {
          e.order -= 1;
        }
        return e;
      });
      dispatch(reduxProject({ ...project, tasks: [...leaveTask] }));
    }
    if (res.addedIndex !== null) {
      setTimeout(async () => {
        try {
          const updateTasks = project.tasks.map((e) => {
            if (e.columnId === props.column._id && e.order >= res.addedIndex) {
              e.order += 1;
            }
            if (e.order === -1) {
              e.order = res.addedIndex;
              e.columnId = props.column._id;
            }

            return e;
          });
          updateTasks.sort((a, b) => a.order - b.order);
          dispatch(reduxProject({ ...project, tasks: [...updateTasks] }));
          const taskSet = updateTasks.map((e) => ({
            _id: e._id,
            order: e.order,
            columnId: e.columnId,
          }));
          await updateTaskSet(token, taskSet as ITaskSet[]);
        } catch {
          setAlertError(t('edit:alert') as string);
          setTimeout(() => {
            setAlertError('');
          });
        }
      });
    }
  };

  return (
    <>
      <Draggable
        render={() => (
          <div>
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
                  <Container
                    getChildPayload={(index) => {
                      return tasks[index];
                    }}
                    onDrop={(dropResult) => {
                      updateTasks(dropResult as IDropTask);
                    }}
                    groupName={'Column'}
                    render={(ref) => (
                      <div ref={ref}>
                        {tasks.map((e) => (
                          <ProjectTask
                            key={e._id}
                            task={e}
                            control={setEditModal}
                            dataControl={setDataModal}
                          />
                        ))}
                      </div>
                    )}
                  />
                </div>
                <button
                  className="project-create project-create--task icon-add"
                  onClick={() => setCreateModal(true)}
                >
                  {t('board:task')}
                </button>
              </div>
            </div>
          </div>
        )}
      />
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
      {editModal && <EditModal {...(dataModal as ITask)} control={setEditModal} />}
      {alertError && <AlertModal title={alertError} setTitle={setAlertError} />}
    </>
  );
};
