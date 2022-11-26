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
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const LineInput = function (props: ILineInput) {
  const [onlyRead, setOnlyRead] = useState(props.isReadOnly === true);
  const [newValue, setNewValue] = useState(props.defValue || '');

  const updateValue = () => {
    const validate = props.type === 'email' ? emailValidate.test(newValue) : newValue.length > 3;
    setOnlyRead(!onlyRead);
    if (validate) {
      props.setValue(newValue);
    } else {
      setNewValue(props.defValue || '');
    }
  };

  const clearValue = () => {
    setOnlyRead(!onlyRead);
    setNewValue(props.defValue || '');
  };

  return (
    <div className={`line-input ${props.wrapperStyles || ''}`}>
      {props.label && <span className="line-input-label">{props.label}</span>}

      <div className="line-input__field-wrapper">
        <input
          type={props.type || 'text'}
          className="line-input__field"
          value={newValue}
          readOnly={onlyRead}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </div>
      {props.hasIcons && (
        <div className="line-input__btn-list">
          {onlyRead ? (
            <i className="line-input__btn icon-pen" onClick={() => setOnlyRead(!onlyRead)} />
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
