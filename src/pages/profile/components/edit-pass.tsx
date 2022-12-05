import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userSignIn } from '../../../api/requests';
import { reduxUser, StateReduxInterface } from '../../../state';

export const EditPassword = function () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const user = useSelector((state: StateReduxInterface) => state.user);
  const token = localStorage.getItem('token') as string;

  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [curPass, setCurPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);

  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertError, setAlertError] = useState('');
  const [preloader, setPreloader] = useState('');

  const updatePass = async () => {
    try {
      setPreloader(' spinner-btn');
      await userSignIn(user.login, curPass);
      await updateUser(
        user._id as string,
        { name: user.name, login: user.login, password: newPass },
        token
      );
      dispatch(reduxUser({ ...user, password: newPass }));
      setAlertSuccess(t('profile:alert:successPass') as string);
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
    setPreloader('');
  };
  return (
    <div className="profile-list">
      <button
        className="profile-list__btn icon-lock c-primary"
        onClick={() => setHideMenu(!hideMenu)}
      >
        {t('profile:edit:title')}
      </button>
      <div className={`profile-list__body ${hideMenu && 'hide'}`}>
        <div className="profile-pass">
          <span className="line-input-label">{t('profile:edit:new')}</span>
          <LineInput
            type={'password'}
            defValue={newPass}
            setValue={setNewPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <div className="profile-pass">
          <span className="line-input-label">{t('profile:edit:repeat')}</span>
          <LineInput
            type={'password'}
            defValue={repeatPass}
            setValue={setRepeatPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <div className="profile-pass">
          <span className="line-input-label">{t('profile:edit:current')}</span>
          <LineInput
            type={'password'}
            defValue={curPass}
            setValue={setCurPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <button
          className={`profile-list-submit bg-primary${
            newPass === repeatPass && newPass.length > 6 && curPass.length > 6 ? '' : ' disabled'
          }${preloader}`}
          onClick={() => updatePass()}
        >
          {t('profile:edit:btn')}
        </button>
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
