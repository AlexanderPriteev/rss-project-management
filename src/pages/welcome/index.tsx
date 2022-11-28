import React from 'react';
import { ReactComponent as WelcomeImage } from '../../assets/images/scrum_board.svg';
import { useNavigate } from 'react-router-dom';

export const Welcome = function () {
  const router = useNavigate();
  return (
    <section className="welcome">
      <div className="welcome-col__about">
        <h1 className="welcome-title">Welcome to RSPM!</h1>
        <p className="welcome-about">
          RSPM is a collaborative project management application that allows you to distribute tasks
          within a team and control the process of their implementation.
        </p>
        <p className="welcome-next">
          To get started, please{' '}
          <span className="link uppercase" onClick={() => router(`/login`)}>
            login
          </span>{' '}
          or{' '}
          <span className="link uppercase" onClick={() => router(`/sign-up`)}>
            sign up
          </span>
        </p>
      </div>
      <div className="welcome-col__image">
        <WelcomeImage className="welcome-image" />
        <p className="welcome-copyright">
          developed by{' '}
          <a
            href="https://github.com/AlexanderPriteev"
            target="_blank"
            className="link"
            rel="noreferrer"
          >
            Alexander
          </a>{' '}
          in 2022
        </p>
      </div>
    </section>
  );
};
