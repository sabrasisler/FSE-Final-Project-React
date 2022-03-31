import React, { useState } from 'react';

const ErrorBox = ({ message }) => {
  const [error, setError] = useState(message);

  return (
    <div className='alert alert-warning'>
      <p>{error && error}</p>
    </div>
  );
};

export default ErrorBox;
