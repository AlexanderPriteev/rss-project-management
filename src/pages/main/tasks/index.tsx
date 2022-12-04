import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../state';
import { MainCard } from './task';

export const MainTasks = function () {
  const { t } = useTranslation();
  const tasks = useSelector((state: StateReduxInterface) => state.tasks);

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
        {tasks.map((e) => (
          <MainCard key={e._id} {...e} />
        ))}
      </div>
    </div>
  );
};
