import React, { useState } from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUsers, userSignIn } from '../../../api/requests';

export const Login = function () {
  const router = useNavigate();
  const { t } = useTranslation();

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const sigIn = async () => {
    const validateLogin = login.length > 3;
    const validatePass = pass.length > 6;
    if (validateLogin && validatePass) {
      const { token } = await userSignIn(login, pass);
      localStorage.setItem('token', token);
      const user = (await getUsers(token)).find((e) => e.login === login);

      //TODO
      console.log(user);

      router(`/projects`);
    }
  };

  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">{t('login:title')}</h1>
          <div className="auth-form-wrapper">
            <AuthInput
              placeholder={t('login:placeholder:0') as string}
              icon="icon-email"
              setValue={setLogin}
            />
            <AuthInput
              placeholder={t('login:placeholder:1') as string}
              isPass={true}
              setValue={setPass}
            />
          </div>
          <div className="auth-form-wrapper">
            <button className="auth-btn" onClick={() => sigIn()}>
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
