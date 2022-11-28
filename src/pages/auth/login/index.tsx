import React from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Login = function () {
  const router = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">{t('login:title')}</h1>
          <div className="auth-form-wrapper">
            <AuthInput placeholder={t('login:placeholder:0') as string} icon="icon-email" />
            <AuthInput placeholder={t('login:placeholder:1') as string} isPass={true} />
          </div>
          <div className="auth-form-wrapper">
            <button className="auth-btn" onClick={() => router(`/projects`)}>
              {t('login:btns:login')}
            </button>
            <button className="auth-btn auth-btn--outline" onClick={() => router(`/sign-up`)}>
              {t('login:btns:signup')}
            </button>
          </div>
        </div>
      </div>
      <div className="auth__col-image">
        <AuthImage className="image image--contain" />
      </div>
    </div>
  );
};
