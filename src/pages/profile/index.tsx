import React, { useState } from 'react';
import { LineInput } from '../../companents/line-input';
import { EditPassword } from './components/edit-pass';
import { RemoveAccount } from './components/remove';

export const Profile = function () {
  const [name, setName] = useState('Alexander Priteev');
  const [email, setEmail] = useState('garsteera@gmail.com');
  return (
    <div className="profile">
      <h1 className="headline">Profile</h1>
      <div className="profile-wrapper">
        <LineInput
          label={'Name:'}
          hasIcons={true}
          isReadOnly={true}
          defValue={name}
          setValue={setName}
        />
        <LineInput
          type={'email'}
          label={'Email:'}
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
