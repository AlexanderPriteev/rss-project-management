import React from 'react';
import { IRemoveModal, RemoveModal } from '../index';

export const RemoveModalWrap = function (props: IRemoveModal) {
  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };
  return (
    <div className="modal-wrapper" onClick={() => close()}>
      <RemoveModal {...props} />
    </div>
  );
};
