import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuAuth = function () {
  const router = useNavigate();
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--arrow uppercase"
          onClick={() => router(`/login`)}
        >
          login
        </li>
        <li
          className="header-menu__link header-menu__link--arrow uppercase"
          onClick={() => router(`/sign-up`)}
        >
          sign up
        </li>
      </ul>
    </div>
  );
};
