import React from 'react';
import { MainBoards } from './boards';
import { MainTasks } from './tasks';
import { useCheckUser } from '../../api/checkAuth';

export const Main = function () {
  useCheckUser();
  return (
    <div className="main">
      <MainBoards />
      <MainTasks />
    </div>
  );
};
