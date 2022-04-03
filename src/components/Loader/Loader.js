import React from 'react';

/**
 *
 * @param {boolean} loading status of the loader;
 * @param {loadingMessage} message to be displayed when loader is displayed
 * @returns {string} any content that should be displayed when loader is not active; e.g. "Sign in".
 */
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
