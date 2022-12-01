import React, { useState } from 'react';

interface IAuthInput {
  placeholder?: string;
  icon?: string;
  isPass?: boolean;
  alert?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthInput = function (props: IAuthInput) {
  const [type, setType] = useState(props.isPass ? 'password' : 'text');
  const [passIcon, setPassIcon] = useState('icon-lock');
  const passwordType = () => {
    setType(type === 'text' ? 'password' : 'text');
    setPassIcon(passIcon === 'icon-lock' ? 'icon-unlock' : 'icon-lock');
  };
  return (
    <div className="auth-input">
      <input
        type={type}
        className={`auth-input__field${props.alert ? ' auth-input__field--alert' : ''}`}
        placeholder=" "
        autoComplete="off"
        onChange={(e) => props.setValue(e.target.value)}
      />
      {props.placeholder && (
        <span className={`auth-input__label${props.alert ? ' c-red' : ''}`}>
          {props.placeholder}
        </span>
      )}
      {props.icon && !props.isPass && <i className={`auth-input__icon ${props.icon}`} />}
      {props.isPass && (
        <i
          className={`auth-input__icon auth-input__icon--pass ${passIcon}`}
          onClick={passwordType}
        />
      )}
      {props.alert && <span className="auth-input__alert">{props.alert}</span>}
    </div>
  );
};
