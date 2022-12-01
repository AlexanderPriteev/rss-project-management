import React, { useEffect, useState } from 'react';
import { LineInput } from '../../companents/line-input';
import { EditPassword } from './components/edit-pass';
import { RemoveAccount } from './components/remove';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reduxUser, StateReduxInterface } from '../../state';
import { updateUser } from '../../api/requests';

export const Profile = function () {
  const dispatch = useDispatch();

  const user = useSelector((state: StateReduxInterface) => state.user);
  const token = localStorage.getItem('token') as string;
  const [name, setName] = useState(user.name);
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState(user.login);

  useEffect(() => {
    if (user.name !== name && name) {
      dispatch(reduxUser({ ...user, name: name }));

      void updateUser(
        user._id as string,
        { name: name, login: user.login, password: '1234567' },
        token
      );
    }
    if (user.login !== email && email) {
      dispatch(reduxUser({ ...user, login: email }));

      void updateUser(user._id as string, { name: name, login: email, password: '1234567' }, token);
    }
  });

  const { t } = useTranslation();
  return (
    <div className="profile">
      <h1 className="headline">{t('profile:title')}</h1>
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
          <button className="profile-list-submit bg-primary">{t('profile:submit')}</button>
        </div>
      </div>
      <EditPassword />
      <RemoveAccount />
    </div>
  );
};
