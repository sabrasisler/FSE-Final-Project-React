import React, { useState } from 'react';

const ErrorBox = ({ errorMessage }) => {
  const [error, setError] = useState(errorMessage);

  return (
    <div className='alert alert-danger'>
      <p>{error && error}</p>
    </div>
  );
};

export default ErrorBox;
