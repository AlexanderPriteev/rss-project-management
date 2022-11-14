import React, { useEffect, useState } from 'react';
import { ReactComponent as MainLogo } from '../../assets/images/logo.svg';
import { MenuNewProject } from './menus/new-project';
import { MenuUser } from './menus/user-menu';
import { MenuLang } from './menus/lang-menu';

const USER_MENU = 'USER_MENU';
const NEW_PROJECT = 'NEW_PROJECT';
const LANGUAGE = 'LANGUAGE';
type HeaderMenu = 'USER_MENU' | 'NEW_PROJECT' | 'LANGUAGE' | null;
export type CurrentLanguage = 'EN' | 'RU';

const currentMenu = (setMenu: React.Dispatch<React.SetStateAction<HeaderMenu>>) => {
  document.onclick = (e: MouseEvent) => {
    const elementID = (e.target as HTMLElement).id;
    switch (elementID) {
      case 'lang':
        setMenu(LANGUAGE);
        break;
      case 'project':
        setMenu(NEW_PROJECT);
        break;
      case 'user':
        setMenu(USER_MENU);
        break;
      default:
        setMenu(null);
    }
  };
};

export const Header = function () {
  const [menu, setMenu] = useState(null as HeaderMenu);
  const [language, setLanguage] = useState('EN' as CurrentLanguage);
  useEffect(() => currentMenu(setMenu), []);

  return (
    <header className="header">
      <div className="header-logo">
        <MainLogo className="image image--contain" />
      </div>
      <nav className="header-nav-list">
        <span className="header-nav" id="lang">
          {language}
        </span>
        <i className="header-nav icon-add-project" id="project" />
        <i className="header-nav icon-user-outlined" id="user" />
      </nav>
      {menu === LANGUAGE && <MenuLang setValue={setLanguage} />}
      {menu === NEW_PROJECT && <MenuNewProject />}
      {menu === USER_MENU && <MenuUser />}
    </header>
  );
};
