import React from 'react';
import './LoginImage.css';
import LoginText from '../../components/LoginText';
import LoginDraw from '../../assets/undraw-upload-re-pasx_2023-03-09 (1)/undraw-upload-re-pasx.png';
export default function LoginImage() {
  return (
    <div className='container'>
      <div className='login-text'>
        <LoginText />
      </div>
      <div className='login-image-container'>
        <img src={LoginDraw} alt='Login' className='login-image' />
      </div>
    </div>
  );
}
