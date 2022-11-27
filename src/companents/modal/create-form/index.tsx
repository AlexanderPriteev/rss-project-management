import React, { useState } from 'react';
import { AddMember } from '../companents/add-member';
import { LineInput } from '../../line-input';

type ModalType = 'Task' | 'Board';
interface ICreateModal {
  type: ModalType;
  link?: string;
  control: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateModal = function (props: ICreateModal) {
  const [title, setTitle] = useState('');

  const body = document.body.classList;
  if (!body.contains('ov-hidden')) body.add('ov-hidden');
  const close = () => {
    document.body.classList.remove('ov-hidden');
    props.control(false);
  };

  return (
    <div className="modal-wrapper" onClick={close}>
      <div className="create-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body create-modal__body">
          <LineInput
            label={`${props.type} Name`}
            defValue={title}
            setValue={setTitle}
            isString={false}
            wrapperStyles={'create-modal-field'}
          />
          <textarea
            className="create-modal-area"
            placeholder={`Type ${props.type.toLowerCase()} descriptions`}
          />
          <AddMember />
        </div>
        <div className="modal-footer">
          <button className="modal-btn">Create {props.type}</button>
        </div>
      </div>
    </div>
  );
};
