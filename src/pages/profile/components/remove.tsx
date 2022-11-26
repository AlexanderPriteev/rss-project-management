import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';

export const RemoveAccount = function () {
  const [pass, setPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  return (
    <div className="profile-list">
      <button
        className="profile-list__btn icon-delete c-red"
        onClick={() => setHideMenu(!hideMenu)}
      >
        Edit Password
      </button>
      <div className={`profile-list__body ${hideMenu && 'hide'}`}>
        <div className="profile-pass">
          <span className="line-input-label">Password: </span>
          <LineInput
            type={'password'}
            defValue={pass}
            setValue={setPass}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <button className="profile-list-submit bg-red">DELETE ACCOUNT</button>
      </div>
    </div>
  );
};
