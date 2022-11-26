import React from 'react';
import { MainBoards } from './boards';
import { MainTasks } from './tasks';

export const Main = function () {
  return (
    <div className="main">
      <MainBoards />
      <MainTasks />
    </div>
  );
};
