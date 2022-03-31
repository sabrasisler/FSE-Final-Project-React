import React from 'react';

const Loader = ({ loading, loadingMessage, content }) => {
  return (
    <span className='d-flex justify-content-center'>
      {loading && loadingMessage ? (
        <span className='me-2'>{loadingMessage} </span>
      ) : null}
      {loading && (
        <span>
          <i className='fas fa-spinner fa-pulse'></i>
        </span>
      )}
      {!loading && content}
    </span>
  );
};

export default Loader;
