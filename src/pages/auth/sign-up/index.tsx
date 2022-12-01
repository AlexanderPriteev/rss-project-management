import React, { useState } from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { emailValidate } from '../../../companents/line-input';
import { userSignUp } from '../../../api/requests';

export const SignUp = function () {
  const router = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [repeat, setRepeat] = useState('');

  const [alert, setAlert] = useState('');
  const [alertName, setAlertName] = useState('');
  const [alertMail, setAlertMail] = useState('');
  const [alertPass, setAlertPass] = useState('');
  const [alertRepeat, setAlertRepeat] = useState('');

  const signUp = async () => {
    const validateName = name.length > 3;
    const validateMail = emailValidate.test(mail);
    const validatePass = pass.length > 6;
    const validateRepeat = pass === repeat;
    const validate = validateName && validateMail && validatePass && validateRepeat;

    if (validate) {
      try {
        await userSignUp(name, mail, pass);
        router(`/projects`);
      } catch (e) {
        switch ((e as Error).message) {
          case '409':
            setAlert(t('signup:alert:user') as string);
            setAlertMail(t('signup:alert:changeEmail') as string);
            break;
          default:
            setAlert(t('signup:alert:db') as string);
        }
      }
    } else {
      if (!validateName) {
        setAlertName(t('signup:alert:name') as string);
      }
      if (!validateName) {
        setAlertMail(t('signup:alert:mail') as string);
      }
      if (!validateName) {
        setAlertPass(t('signup:alert:pass') as string);
      }
      if (!validateName) {
        setAlertRepeat(t('signup:alert:repeat') as string);
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">{t('signup:title')}</h1>
          <div className="auth-form-wrapper g-2d5">
            <AuthInput
              placeholder={t('signup:placeholder:0') as string}
              icon="icon-user"
              setValue={setName}
              alert={alertName}
            />
            <AuthInput
              placeholder={t('signup:placeholder:1') as string}
              icon="icon-email"
              setValue={setMail}
              alert={alertMail}
            />
            <AuthInput
              placeholder={t('signup:placeholder:2') as string}
              isPass={true}
              setValue={setPass}
              alert={alertPass}
            />
            <AuthInput
              placeholder={t('signup:placeholder:3') as string}
              isPass={true}
              setValue={setRepeat}
              alert={alertRepeat}
            />
          </div>
          <div className="auth-form-wrapper">
            <button className="auth-btn" onClick={() => signUp()}>
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
      {alert && (
        <span className="alert">
          <span className="alert__about">{alert}</span>
          <i className="alert__close icon-close" onClick={() => setAlert('')} />
        </span>
      )}
    </div>
  );
};
