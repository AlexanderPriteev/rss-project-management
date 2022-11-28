import React from 'react';
import { MainCard } from './task';
import { useTranslation } from 'react-i18next';

const tpmTask = {
  id: '124',
  title: 'Task1',
  status: 'Backlog',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum pulvinar tincidunt. Maecenas et ipsum tempor, finibus odio sit amet, maximus tortor.',
  projectId: '01',
  projectName: 'PROJECT1',
  members: ['Cameron Williamson', 'Cameron Williamson'],
};

export const MainTasks = function () {
  const { t } = useTranslation();
  return (
    <div className="main-tasks">
      <div className="main-search">
        <i className="main-search__icon icon-search" />
        <input
          type="text"
          className="main-search__field"
          placeholder={t('main:task:search') as string}
        />
      </div>
      <div className="main-card-list">
        <MainCard {...tpmTask} />
        <MainCard {...tpmTask} />
        <MainCard {...tpmTask} />
        <MainCard {...tpmTask} />
        <MainCard {...tpmTask} />
      </div>
    </div>
  );
};
