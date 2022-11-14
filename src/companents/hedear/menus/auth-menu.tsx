import React from 'react';

export const MenuAuth = function () {
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li className="header-menu__link header-menu__link--arrow uppercase">login</li>
        <li className="header-menu__link header-menu__link--arrow uppercase">sign up</li>
      </ul>
    </div>
  );
};
