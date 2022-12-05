import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reduxUser, StateReduxInterface } from '../../../state';
import { Dispatch } from 'redux';

export const userLogOut = (dispatch: Dispatch) => {
  localStorage.setItem('userId', '');
  localStorage.setItem('token', '');
  dispatch(reduxUser({ _id: '', login: '', password: '', name: '' }));
};

export const MenuUser = function () {
  const router = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userName = useSelector((state: StateReduxInterface) => state.user);
  const logOut = () => {
    userLogOut(dispatch);
    router('/');
  };
  return (
    <div className="header-menu">
      <h2 className="header-menu__title">{userName.name}</h2>
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
          onClick={() => logOut()}
        >
          {t('header:user:logout')}
        </li>
      </ul>
    </div>
  );
};
