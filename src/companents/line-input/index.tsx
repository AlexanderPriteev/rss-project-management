import React, { useState } from 'react';

export const emailValidate =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

type inputField = 'text' | 'email' | 'password';
interface ILineInput {
  type?: inputField;
  label?: string;
  defValue: string;
  hasIcons?: boolean;
  isReadOnly?: boolean;
  wrapperStyles?: string;
  isEmail?: string;
  isString?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const LineInput = function (props: ILineInput) {
  const [onlyRead, setOnlyRead] = useState(props.isReadOnly === true);
  const [newValue, setNewValue] = useState(props.defValue || '');
  const [str, setStr] = useState(props.isString === true);
  const isText = props.isString !== false;

  const editValue = () => {
    setOnlyRead(!onlyRead);
    if (isText) {
      setStr(!str);
    }
  };

  const updateValue = () => {
    const validate = props.type === 'email' ? emailValidate.test(newValue) : newValue.length > 3;
    editValue();
    if (validate) {
      props.setValue(newValue);
    } else {
      setNewValue(props.defValue || '');
    }
  };

  const clearValue = () => {
    editValue();
    setNewValue(props.defValue || '');
  };

  return (
    <div className={`line-input ${props.wrapperStyles || ''}`}>
      {props.label && <span className="line-input-label">{props.label}</span>}

      <div className="line-input__field-wrapper">
        <input
          type={props.type || 'text'}
          className={`line-input__field${isText && !str ? ' hide' : ''}`}
          value={newValue}
          readOnly={onlyRead}
          onChange={(e) => setNewValue(e.target.value)}
        />
        {isText && <span className={`line-input__text${str ? ' hide' : ''}`}>{newValue}</span>}
      </div>
      {props.hasIcons && (
        <div className="line-input__btn-list">
          {onlyRead ? (
            <i className="line-input__btn icon-pen" onClick={editValue} />
          ) : (
            <>
              <i className="line-input__btn icon-check c-green" onClick={updateValue} />
              <i className="line-input__btn icon-close c-red" onClick={clearValue} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
