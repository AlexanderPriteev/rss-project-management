import React from 'react';
import { ReactComponent as WelcomeImage } from '../../assets/images/scrum_board.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StateReduxInterface } from '../../state';

export const Welcome = function () {
  const user = useSelector((state: StateReduxInterface) => state.user._id);
  const router = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="welcome">
      <div className="welcome-col__about">
        <h1 className="welcome-title">{t('welcome:title')}</h1>
        <p className="welcome-about">{t('welcome:about')}</p>
        <p className="welcome-next">
          {user ? (
            <span className="link uppercase" onClick={() => router(`/`)}>
              {t('welcome:main')}
            </span>
          ) : (
            <>
              {' '}
              {t('welcome:controls:0')}{' '}
              <span className="link uppercase" onClick={() => router(`/login`)}>
                {t('welcome:controls:1')}
              </span>{' '}
              {t('welcome:controls:2')}{' '}
              <span className="link uppercase" onClick={() => router(`/sign-up`)}>
                {t('welcome:controls:3')}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="welcome-col__image">
        <WelcomeImage className="welcome-image" />
        <p className="welcome-copyright">
          {t('welcome:author:0')}{' '}
          <a
            href="https://github.com/AlexanderPriteev"
            target="_blank"
            className="link"
            rel="noreferrer"
          >
            {t('welcome:author:1')}
          </a>{' '}
          {t('welcome:author:2')}
        </p>
      </div>
    </section>
  );
};
