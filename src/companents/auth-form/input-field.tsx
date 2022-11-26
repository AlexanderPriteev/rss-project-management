import React, { useState } from 'react';

interface IAuthInput {
  placeholder?: string;
  icon?: string;
  isPass?: boolean;
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
      <input type={type} className="auth-input__field" placeholder=" " autoComplete="off" />
      {props.placeholder && <span className="auth-input__label">{props.placeholder}</span>}
      {props.icon && !props.isPass && <i className={`auth-input__icon ${props.icon}`} />}
      {props.isPass && (
        <i
          className={`auth-input__icon auth-input__icon--pass ${passIcon}`}
          onClick={passwordType}
        />
      )}
    </div>
  );
};
