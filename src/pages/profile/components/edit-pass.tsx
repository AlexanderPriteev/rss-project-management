import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { useTranslation } from 'react-i18next';

export const EditPassword = function () {
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [curPass, setCurPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  const { t } = useTranslation();
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
        <button className="profile-list-submit bg-primary">{t('profile:edit:btn')}</button>
      </div>
    </div>
  );
};
