import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IStringKey {
  str: string;
  key: string;
}

export const AddMember = function () {
  const [members, setMembers] = useState([] as IStringKey[]);
  const [current, setCurrent] = useState('');
  const { t } = useTranslation();

  const add = () => {
    const value = {
      str: current,
      key: `${new Date().getTime()}`,
    };
    setMembers([...members, value]);
    setCurrent('');
  };

  const remove = (id: string) => {
    setMembers([...members.filter((e) => e.key !== id)]);
  };

  return (
    <div className="modal-add">
      <span className="modal-add-title">{t('newMember:title')}</span>
      <div className="modal-add-members">
        {members.map((e) => (
          <div key={e.key} id={e.key} className="modal-add-member">
            <div className="modal-add-field-wrapper">
              <input
                type="text"
                className="modal-add-field"
                defaultValue={e.str}
                placeholder={t('newMember:placeholder') as string}
              />
            </div>
            <button className="edit-modal-btn icon-delete c-red" onClick={() => remove(e.key)}>
              {t('newMember:remove')}
            </button>
          </div>
        ))}

        <div className="modal-add-member">
          <div className="modal-add-field-wrapper">
            <input
              type="text"
              className="modal-add-field"
              placeholder={t('newMember:placeholder') as string}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          <button className="edit-modal-btn icon-add" onClick={add}>
            {t('newMember:add')}
          </button>
        </div>
      </div>
    </div>
  );
};
