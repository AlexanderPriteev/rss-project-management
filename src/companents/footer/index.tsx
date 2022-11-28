import React from 'react';
import { ReactComponent as RSSLogo } from '../../assets/images/rs_school.svg';
import { useTranslation } from 'react-i18next';

export const Footer = function () {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-logo">
        <RSSLogo className="image image--contain" />
      </div>
      <div className="footer-about">
        <a
          href="https://github.com/AlexanderPriteev"
          target="_blank"
          className="footer-link icon-github"
          rel="noreferrer"
        >
          <span className="underline">Alexander Priteev</span>
        </a>
        <span className="uppercase">{t('footer:create')}</span>
      </div>
    </footer>
  );
};
