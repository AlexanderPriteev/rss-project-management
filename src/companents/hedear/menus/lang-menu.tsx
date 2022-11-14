import React from 'react';
import { CurrentLanguage } from '../index';

interface IMenuLang {
  setValue: React.Dispatch<React.SetStateAction<CurrentLanguage>>;
}

export const MenuLang = function (props: IMenuLang) {
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li className="header-menu__link" onClick={() => props.setValue('EN')}>
          <span className="bold">EN</span>English Language
        </li>
        <li className="header-menu__link" onClick={() => props.setValue('RU')}>
          <span className="bold">RU</span>Русский Язык
        </li>
      </ul>
    </div>
  );
};
