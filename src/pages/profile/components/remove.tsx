import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { useTranslation } from 'react-i18next';
import { deleteUser, userSignIn } from '../../../api/requests';
import { StateReduxInterface } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../../../companents/hedear/menus/user-menu';
import { useNavigate } from 'react-router-dom';

export const RemoveAccount = function () {
  const dispatch = useDispatch();
  const router = useNavigate();
  const { t } = useTranslation();

  const user = useSelector((state: StateReduxInterface) => state.user);
  const token = localStorage.getItem('token') as string;

  const [pass, setPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  const [preloader, setPreloader] = useState('');

  const [alertError, setAlertError] = useState('');
  const removeProfile = async () => {
    try {
      setPreloader(' spinner-btn');
      await userSignIn(user.login, pass);
      const id = user._id as string;
      userLogOut(dispatch);
      router('/');
      await deleteUser(id, token);
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
        className="profile-list__btn icon-delete c-red"
        onClick={() => setHideMenu(!hideMenu)}
      >
        {t('profile:remove:title')}
      </button>
      <div className={`profile-list__body ${hideMenu && 'hide'}`}>
        <div className="profile-pass">
          <span className="line-input-label">{t('profile:remove:pass')}</span>
          <LineInput
            type={'password'}
            defValue={pass}
            setValue={setPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <button
          className={`profile-list-submit bg-red${pass.length < 7 ? ' disabled' : ''}${preloader}`}
          onClick={() => removeProfile()}
        >
          {t('profile:remove:btn')}
        </button>
      </div>
      {alertError && (
        <span className="alert">
          <span className="alert__about">{alertError}</span>
          <i className="alert__close icon-close" onClick={() => setAlertError('')} />
        </span>
      )}
    </div>
  );
};
