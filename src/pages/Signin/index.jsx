import React from 'react';
import './Signin.css';
import SigninImage from '../../components/LoginImage';
import SigninForm from '../../components/SigninForm';

export default function Signin() {
  return (
    <div className='signin-container'>
      <div className='signin-image-main'>
        <SigninImage />
      </div>
      <div className='signin-form'>
        <SigninForm />
      </div>
    </div>
  );
}
