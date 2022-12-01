import React, { useState } from 'react';
import { BoardCol } from './column';
import { tmpBoard } from '../main/boards';
import { EditModal } from '../../companents/modal/edit-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCheckUser } from '../../api/checkAuth';

const tmpTasks = {
  tasks: new Array(4).fill({
    id: `${Math.floor(Math.random() * 100000)}`,
    title: 'Task1 TO DO',
    status: 'backlog',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum pulvinar tincidunt. Maecenas et ipsum tempor, finibus odio sit amet, maximus tortor.',
    projectId: '0001',
    projectName: 'Project 1 New Project',
    members: ['Jane Cooper', 'Cameron Williamson', 'Cameron Williamson'],
  }),
};

export const ProjectBoard = function () {
  useCheckUser();
  const router = useNavigate();
  const { t } = useTranslation();

  const [editProject, setEditProject] = useState(false);
  const [cols, setCols] = useState([] as string[]);
  const createCol = () => {
    setCols([...cols, `${new Date().getTime()}`]);
  };
  return (
    <div className="project">
      <div className="project__headline">
        <span className="project-title icon-prev-arrow" onClick={() => router(`/projects`)}>
          <span className="project-title__text">{tmpBoard.title}</span>
        </span>
        <span className="project-board-edit icon-book" onClick={() => setEditProject(true)}>
          {t('board:project')}
        </span>
      </div>
      <div className="project-wrapper">
        <div className="project-col-list">
          <BoardCol {...tmpTasks} />
          {cols.map((e) => (
            <BoardCol key={e} />
          ))}
        </div>
        <button className="project-create icon-add" onClick={() => createCol()}>
          {t('board:column')}
        </button>
      </div>
      {editProject && (
        <EditModal
          title={tmpBoard.title}
          description={tmpBoard.description}
          members={tmpBoard.team}
          control={setEditProject}
        />
      )}
    </div>
  );
};
