/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import './SigninForm.css';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import {
  AUTH_BACKEND_URL,
  CREATE_USER,
  LOGIN,
} from '../../constants/apiEndPoints';

export default function SignInForm() {
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      required: true,
      pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      required: true,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    },
  ];
  const [fields, setFields] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    // event.persist(); // persist the event object

    const { name, value } = event.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));

    console.log('event value', event.target.value, '*', fields);

    // setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmitSignIn = async (event) => {
    if (!pattern.email.test(fields.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid Email' }));
      return;
    }
    makeRequest(AUTH_BACKEND_URL, CREATE_USER, {
      data: {
        emailId: fields.email,
        password: fields.password,
      },
    }).then((res) => {
      console.log('res', res);
      if (res !== undefined) navigate(`/login`);
    });
  };
  const handleSubmitLogin = async (event) => {
    if (!pattern.email.test(fields.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid Email' }));
      return;
    }
    makeRequest(AUTH_BACKEND_URL, LOGIN, {
      data: {
        userName: fields.userName,
        emailId: fields.email,
        password: fields.password,
      },
    }).then((res) => {
      console.log('res-token', res);
      localStorage.setItem('jwtToken', res);
      console.log('local storage', localStorage.getItem('jwtToken'));
    });
  };

  const pattern = {
    userName: new RegExp(/^[A-Za-z0-9]{3,16}$/),
    email: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i),
    password: new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ),
  };
  return (
    <div className='signin-form-container'>
      <div className='signin-form-header'> Sign to your CMS+ account</div>
      <div className='signin-form-component'>
        <div className='input-container'>
          <form>
            {inputs.map((input) => {
              const field = input.name;

              return (
                <div key={input.id}>
                  <div className='signin-form-input-text'>{input.label}</div>
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={fields[input.name]}
                    errorMessage={errors[field]}
                    onBlur={handleChange}
                  />
                </div>
              );
            })}
          </form>
        </div>
        <button
          className='signin-button'
          style={{ color: 'white' }}
          onClick={handleSubmitSignIn}
        >
          SignIn
        </button>
        {/* <button' onClick={handleSubmitLogin}>
          Login
        </button> */}
      </div>
    </div>
  );
}
