import React from 'react';
import { useTranslation } from 'react-i18next';

interface IRemoveModal {
  name: string;
}

export const RemoveModal = function (props: IRemoveModal) {
  const { t } = useTranslation();
  return (
    <div className="remove-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-body">
        <h2 className="remove-modal-title">{t('remove:title')}</h2>
        <p className="remove-modal-subtitle">
          {t('remove:subtitle')} {props.name}.
        </p>
        <p className="remove-modal-about">
          {t('remove:about:0')}
          <span className="bold">{props.name}</span>
          {t('remove:about:1')}
        </p>
        <input
          type="text"
          className="remove-modal-field"
          placeholder={t('remove:placeholder') as string}
        />
      </div>
      <div className="modal-footer">
        <button className="modal-btn bg-red">{t('remove:btn')}</button>
      </div>
    </div>
  );
};
