import React from 'react';
import { CurrentLanguage } from '../index';
import { useTranslation } from 'react-i18next';

interface IMenuLang {
  setValue: React.Dispatch<React.SetStateAction<CurrentLanguage>>;
}

export const MenuLang = function (props: IMenuLang) {
  const { i18n } = useTranslation();
  const changeLang = (lang: CurrentLanguage) => {
    props.setValue(lang);
    i18n.changeLanguage(lang.toLowerCase());
  };
  return (
    <div className="header-menu">
      <ul className="header-menu__link-list">
        <li className="header-menu__link" onClick={() => changeLang('EN')}>
          <span className="bold">EN</span>English Language
        </li>
        <li className="header-menu__link" onClick={() => changeLang('RU')}>
          <span className="bold">RU</span>Русский Язык
        </li>
      </ul>
    </div>
  );
};
