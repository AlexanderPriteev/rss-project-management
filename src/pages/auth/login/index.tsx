import React from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';

export const Login = function () {
  return (
    <div className="auth">
      <div className="auth__col-form">
        <div className="auth-form">
          <h1 className="auth-form-title">Login</h1>
          <div className="auth-form-wrapper">
            <AuthInput placeholder="Email" icon="icon-email" />
            <AuthInput placeholder="Password" isPass={true} />
          </div>
          <div className="auth-form-wrapper">
            <button className="auth-btn">Login</button>
            <button className="auth-btn auth-btn--outline">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="auth__col-image">
        <AuthImage className="image image--contain" />
      </div>
    </div>
  );
};
