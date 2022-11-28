import React from 'react';
import { ReactComponent as AuthImage } from '../../../assets/images/login.svg';
import { AuthInput } from '../../../companents/auth-form/input-field';
import { useNavigate } from 'react-router-dom';

export const Login = function () {
  const router = useNavigate();

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
            <button className="auth-btn" onClick={() => router(`/projects`)}>
              Login
            </button>
            <button className="auth-btn auth-btn--outline" onClick={() => router(`/sign-up`)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="auth__col-image">
        <AuthImage className="image image--contain" />
      </div>
    </div>
  );
};
