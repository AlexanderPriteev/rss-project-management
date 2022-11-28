import React, { useState } from 'react';
import { LineInput } from '../../../companents/line-input';
import { useTranslation } from 'react-i18next';

export const RemoveAccount = function () {
  const [pass, setPass] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  const { t } = useTranslation();
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
        <button className="profile-list-submit bg-red">{t('profile:remove:btn')}</button>
      </div>
    </div>
  );
};
