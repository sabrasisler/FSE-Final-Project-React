import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import './FormInput.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    if (e.target.value) setFocused(true);
  };

  const { errorMessage, onChange, label, ...inputProps } = props;
  return (
    <div>
      <label htmlFor={label} className='form-label'></label>
      <input
        className=' form-control'
        onChange={onChange}
        {...inputProps}
        onBlur={handleFocus}
        onFocus={(e) =>
          inputProps.name === 'confirmPassword' &&
          e.target.value !== '' &&
          setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className='text-danger validation-error'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
