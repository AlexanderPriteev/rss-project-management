import React, { useState } from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUsers, IUser, userSignIn } from '../../../api/requests';
import { useDispatch } from 'react-redux';
import { reduxUser } from '../../../state';

export const Login = function () {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { t } = useTranslation();

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const [alert, setAlert] = useState('');
  const [alertMail, setAlertMail] = useState('');
  const [alertPass, setAlertPass] = useState('');

  const sigIn = async () => {
    const validateLogin = !!login.length;
    const validatePass = !!pass.length;
    if (validateLogin && validatePass) {
      try {
        const { token } = await userSignIn(login, pass);
        localStorage.setItem('token', token);
        const user = (await getUsers(token)).find((e) => e.login === login) as IUser;
        localStorage.setItem('userId', user._id as string);
        dispatch(reduxUser({ ...user, password: pass }));

        router(`/`);
      } catch (e) {
        switch ((e as Error).message) {
          case '401':
            setAlert(t('login:alert:user') as string);
            setAlertMail(t('login:alert:field') as string);
            setAlertPass(t('login:alert:field') as string);
            break;
          default:
            setAlert(t('login:alert:db') as string);
        }
        setTimeout(() => setAlert(''), 3000);
      }
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
              alert={alertMail}
            />
            <AuthInput
              placeholder={t('login:placeholder:1') as string}
              isPass={true}
              setValue={setPass}
              alert={alertPass}
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
      {alert && (
        <span className="alert">
          <span className="alert__about">{alert}</span>
          <i className="alert__close icon-close" onClick={() => setAlert('')} />
        </span>
      )}
    </div>
  );
};
