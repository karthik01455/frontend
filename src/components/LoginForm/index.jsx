/* eslint-disable no-useless-escape */
import React, { useState, useContext } from 'react';
import './LoginForm.css';
import FormInput from '../../components/FormInput';
import makeRequest from '../../utils/makeRequest';
import { AUTH_BACKEND_URL, LOGIN } from '../../constants/apiEndPoints';
import { useNavigate } from 'react-router-dom';
import { LoginDataContext } from '../../contexts/LoginData';
import { ContentTypeDataContext } from '../../contexts/ContentTypeData';
import { CollectionDataContext } from '../../contexts/CollectionData';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setcontentTypeSelected } = useContext(ContentTypeDataContext);
  const { setCollectionSelected } = useContext(CollectionDataContext);

  setCollectionSelected(false);
  setcontentTypeSelected(false);

  const { setEmailId } = useContext(LoginDataContext);

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

  const handleSubmitLogin = async () => {
    if (!pattern.email.test(fields.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid Email' }));
      return;
    }
    makeRequest(AUTH_BACKEND_URL, LOGIN, {
      data: {
        emailId: fields.email,
        password: fields.password,
      },
    }).then((res) => {
      console.log('res-token', res);
      localStorage.setItem('jwtToken', res);
      console.log('local storage', localStorage.getItem('jwtToken'));
      setEmailId(fields.email);
      if (localStorage.getItem('jwtToken')) navigate(`/Home`);
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
    <div className='login-form-container'>
      <div className='login-form-header'> Login to your CMS+ account</div>
      <div className='login-form-component'>
        <div className='input-container'>
          <form>
            {inputs.map((input) => {
              const field = input.name;

              return (
                <div key={input.id}>
                  <div className='login-form-input-text'>{input.label}</div>
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
        {/* <button style={{ color: 'white' }} onClick={handleSubmitSignIn}>
          SignIn
        </button> */}
        <button className='login-button' onClick={handleSubmitLogin}>
          Login
        </button>
        <div className='login-form-forget-password'>
          <a>
            <u>Forgot password?</u>
          </a>
        </div>
      </div>
    </div>
  );
}
