import React from 'react';
import { ReactComponent as RSSLogo } from '../../assets/images/rs_school.svg';

export const Footer = function () {
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
        <span className="uppercase">CREATED IN 2022</span>
      </div>
    </footer>
  );
};
