import React from 'react';
import './forminput.css';
// eslint-disable-next-line react/prop-types
const FormInput = ({ label, type, name, value, onChange, errorMessage }) => {
  return (
    <div>
      <input
        className='formInput'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <div className='error'>{errorMessage}</div>}
    </div>
  );
};
export default FormInput;
