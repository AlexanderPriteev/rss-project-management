import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';

export const EditPassword = function () {
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [curPass, setCurPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  return (
    <div className="profile-list">
      <button
        className="profile-list__btn icon-lock c-primary"
        onClick={() => setHideMenu(!hideMenu)}
      >
        Edit Password
      </button>
      <div className={`profile-list__body ${hideMenu && 'hide'}`}>
        <div className="profile-pass">
          <span className="line-input-label">New Password: </span>
          <LineInput
            type={'password'}
            defValue={newPass}
            setValue={setNewPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <div className="profile-pass">
          <span className="line-input-label">Repeat Password:</span>
          <LineInput
            type={'password'}
            defValue={repeatPass}
            setValue={setRepeatPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <div className="profile-pass">
          <span className="line-input-label">Current Password:</span>
          <LineInput
            type={'password'}
            defValue={curPass}
            setValue={setCurPass}
            isString={false}
            wrapperStyles={'profile-pass-field'}
          />
        </div>
        <button className="profile-list-submit bg-primary">UPDATE PASSWORD</button>
      </div>
    </div>
  );
};
