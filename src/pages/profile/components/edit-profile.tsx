import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reduxUser, StateReduxInterface } from '../../../state';
import { updateUser, userSignIn } from '../../../api/requests';

export const EditProfile = function () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const user = useSelector((state: StateReduxInterface) => state.user);
  const token = localStorage.getItem('token') as string;

  const [name, setName] = useState(user.name);
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState(user.login);

  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertError, setAlertError] = useState('');

  const updateProfile = async () => {
    if (!name) {
      setName(user.name);
    }
    if (!email) {
      setEmail(user.login);
    }
    try {
      await userSignIn(user.login, pass);
      await updateUser(user._id as string, { name: name, login: email, password: pass }, token);
      dispatch(reduxUser({ ...user, name: name, login: email, password: pass }));
      setAlertSuccess(t('profile:alert:success') as string);
      setTimeout(() => setAlertSuccess(''), 3000);
    } catch (e) {
      switch ((e as Error).message) {
        case '401':
          setAlertError(t('profile:alert:errorPass') as string);
          break;
        default:
          setAlertError(t('profile:alert:error') as string);
      }
      setTimeout(() => setAlertError(''), 3000);
    }
  };
  return (
    <div className="profile-list">
      <div className="profile-wrapper">
        <LineInput
          label={t('profile:name') as string}
          hasIcons={true}
          isReadOnly={true}
          defValue={user.name}
          setValue={setName}
        />
        <LineInput
          type={'email'}
          label={t('profile:email') as string}
          hasIcons={true}
          isReadOnly={true}
          defValue={user.login}
          setValue={setEmail}
        />
        <div className="profile-list">
          <div className="profile-pass">
            <span className="line-input-label">{t('profile:pass')}</span>
            <LineInput
              type={'password'}
              defValue={pass}
              setValue={setPass}
              isString={false}
              wrapperStyles={'profile-pass-field'}
            />
          </div>
          <button
            className={`profile-list-submit bg-primary${pass.length < 7 ? ' disabled' : ''} `}
            onClick={() => updateProfile()}
          >
            {t('profile:submit')}
          </button>
        </div>
      </div>
      {alertSuccess && (
        <span className="alert bg-green">
          <span className="alert__about">{alertSuccess}</span>
          <i className="alert__close icon-close" onClick={() => setAlertSuccess('')} />
        </span>
      )}
      {alertError && (
        <span className="alert">
          <span className="alert__about">{alertError}</span>
          <i className="alert__close icon-close" onClick={() => setAlertError('')} />
        </span>
      )}
    </div>
  );
};
