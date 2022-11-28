import React, { useState } from 'react';
import { LineInput } from '../../companents/line-input';
import { EditPassword } from './components/edit-pass';
import { RemoveAccount } from './components/remove';
import { useTranslation } from 'react-i18next';

export const Profile = function () {
  const [name, setName] = useState('Alexander Priteev');
  const [email, setEmail] = useState('garsteera@gmail.com');
  const { t } = useTranslation();
  return (
    <div className="profile">
      <h1 className="headline">{t('profile:title')}</h1>
      <div className="profile-wrapper">
        <LineInput
          label={t('profile:name') as string}
          hasIcons={true}
          isReadOnly={true}
          defValue={name}
          setValue={setName}
        />
        <LineInput
          type={'email'}
          label={t('profile:email') as string}
          hasIcons={true}
          isReadOnly={true}
          defValue={email}
          setValue={setEmail}
        />
      </div>
      <EditPassword />
      <RemoveAccount />
    </div>
  );
};
