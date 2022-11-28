import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuUser = function () {
  const router = useNavigate();
  return (
    <div className="header-menu">
      <h2 className="header-menu__title">Alexander Priteev</h2>
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-project"
          onClick={() => router(`/projects`)}
        >
          My Projects
        </li>
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-options"
          onClick={() => router(`/profile`)}
        >
          Profile
        </li>
        <li
          className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-logout-outlined"
          onClick={() => router(`/`)}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};
