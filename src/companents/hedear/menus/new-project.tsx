import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuNewProject = function () {
  const router = useNavigate();
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li
          className="header-menu__link header-menu__link--icon icon-add"
          onClick={() => router(`/projects`, { state: true })}
        >
          Create New Board
        </li>
      </ul>
    </div>
  );
};
