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

  const signUp = async () => {
    const validateName = name.length > 3;
    const validateMail = emailValidate.test(mail);
    const validatePass = pass.length > 6 && pass === repeat;

    if (validateName && validateMail && validatePass) {
      await userSignUp(name, mail, pass);
      router(`/projects`);
    }
  };

  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">{t('signup:title')}</h1>
          <div className="auth-form-wrapper">
            <AuthInput
              placeholder={t('signup:placeholder:0') as string}
              icon="icon-user"
              setValue={setName}
            />
            <AuthInput
              placeholder={t('signup:placeholder:1') as string}
              icon="icon-email"
              setValue={setMail}
            />
            <AuthInput
              placeholder={t('signup:placeholder:2') as string}
              isPass={true}
              setValue={setPass}
            />
            <AuthInput
              placeholder={t('signup:placeholder:3') as string}
              isPass={true}
              setValue={setRepeat}
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
    </div>
  );
};
