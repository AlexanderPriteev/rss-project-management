import React from 'react';

export const MenuUser = function () {
  return (
    <div className="header-menu">
      <h2 className="header-menu__title">Alexander Priteev</h2>
      <ul className="header-menu__link-list">
        <li className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-project">
          My Projects
        </li>
        <li className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-options">
          Profile
        </li>
        <li className="header-menu__link header-menu__link--icon header-menu__link--arrow icon-logout-outlined">
          Log Out
        </li>
      </ul>
    </div>
  );
};
