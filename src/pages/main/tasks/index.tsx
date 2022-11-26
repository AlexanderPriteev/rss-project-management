import React, { useState } from 'react';
import { MainCard } from './task';

const tpmTask = {
  id: '124',
  title: 'Task1',
  status: 'Backlog',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum pulvinar tincidunt. Maecenas et ipsum tempor, finibus odio sit amet, maximus tortor.',
  projectId: '01',
  projectName: 'PROJECT1',
};

export const MainTasks = function () {
  return (
    <div className="main-tasks">
      <div className="main-search">
        <i className="main-search__icon icon-search" />
        <input type="text" className="main-search__field" placeholder="SEARCH TASK" />
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
