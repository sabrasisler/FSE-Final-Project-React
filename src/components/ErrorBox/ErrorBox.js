import React, { useState } from 'react';

/**
 * Displays message in a simple alert box. Mainly used for errors.
 * @param {string} message
 */
const ErrorBox = ({ message }) => {
  const [error, setError] = useState(message);

  return (
    <div className='alert alert-warning'>
      <p>{error && error}</p>
    </div>
  );
};

export default ErrorBox;
