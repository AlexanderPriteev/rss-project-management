import React from 'react';
import { EditPassword } from './components/edit-pass';
import { RemoveAccount } from './components/remove';
import { useTranslation } from 'react-i18next';
import { EditProfile } from './components/edit-profile';

export const Profile = function () {
  const { t } = useTranslation();

  return (
    <div className="profile">
      <h1 className="headline">{t('profile:title')}</h1>
      <EditProfile />
      <EditPassword />
      <RemoveAccount />
    </div>
  );
};
