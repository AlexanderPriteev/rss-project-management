import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MenuUser = function () {
  const router = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="header-menu">
      <h2 className="header-menu__title">Alexander Priteev</h2>
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-project"
          onClick={() => router(`/projects`)}
        >
          {t('header:user:projects')}
        </li>
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-options"
          onClick={() => router(`/profile`)}
        >
          {t('header:user:profile')}
        </li>
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-logout-outlined"
          onClick={() => router(`/`)}
        >
          {t('header:user:logout')}
        </li>
      </ul>
    </div>
  );
};
