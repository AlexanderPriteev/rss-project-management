import React from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignUp = function () {
  const router = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">{t('signup:title')}</h1>
          <div className="auth-form-wrapper">
            <AuthInput placeholder={t('signup:placeholder:0') as string} icon="icon-user" />
            <AuthInput placeholder={t('signup:placeholder:1') as string} icon="icon-email" />
            <AuthInput placeholder={t('signup:placeholder:2') as string} isPass={true} />
            <AuthInput placeholder={t('signup:placeholder:3') as string} isPass={true} />
          </div>
          <div className="auth-form-wrapper">
            <button className="auth-btn" onClick={() => router(`/projects`)}>
              {t('signup:btns:signup')}
            </button>
            <button className="auth-btn auth-btn--outline" onClick={() => router(`/login`)}>
              {t('signup:btns:login')}
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
