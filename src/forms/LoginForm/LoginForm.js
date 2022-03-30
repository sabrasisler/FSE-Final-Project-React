import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/userSlice';

import { AlertBox } from '../../components';

const LoginForm = () => {
  const error = useSelector((state) => state.user.error);
  const [loginUser, setLoginUser] = useState();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (!loginUser || !loginUser.password || !loginUser.username) {
      return;
    }
    dispatch(loginThunk(loginUser));
  };
  return (
    <form>
      <h5>Login</h5>
      <input
        className='mb-2 form-control'
        onChange={(e) =>
          setLoginUser({ ...loginUser, username: e.target.value })
        }
        placeholder='email or username'
      />
      <input
        className='mb-2 form-control'
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
        placeholder='password'
        type='password'
      />
      <button
        type='submit'
        onClick={(e) => submit(e)}
        className='btn btn-primary mb-5'
      >
        Login
      </button>
      {error && <AlertBox message={error} />}
    </form>
  );
};

export default LoginForm;
