import React from 'react';
import CompleteSignup from '../forms/complete-signup';
import Register from '../forms/register';
import { useSelector } from 'react-redux';

const Login = () => {
  // const user = useSelector((state) => state.user.data);
  // console.log('Login component', user);
  const google = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
  };
  return (
    <div>
      <h1 className='fs-1 home-heading-primary'>Happening Now</h1>
      <h3 className='h3'>Share your thoughts with the world</h3>
      <p className='btn btn-primary rounded-pill' onClick={google}>
        <i className='fa-brands fa-google'></i> Login with Google
      </p>
      <Register />
      {/* {user && !user.username ? <CompleteSignup /> : null} */}
    </div>
  );
};

export default Login;
