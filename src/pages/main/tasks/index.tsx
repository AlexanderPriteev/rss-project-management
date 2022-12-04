import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../../state';
import { MainCard } from './task';

export const MainTasks = function () {
  const { t } = useTranslation();
  const data = useSelector((state: StateReduxInterface) => state.tasks);
  const [tasks, setTasks] = useState(data);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('TASK_NAME');
  useMemo(() => {
    const filterTasks = [...data].filter((e) => {
      switch (select) {
        case 'BOARD_NAME':
          return e.boardName?.toLowerCase().includes(search.toLowerCase());
        case 'STATUS_NAME':
          return e.columnName?.toLowerCase().includes(search.toLowerCase());
        case 'DESCRIPTION_VAlUE':
          return e.description.toLowerCase().includes(search.toLowerCase());
        default:
          return e.title.toLowerCase().includes(search.toLowerCase());
      }
    });
    setTasks(filterTasks);
  }, [data, search, select]);

  return (
    <div className="main-tasks">
      <div className="main-search">
        <i className="main-search__icon icon-search" />
        <input
          type="text"
          className="main-search__field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('main:task:search') as string}
        />
        <div className="main-search__select-wrapper">
          <span className="main-search__label">{t('main:task:select:label')}</span>
          <select
            className="main-search__select"
            defaultValue={select}
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="TASK_NAME">{t('main:task:select:task')}</option>
            <option value="BOARD_NAME">{t('main:task:select:board')}</option>
            <option value="STATUS_NAME">{t('main:task:select:status')}</option>
            <option value="DESCRIPTION_VAlUE">{t('main:task:select:desc')}</option>
          </select>
        </div>
      </div>
      <div className="main-card-list">
        {tasks.map((e) => (
          <MainCard key={e._id} {...e} />
        ))}
      </div>
    </div>
  );
};
