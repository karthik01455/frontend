import React, { useEffect } from 'react';
import './Login.css';
import LoginImage from '../../components/LoginImage';
import LoginForm from '../../components/LoginForm';
export default function Login() {
  // location.reload();

  return (
    <div className='login-container'>
      <div className='login-image-main'>
        <LoginImage />
      </div>
      <div className='login-form'>
        <LoginForm />
      </div>
    </div>
  );
}
