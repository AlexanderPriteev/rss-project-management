import React, { useEffect, useState } from 'react';
import { ReactComponent as MainLogo } from '../../assets/images/logo.svg';
import { MenuNewProject } from './menus/new-project';
import { MenuUser } from './menus/user-menu';
import { MenuLang } from './menus/lang-menu';
import { MenuAuth } from './menus/auth-menu';
import { useLocation } from 'react-router-dom';

const USER_MENU = 'USER_MENU';
const NEW_PROJECT = 'NEW_PROJECT';
const LANGUAGE = 'LANGUAGE';
const AUTH = 'AUTH';
type HeaderMenu = 'USER_MENU' | 'NEW_PROJECT' | 'LANGUAGE' | 'AUTH' | null;

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
      case 'auth':
        setMenu(AUTH);
        break;
      default:
        setMenu(null);
    }
  };
};

export const Header = function () {
  const location = useLocation().pathname;
  const [menu, setMenu] = useState(null as HeaderMenu);
  const [language, setLanguage] = useState('EN' as CurrentLanguage);
  const [headerMove, setHeaderMove] = useState(window.scrollY > 30 ? 'move' : '');

  const showAuthMenu = location === '/';
  const showMenu = ['/profile', '/projects', '/board'].includes(location);

  useEffect(() => currentMenu(setMenu), []);

  window.onscroll = () => {
    if (window.scrollY > 30 && headerMove === '') {
      setHeaderMove('move');
    }
    if (window.scrollY === 0 && headerMove === 'move') {
      setHeaderMove('');
    }
  };

  return (
    <header className={`header ${headerMove}`}>
      <div className="header-logo">
        <MainLogo className="image image--contain" />
      </div>
      <nav className="header-nav-list">
        <span className="header-nav" id="lang">
          {language}
        </span>

        {showMenu && (
          <>
            <i className="header-nav icon-add-project" id="project" />
            <i className="header-nav icon-user-outlined" id="user" />
          </>
        )}
        {showAuthMenu && <i className="header-nav icon-login-outlined" id="auth" />}
      </nav>
      {menu === LANGUAGE && <MenuLang setValue={setLanguage} />}
      {menu === NEW_PROJECT && <MenuNewProject />}
      {menu === USER_MENU && <MenuUser />}
      {menu === AUTH && <MenuAuth />}
    </header>
  );
};
