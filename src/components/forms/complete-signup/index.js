import { React, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FormInput from '../input';

import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../../redux/userSlice';

const CompleteSignup = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',
    birthday: '',
  });

  const isFormValid = () => {
    for (const input in inputs) {
      const pattern = inputs[input].pattern;
      if (pattern) {
        const regex = new RegExp(pattern);
        const inputValue = values[inputs[input].name];
        // console.log(regex.test(inputValue));
        if (!regex.test(inputValue)) return false;
      }
    }
    return true;
  };
  const handleSubmit = () => {
    if (isFormValid()) {
      dispatch(updateUserThunk(values));
    }
  };

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'Birthday',
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return <div></div>;
};

export default CompleteSignup;
