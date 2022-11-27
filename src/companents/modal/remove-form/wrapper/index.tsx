import React from 'react';
import { RemoveModal } from '../index';

interface IRemoveWrap {
  name: string;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RemoveModalWrap = function (props: IRemoveWrap) {
  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };
  return (
    <div className="modal-wrapper" onClick={close}>
      <RemoveModal name={props.name} />
    </div>
  );
};
