import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MenuAuth = function () {
  const router = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--arrow uppercase"
          onClick={() => router(`/login`)}
        >
          {t('header:auth:login')}
        </li>
        <li
          className="header-menu__link header-menu__link--arrow uppercase"
          onClick={() => router(`/sign-up`)}
        >
          {t('header:auth:signup')}
        </li>
      </ul>
    </div>
  );
};
