import React from 'react';
import { SignupForm } from '../../forms';
import { LoginForm } from '../../forms';

const LoginView = () => {
  // const user = useSelector((state) => state.user.data);
  const google = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
  };
  return (
    <div>
      <h1 className='fs-1 home-heading-primary'>Happening Now</h1>
      <h3 className='h2 '>Join Tuiter Today</h3>
      <div className='col-md-7'>
        <div className='mt-5'>
          <LoginForm />
        </div>
        <div className='d-flex justify-content-between'>
          <div className='btn btn-primary rounded-pill' onClick={google}>
            <i className='fa-brands fa-google'></i> Login with Google
          </div>
          <SignupForm />
        </div>
        {/* {user && !user.username ? <CompleteSignup /> : null} */}
      </div>
    </div>
  );
};

export default LoginView;
