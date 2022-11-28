import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MenuNewProject = function () {
  const router = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--icon icon-add"
          onClick={() => router(`/projects`, { state: true })}
        >
          {t('header:newBoard')}
        </li>
      </ul>
    </div>
  );
};
